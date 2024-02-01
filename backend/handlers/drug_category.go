package handlers

import (
	"net/http"

	"github.com/BarisKilicGsu/drugs-app-backend/entities"
	"github.com/BarisKilicGsu/drugs-app-backend/models"
	"github.com/BarisKilicGsu/drugs-app-backend/repositories"
	"github.com/BarisKilicGsu/drugs-app-backend/utils"
	"go.uber.org/zap"
)

type DrugCategoriesHandler struct {
	gormRepo repositories.GormRepositoryInterface
}

func NewDrugCategoriesHandler(gormRepo repositories.GormRepositoryInterface) *DrugCategoriesHandler {
	return &DrugCategoriesHandler{
		gormRepo: gormRepo,
	}
}

func (handler *DrugCategoriesHandler) DrugCategoriesTable(w http.ResponseWriter, r *http.Request) {

	utils.LogHTTPRequest(r, "Drugs Categories Table")

	postTableRequest := &models.PostTableRequest{}
	err := utils.GenerateModelFromBody(postTableRequest, w, r)
	if err != nil {
		return
	}

	drugCategories := []*entities.DrugCategory{}

	p := repositories.Parameters{
		Entity:       &drugCategories,
		TableRequest: postTableRequest,
		FilterMap: map[string]string{
			"id":          "id",
			"description": "description",
			"name":        "name",
			"created_at":  "created_at",
			"updated_at":  "updated_at",
		},
		SearchMap: map[string]string{"field": "name"},
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
		zap.L().Error("Failed to get drugs categories table",
			zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	totalRecord, err := handler.gormRepo.FindTotalCount(&p)
	if err != nil {
		zap.L().Error("Failed to get drugs categories table",
			zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	var drugCategoriesResponse []*models.DrugCategoriesResponse
	for _, drugCategori := range drugCategories {
		drugCategoriesResponse = append(drugCategoriesResponse, DrugCategoriesToApiResponse(drugCategori))
	}

	apiResponse := &models.DrugCategoriesTableResponse{
		Records:      drugCategoriesResponse,
		TotalRecords: totalRecord,
	}

	utils.ReturnHTTPOKWithInterface(w, apiResponse)
}

func DrugCategoriesToApiResponse(drug *entities.DrugCategory) *models.DrugCategoriesResponse {
	return &models.DrugCategoriesResponse{
		ID:          drug.ID,
		Name:        drug.Name,
		Description: drug.Description,
	}
}
