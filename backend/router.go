package main

import (
	"net/http"

	"github.com/BarisKilicGsu/drugs-app-backend/common"
	"github.com/BarisKilicGsu/drugs-app-backend/middleware"
	"github.com/gorilla/mux"
)

func InitializeRoutes(env *common.Environment) *mux.Router {
	api := mux.NewRouter().StrictSlash(false).PathPrefix(env.BasePrefix).Subrouter()
	initRoutes(api)
	addAuth(api)
	http.Handle("/", api)

	return api
}

func addAuth(api *mux.Router) {
	authMiddleware := middleware.NewAuthMiddlewareHandler(RedisRepository, GormRepository)
	api.Use(authMiddleware.IsAuthorized)
}

func initRoutes(api *mux.Router) {
	initAuthRoutes(api)
	initDrugsRoutes(api)
	initUserDrugsRoutes(api)
	initDrugCategoriesRoutes(api)
}

func initAuthRoutes(api *mux.Router) {
	api.HandleFunc("/login", AuthHandler.Login).Methods(http.MethodPost).Name("post_login")
	api.HandleFunc("/logout", AuthHandler.Logout).Methods(http.MethodPost).Name("post_logout")
	api.HandleFunc("/signup", AuthHandler.Signup).Methods(http.MethodPost).Name("post_signup")
}

func initDrugsRoutes(api *mux.Router) {
	api.HandleFunc("/users/{userID:[0-9]+}/all_drugs/table", DrugsHandler.DrugsTable).Methods(http.MethodPost).Name("get_drugs_table")
}

func initUserDrugsRoutes(api *mux.Router) {
	api.HandleFunc("/users/{userID:[0-9]+}/drugs", UserDrugsHandler.AddDrugToUser).Methods(http.MethodPost).Name("create_drugs")
	api.HandleFunc("/users/{userID:[0-9]+}/drugs/table", UserDrugsHandler.UserDrugsTable).Methods(http.MethodPost).Name("get_user_drugs_table")
}

func initDrugCategoriesRoutes(api *mux.Router) {
	api.HandleFunc("/users/{userID:[0-9]+}/drug_categories/table", DrugCategoriesHandler.DrugCategoriesTable).Methods(http.MethodPost).Name("get_drugs_categories_table")
}
