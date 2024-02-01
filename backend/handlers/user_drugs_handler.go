package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/BarisKilicGsu/drugs-app-backend/entities"
	"github.com/BarisKilicGsu/drugs-app-backend/models"
	"github.com/BarisKilicGsu/drugs-app-backend/repositories"
	"github.com/BarisKilicGsu/drugs-app-backend/utils"
	"github.com/go-openapi/strfmt"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type UserDrugsHandler struct {
	gormRepo repositories.GormRepositoryInterface
}

func NewUserDrugsHandler(gormRepo repositories.GormRepositoryInterface) *UserDrugsHandler {
	return &UserDrugsHandler{
		gormRepo: gormRepo,
	}
}

func (handler *UserDrugsHandler) AddDrugToUser(w http.ResponseWriter, r *http.Request) {

	utils.LogHTTPRequest(r, "Add Drugs To User")

	userID, err := strconv.ParseUint(mux.Vars(r)["userID"], 10, 64)
	if err != nil {
		zap.L().Error("Failed to add drug to user because userID could not be retrieved from path",
			zap.Error(err),
		)
		utils.ReturnHTTPError(w, utils.BadRequestError("User ID"))
		return
	}

	request := &models.AddUserDrugsRequest{}
	err = utils.GenerateModelFromBody(request, w, r)
	if err != nil {
		return
	}

	drug := entities.Drug{}
	p := repositories.Parameters{
		Entity:    &drug,
		Condition: "id = ?",
	}

	err = handler.gormRepo.FindFirst(&p, request.DrugID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			zap.L().Error("Failed to add drug to user because drug could not found", zap.Error(err))
			utils.ReturnHTTPError(w, utils.NotFoundError("drug"))
		} else {
			zap.L().Error("Failed to add drug to user because drug could not be fetch from repo", zap.Error(err))
			utils.ReturnHTTPError(w, utils.InternalServerError(err))
		}
		return
	}

	userDrug := entities.UserDrug{
		UserID:          userID,
		DrugID:          drug.ID,
		IsFasting:       *request.IsFasting,
		DosageFrequency: *request.DosageFrequency,
		StartDate:       time.Time(*request.StartDate),
	}

	if request.EndDate != nil {
		userDrug.EndDate = (*time.Time)(request.EndDate)
	}
	if request.Status != nil {
		userDrug.Status = *request.Status
	}

	err = handler.gormRepo.Insert(&userDrug, nil)
	if err != nil {
		zap.L().Error("Failed to add drug to user because user drugs could not be created", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	utils.ReturnHTTPOK(w)

}

func (handler *UserDrugsHandler) UserDrugsTable(w http.ResponseWriter, r *http.Request) {

	utils.LogHTTPRequest(r, "User Drugs Table")

	userID, err := strconv.ParseUint(mux.Vars(r)["userID"], 10, 64)
	if err != nil {
		zap.L().Error("Failed get user drug table because userID could not be retrieved from path",
			zap.Error(err),
		)
		utils.ReturnHTTPError(w, utils.BadRequestError("User ID"))
		return
	}

	postTableRequest := &models.PostTableRequest{}
	err = utils.GenerateModelFromBody(postTableRequest, w, r)
	if err != nil {
		return
	}

	userDrugs := []*entities.UserDrug{}

	p := repositories.Parameters{
		Entity:       &userDrugs,
		Preloads:     []string{"Drug", "Drug.DrugCategory"},
		Condition:    "user_id = ?",
		Joins:        "INNER JOIN drugs ON drugs.id = user_drugs.drug_id JOIN drug_categories ON drug_categories.id = drugs.drug_category_id",
		TableRequest: postTableRequest,
		FilterMap: map[string]string{
			"id":                        "id",
			"drug_id":                   "drugs.id",
			"dosage_frequency":          "user_drugs.dosage_frequency",
			"is_fasting":                "user_drugs.is_fasting",
			"start_date":                "user_drugs.start_date",
			"end_date":                  "user_drugs.end_date",
			"image_url":                 "drugs.image_url",
			"name":                      "drugs.name",
			"side_effects":              "drugs.side_effects",
			"warnings":                  "drugs.warnings",
			"description":               "drugs.description",
			"drug_category_name":        "drug_categories.name",
			"drug_category_description": "drug_categories.description",
			"drug_category_id":          "drug_categories.id",
			"created_at":                "user_drugs.created_at",
			"updated_at":                "user_drugs.updated_at",
		},
		SearchMap: map[string]string{"field": "drugs.name"},
	}

	if postTableRequest.Page != nil && postTableRequest.PageSize != nil {
		pageSize := *postTableRequest.PageSize
		page := *postTableRequest.Page
		offset := (page - 1) * pageSize
		p.PageSize = int(pageSize)
		p.Offset = int(offset)
	}

	err = handler.gormRepo.Find(&p, userID)
	if err != nil {
		zap.L().Error("Failed to get user drugs table",
			zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	totalRecord, err := handler.gormRepo.FindTotalCount(&p, userID)
	if err != nil {
		zap.L().Error("Failed to get user drugs table",
			zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	fmt.Println(totalRecord)

	a, _ := json.Marshal(userDrugs)
	fmt.Println(string(a))

	var userDrugResponse []*models.UserDrugResponse
	for _, userDrug := range userDrugs {
		userDrugResponse = append(userDrugResponse, UserDrugToApiResponse(userDrug))
	}

	apiResponse := &models.UserDrugsTableResponse{
		Records:      userDrugResponse,
		TotalRecords: totalRecord,
	}

	utils.ReturnHTTPOKWithInterface(w, apiResponse)
}

func UserDrugToApiResponse(userDrug *entities.UserDrug) *models.UserDrugResponse {
	response := &models.UserDrugResponse{
		ID:                      userDrug.ID,
		DrugID:                  userDrug.DrugID,
		Name:                    userDrug.Drug.Name,
		Description:             userDrug.Drug.Description,
		ImageURL:                userDrug.Drug.ImageURL,
		DosageFrequency:         userDrug.DosageFrequency,
		Warnings:                userDrug.Drug.Warnings,
		SideEffects:             userDrug.Drug.SideEffects,
		DrugCategoryDescription: userDrug.Drug.DrugCategory.Description,
		DrugCategoryName:        userDrug.Drug.DrugCategory.Name,
		DrugCategoryID:          userDrug.Drug.DrugCategory.ID,
		StartDate:               strfmt.Date(userDrug.StartDate),
		IsFasting:               userDrug.IsFasting,
		Status:                  userDrug.Status,
	}

	if userDrug.EndDate != nil {
		response.EndDate = strfmt.Date(*userDrug.EndDate)
	}
	return response
}
