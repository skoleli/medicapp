package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"strconv"

	"github.com/go-openapi/strfmt"
	"github.com/gorilla/mux"

	"go.uber.org/zap"
)

type Request interface {
	Validate(formats strfmt.Registry) error
}

func GenerateModelFromBody(request Request, w http.ResponseWriter, r *http.Request) error {

	body, err := io.ReadAll(r.Body)
	if err != nil {
		zap.L().Error("Failed to read request body",
			zap.String("url path", r.URL.Path), zap.Error(err))
		ReturnHTTPError(w, InternalServerError(err))
		return err
	}
	bodyReader := bytes.NewReader(body)
	if err := json.NewDecoder(bodyReader).Decode(request); err != nil {
		stringErr := fmt.Sprintf("Failed to read request body because %s could not be decoded", reflect.TypeOf(request))
		zap.L().Error(stringErr,
			zap.ByteString("request body", body),
			zap.String("url path", r.URL.Path),
			zap.Error(err),
		)
		ReturnHTTPError(w, BadRequestError("Invalid request payload"))
		return err
	}

	err = request.Validate(strfmt.Default)
	if err != nil {
		stringErr := fmt.Sprintf("Failed to read request body because validation failed on %s", reflect.TypeOf(request))
		zap.L().Error(stringErr,
			zap.Any("Request", request),
			zap.String("url path", r.URL.Path),
			zap.Error(err),
		)
		ReturnHTTPError(w, BadRequestError("Missing required fields: "+err.Error()))
		return err
	}
	return nil
}

func GetIntegerVariableFromPath(variableName string, r *http.Request) (uint64, error) {
	pathVariable := mux.Vars(r)[variableName]
	parsedVariable, err := strconv.ParseUint(pathVariable, 10, 64)
	return parsedVariable, err
}

func GetVariableFromPath(variableName string, r *http.Request) string {
	pathVariable := mux.Vars(r)[variableName]
	return pathVariable
}

func ReturnHTTPOKWithInterface(w http.ResponseWriter, responseBody interface{}) {
	prepareJSONResponse(w, http.StatusOK)
	marshalInterfaceToBytesAndWriteResponse(w, responseBody)
}

func ReturnHTTPOK(w http.ResponseWriter) {
	prepareJSONResponse(w, http.StatusOK)
}

func ReturnHTTPServiceUnavailable(w http.ResponseWriter) {
	prepareJSONResponse(w, http.StatusServiceUnavailable)
}

func ReturnHTTPCreatedWithInterface(w http.ResponseWriter, responseBody interface{}) {
	prepareJSONResponse(w, http.StatusCreated)
	marshalInterfaceToBytesAndWriteResponse(w, responseBody)
}

func ReturnHTTPMultiStatusWithInterface(w http.ResponseWriter, responseBody interface{}) {
	prepareJSONResponse(w, http.StatusMultiStatus)
	marshalInterfaceToBytesAndWriteResponse(w, responseBody)
}

func ReturnHTTPBadRequestWithInterface(w http.ResponseWriter, responseBody interface{}) {
	prepareJSONResponse(w, http.StatusBadRequest)
	marshalInterfaceToBytesAndWriteResponse(w, responseBody)
}

func ReturnHTTPCreated(w http.ResponseWriter) {
	prepareJSONResponse(w, http.StatusCreated)
}

func ReturnHTTPNotImplemented(w http.ResponseWriter) {
	prepareJSONResponse(w, http.StatusNotImplemented)
}

func ReturnHTTPNoContentWithMessage(w http.ResponseWriter, message string) {
	prepareJSONResponse(w, http.StatusNoContent)
	marshalInterfaceToBytesAndWriteResponse(w, message)
}

func ReturnHTTPNoContent(w http.ResponseWriter) {
	prepareJSONResponse(w, http.StatusNoContent)
}

func ReturnHTTPError(w http.ResponseWriter, err *HTTPError) {
	prepareJSONResponse(w, err.ErrorCode())
	marshalInterfaceToBytesAndWriteResponse(w, err)
}

func prepareJSONResponse(w http.ResponseWriter, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
}

func marshalInterfaceToBytesAndWriteResponse(w http.ResponseWriter, i interface{}) {
	responseConvertedToBytes, err := json.Marshal(i)
	if err != nil {
		zap.S().Error("Failed to marshal interface to json",
			"interface", i,
			zap.Error(err),
		)
	}
	_, err = w.Write(responseConvertedToBytes)
	if err != nil {
		zap.L().Error("Failed to write converted interface to response writer",
			zap.ByteString("converted response", responseConvertedToBytes),
			zap.Error(err),
		)
	}
}

func ReturnUnhandledErrorResponse(w http.ResponseWriter, err error) {
	prepareJSONResponse(w, http.StatusUnprocessableEntity)
	ReturnHTTPError(w, InternalServerError(err))
}

// Currently logging request line and selected headers. No body.
func LogHTTPRequest(r *http.Request, desc string) {

	zap.L().Info(desc,
		zap.String("method", r.Method),
		zap.String("url", r.URL.String()),
		zap.String("protocol", r.Proto),
		zap.Strings("host", r.Header["Host"]),
		zap.Strings("accept-language", r.Header["Accept-Language"]),
	)
}
