package utils

import (
	"reflect"
	"strings"
)

func IsContains[T comparable](checkElem T, list []T) bool {
	if list == nil {
		return false
	}
	for _, e := range list {
		if checkElem == e {
			return true
		}
	}
	return false
}

func IsStringContains(checkElem, value string) bool {
	return strings.Contains(strings.ToLower(value), strings.ToLower(checkElem))
}

func ConvertSliceToValue(value interface{}) interface{} {
	reflectValue := reflect.ValueOf(value)

	isSlice := reflectValue.Kind() == reflect.Slice
	if isSlice {
		return reflectValue.Index(0).Interface()
	}
	return reflectValue.Interface()
}
