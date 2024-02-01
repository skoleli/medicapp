package handlers

import (
	"net/http"

	"github.com/BarisKilicGsu/drugs-app-backend/entities"
	"github.com/BarisKilicGsu/drugs-app-backend/models"
	"github.com/BarisKilicGsu/drugs-app-backend/repositories"
	"github.com/BarisKilicGsu/drugs-app-backend/utils"
	"go.uber.org/zap"
)

type DrugsHandler struct {
	gormRepo repositories.GormRepositoryInterface
}

func NewDrugsHandler(gormRepo repositories.GormRepositoryInterface) *DrugsHandler {
	return &DrugsHandler{
		gormRepo: gormRepo,
	}
}

func (handler *DrugsHandler) DrugsTable(w http.ResponseWriter, r *http.Request) {

	utils.LogHTTPRequest(r, "Drugs Table")

	postTableRequest := &models.PostTableRequest{}
	err := utils.GenerateModelFromBody(postTableRequest, w, r)
	if err != nil {
		return
	}

	drugs := []*entities.Drug{}

	p := repositories.Parameters{
		Entity:       &drugs,
		Preloads:     []string{"DrugCategory"},
		Joins:        "INNER JOIN drug_categories ON drug_categories.id = drugs.drug_category_id",
		TableRequest: postTableRequest,
		FilterMap: map[string]string{
			"id":                        "drugs.id",
			"image_url":                 "drugs.image_url",
			"name":                      "drugs.name",
			"side_effects":              "drugs.side_effects",
			"warnings":                  "drugs.warnings",
			"description":               "drugs.description",
			"drug_category_name":        "drug_categories.name",
			"drug_category_description": "drug_categories.description",
			"drug_category_id":          "drug_categories.id",
			"created_at":                "drugs.created_at",
			"updated_at":                "drugs.updated_at",
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

	err = handler.gormRepo.Find(&p)
	if err != nil {
		zap.L().Error("Failed to get drugs table",
			zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	totalRecord, err := handler.gormRepo.FindTotalCount(&p)
	if err != nil {
		zap.L().Error("Failed to get drugs table",
			zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	var drugsResponse []*models.DrugsResponse
	for _, drug := range drugs {
		drugsResponse = append(drugsResponse, DrugToApiResponse(drug))
	}

	apiResponse := &models.DrugsTableResponse{
		Records:      drugsResponse,
		TotalRecords: totalRecord,
	}

	utils.ReturnHTTPOKWithInterface(w, apiResponse)
}

func DrugToApiResponse(drug *entities.Drug) *models.DrugsResponse {
	return &models.DrugsResponse{
		ID:                      drug.ID,
		Name:                    drug.Name,
		Description:             drug.Description,
		ImageURL:                drug.ImageURL,
		SideEffects:             drug.SideEffects,
		Warnings:                drug.Warnings,
		DrugCategoryID:          drug.DrugCategoryID,
		DrugCategoryDescription: drug.DrugCategory.Description,
		DrugCategoryName:        drug.DrugCategory.Name,
	}
}
