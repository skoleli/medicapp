package utils

import (
	"fmt"
	"net/http"
)

type HTTPError struct {
	Code    int
	Message string
}

func (e *HTTPError) Error() string {
	return e.Message
}

func (e *HTTPError) ErrorCode() int {
	return e.Code
}

func UnauthorizedError() *HTTPError {
	return &HTTPError{http.StatusUnauthorized,
		"Permission Required."}
}

func ForbiddenError() *HTTPError {
	return &HTTPError{http.StatusForbidden,
		"Forbidden."}
}

func BadRequestError(value string) *HTTPError {
	return &HTTPError{http.StatusBadRequest,
		fmt.Sprintf("Wrong Type %s", value)}
}

func BadRequestWithoutFormatError(value string) *HTTPError {
	return &HTTPError{http.StatusBadRequest,
		value}
}

func SchemaValidationError(err error) *HTTPError {
	return &HTTPError{http.StatusBadRequest,
		fmt.Sprintf("Error unmarshaling request body. Check your requests. Errors: %s", err)}
}

func InternalServerError(err error) *HTTPError {
	return &HTTPError{http.StatusInternalServerError,
		"Encountered an unknown error."}
}

func UnprocessableEntityError(err error) *HTTPError {
	return &HTTPError{http.StatusUnprocessableEntity,
		"Unprocessable Entity."}
}

func NotFoundError(value string) *HTTPError {
	return &HTTPError{http.StatusNotFound,
		fmt.Sprintf("Object not found: %s", value)}
}
