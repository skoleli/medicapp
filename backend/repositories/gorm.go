package repositories

import (
	"fmt"
	"strings"

	"github.com/BarisKilicGsu/drugs-app-backend/models"
	"github.com/BarisKilicGsu/drugs-app-backend/utils"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Parameters struct {
	Entity                           interface{}
	Select                           []string
	Condition                        string
	FilterMap, SearchMap, PreloadMap map[string]string
	PageSize, Offset                 int
	Joins, GroupBy, Order            string
	NestedPreloads, Preloads         []string
	PreloadCondition, PreloadValue   string
	SoftDeleteOff                    bool
	Transaction                      *gorm.DB
	TableRequest                     *models.PostTableRequest
	ClauseOnConflict                 *clause.OnConflict
	//For Update
	Column  string
	Value   interface{}
	Updates map[string]interface{}
}

type GormRepositoryInterface interface {
	Insert(entity interface{}, transaction *gorm.DB) error
	Save(entity interface{}, transaction *gorm.DB) error
	Update(param *Parameters, conditionValues ...interface{}) error
	Delete(params Parameters, conditionValues ...interface{}) error
	FindFirst(param *Parameters, conditionValues ...interface{}) error
	ExecuteRawQuery(tx *gorm.DB, query string, args ...interface{}) ([]interface{}, error)
	StartTransaction() (*gorm.DB, error)
	FinishTransaction(tx *gorm.DB, err error) error
	RollbackTransaction(tx *gorm.DB)
	CommitTransaction(tx *gorm.DB) error
	Find(param *Parameters, conditionValues ...interface{}) error
	FindTotalCount(param *Parameters, conditionValues ...interface{}) (uint64, error)
	CheckHealth() error
}

type gormRepository struct {
	db *gorm.DB
}

func NewPostgresRepository(db *gorm.DB) GormRepositoryInterface {
	return &gormRepository{db}
}

func (repository *gormRepository) Find(param *Parameters, conditionValues ...interface{}) error {
	dbQuery := repository.db
	if param.Transaction != nil {
		dbQuery = param.Transaction
	}
	dbQuery = dbQuery.Preload(clause.Associations)
	if len(param.Select) > 0 {
		dbQuery.Select(param.Select)
	}
	if param.Condition != "" {
		dbQuery.Where(param.Condition, conditionValues...)
	}
	if param.Joins != "" {
		dbQuery.Joins(param.Joins)
	}
	if param.GroupBy != "" {
		dbQuery.Group(param.GroupBy)
	}
	for preload, preloadCondition := range param.PreloadMap {
		dbQuery.Preload(preload, preloadCondition)
	}

	if len(param.Preloads) != 0 {
		for _, preload := range param.Preloads {
			if strings.Contains(preload, ".") || param.PreloadCondition == "" {
				dbQuery.Preload(preload)
				continue
			}
			dbQuery.Preload(preload, param.PreloadCondition, param.PreloadValue)
		}
	}
	if param.TableRequest != nil {
		repository.ApplyTableRequest(dbQuery, param.TableRequest, param.FilterMap, param.SearchMap)
	}
	if param.PageSize != 0 {
		dbQuery.Offset(param.Offset).Limit(param.PageSize)
	}
	if param.SoftDeleteOff {
		dbQuery = dbQuery.Unscoped()
	}

	err := dbQuery.Find(param.Entity).Error

	return err
}

func (repository *gormRepository) FindTotalCount(param *Parameters, conditionValues ...interface{}) (uint64, error) {
	var count int64
	dbQuery := repository.db
	if param.Transaction != nil {
		dbQuery = param.Transaction
	}
	dbQuery = dbQuery.Model(param.Entity)
	if param.Condition != "" {
		dbQuery.Where(param.Condition, conditionValues...)
	}
	if param.Joins != "" {
		dbQuery.Joins(param.Joins)
	}
	if param.TableRequest != nil {
		repository.ApplyTableRequest(dbQuery, param.TableRequest, param.FilterMap, param.SearchMap)
	}
	err := dbQuery.Count(&count).Error
	return uint64(count), err
}

func (repository *gormRepository) ApplyTableRequest(dbQuery *gorm.DB, tableRequest *models.PostTableRequest, filterMap, searchMap map[string]string) *gorm.DB {
	if tableRequest != nil {
		if tableRequest.Sort != nil {
			dbQuery = repository.SortFilter(dbQuery, tableRequest.Sort, filterMap)
		}
		if tableRequest.Filters != nil {
			for _, filter := range tableRequest.Filters {
				dbQuery = repository.ApplyFilter(dbQuery, filter, filterMap)
			}
		}
		if tableRequest.Search != nil && *tableRequest.Search != "" {
			dbQuery = repository.SearchFilter(dbQuery, *tableRequest.Search, searchMap)
		}
	}
	return dbQuery
}

func (repository *gormRepository) SortFilter(query *gorm.DB, sort map[string]string,
	filterMap map[string]string) *gorm.DB {
	for key, value := range sort {
		query = query.Order(fmt.Sprintf("%s %s", filterMap[key], value))
	}
	return query
}

func (repository *gormRepository) SearchFilter(query *gorm.DB, search string,
	searchMap map[string]string) *gorm.DB {

	field := fmt.Sprintf("%s ILIKE ?", searchMap["field"])
	if searchMap["joins"] == "name" {
		query = query.Joins(searchMap["joins"])
	}
	var additionalField string
	var secondaryAdditionalField string
	if searchMap["additionalField"] != "" {
		additionalField = fmt.Sprintf("%s ILIKE ?", searchMap["additionalField"])
		secondaryAdditionalField = fmt.Sprintf("%s ILIKE ?", searchMap["secondaryAdditionalField"])
	}
	if additionalField != "" {
		query = query.Where(fmt.Sprintf("(%s OR %s OR %s)", field, additionalField, secondaryAdditionalField), "%"+search+"%", "%"+search+"%", "%"+search+"%")
		return query
	}
	query = query.Where(field, "%"+search+"%")
	return query
}

func (repository *gormRepository) ApplyFilter(query *gorm.DB,
	filter *models.Filter, filterMap map[string]string) *gorm.DB {

	key := *filter.Key
	op := *filter.Op
	value := filter.Value
	if op == "eq" {
		query = query.Where(fmt.Sprintf("%s = ?", filterMap[key]), value)
	} else if op == "ne" {
		query = query.Where(fmt.Sprintf("%s != ?", filterMap[key]), value)
	} else if op == "gt" {
		query = query.Where(fmt.Sprintf("%s > ?", filterMap[key]), value)
	} else if op == "ge" {
		query = query.Where(fmt.Sprintf("%s >= ?", filterMap[key]), value)
	} else if op == "lt" {
		query = query.Where(fmt.Sprintf("%s < ?", filterMap[key]), value)
	} else if op == "le" {
		query = query.Where(fmt.Sprintf("%s <= ?", filterMap[key]), value)
	} else if op == "in" {
		query = query.Where(fmt.Sprintf("%s IN ?", filterMap[key]), value)
	} else if op == "ni" {
		query = query.Where(fmt.Sprintf("%s NOT IN ?", filterMap[key]), value)
	} else if op == "ct" {
		query = query.Where(fmt.Sprintf("%s LIKE ?", filterMap[key]), "%"+utils.ConvertSliceToValue(value).(string)+"%")
	} else if op == "sw" {
		query = query.Where(fmt.Sprintf("%s LIKE ?", filterMap[key]), utils.ConvertSliceToValue(value).(string)+"%")
	} else if op == "ew" {
		query = query.Where(fmt.Sprintf("%s LIKE ?", filterMap[key]), "%"+utils.ConvertSliceToValue(value).(string))
	}
	return query
}

func (repository *gormRepository) Insert(entity interface{}, transaction *gorm.DB) error {
	dbQuery := repository.db
	if transaction != nil {
		dbQuery = transaction
	}
	return dbQuery.Create(entity).Error
}

func (repository *gormRepository) Save(entity interface{}, transaction *gorm.DB) error {
	dbQuery := repository.db
	if transaction != nil {
		dbQuery = transaction
	}
	return dbQuery.Save(entity).Error
}

func (repository *gormRepository) Update(param *Parameters, conditionValues ...interface{}) error {
	dbQuery := repository.db
	if param.Transaction != nil {
		dbQuery = param.Transaction
	}
	dbQuery = dbQuery.Model(param.Entity) /* Preload(clause.Associations).
	Omit(clause.Associations). */
	if param.Condition != "" {
		dbQuery.Where(param.Condition, conditionValues...)
	}
	if param.Updates != nil {
		return dbQuery.Updates(param.Updates).Error
	} else if param.Column != "" && param.Value != nil {
		return dbQuery.Update(param.Column, param.Value).Error
	}
	if param.SoftDeleteOff {
		dbQuery = dbQuery.Unscoped()
	}

	if param.ClauseOnConflict != nil {
		dbQuery = dbQuery.Clauses(param.ClauseOnConflict)
	}
	return dbQuery.Save(param.Entity).Error
}

func (repository *gormRepository) Delete(params Parameters, conditionValues ...interface{}) error {
	dbQuery := repository.db
	if params.Transaction != nil {
		dbQuery = params.Transaction
	}
	if params.Condition != "" {
		dbQuery.Where(params.Condition, conditionValues...)
	}
	return dbQuery.Delete(params.Entity).Error
}

func (repository *gormRepository) FindFirst(param *Parameters, conditionValues ...interface{}) error {
	dbQuery := repository.db
	if param.Transaction != nil {
		dbQuery = param.Transaction
	}
	dbQuery = dbQuery.Preload(clause.Associations)
	if len(param.Select) > 0 {
		dbQuery.Select(param.Select)
	}
	if param.Condition != "" {
		dbQuery.Where(param.Condition, conditionValues...)
	}
	if param.Joins != "" {
		dbQuery.Joins(param.Joins)
	}
	if param.GroupBy != "" {
		dbQuery.Group(param.GroupBy)
	}
	for preload, preloadCondition := range param.PreloadMap {
		if preloadCondition == "" {
			dbQuery.Preload(preload)
			continue
		}
		dbQuery.Preload(preload, preloadCondition)
	}
	if len(param.Preloads) != 0 {
		for _, preload := range param.Preloads {
			if strings.Contains(preload, ".") || param.PreloadCondition == "" {
				dbQuery.Preload(preload)
				continue
			}
			dbQuery.Preload(preload, param.PreloadCondition, param.PreloadValue)
		}
	}
	if param.Order != "" {
		dbQuery.Order(param.Order)
	}
	err := dbQuery.First(param.Entity).Error
	return err
}

func (repository *gormRepository) CheckHealth() error {
	sql, err := repository.db.DB()
	if err != nil {
		return err
	}
	err = sql.Ping()

	return err
}

func (repository *gormRepository) ExecuteRawQuery(tx *gorm.DB, query string, args ...interface{}) ([]interface{}, error) {
	var result []interface{}
	rows, err := tx.Raw(query, args...).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var rowValue interface{}
		err := rows.Scan(&rowValue)
		if err != nil {
			return nil, err
		}
		result = append(result, rowValue)
	}
	return result, nil
}

func (repository *gormRepository) StartTransaction() (*gorm.DB, error) {
	tx := repository.db.Begin()
	if tx.Error != nil {
		return nil, tx.Error
	}
	return tx, nil
}

func (repository *gormRepository) FinishTransaction(tx *gorm.DB, err error) error {
	if err != nil {
		repository.RollbackTransaction(tx)
		return err
	}

	err = repository.CommitTransaction(tx)
	if err != nil {
		return err
	}

	return nil
}

func (repository *gormRepository) CommitTransaction(tx *gorm.DB) error {
	err := tx.Commit().Error
	if err != nil {
		zap.L().Error("Failed to commit transaction", zap.Error(err))
		repository.RollbackTransaction(tx)
	}
	return err
}

func (repository *gormRepository) RollbackTransaction(tx *gorm.DB) {
	err := tx.Rollback().Error
	if err != nil {
		zap.L().Error("Failed to rollback transaction", zap.Error(err))
	}
}
