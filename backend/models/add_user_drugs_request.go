// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"encoding/json"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// AddUserDrugsRequest add user drugs request
//
// swagger:model AddUserDrugsRequest
type AddUserDrugsRequest struct {

	// dosage frequency
	// Required: true
	// Minimum: 0
	DosageFrequency *uint64 `json:"dosage_frequency"`

	// drug id
	// Required: true
	DrugID *uint64 `json:"drug_id"`

	// end date
	// Format: date
	EndDate *strfmt.Date `json:"end_date,omitempty"`

	// is fasting
	// Required: true
	IsFasting *bool `json:"is_fasting"`

	// start date
	// Required: true
	// Format: date
	StartDate *strfmt.Date `json:"start_date"`

	// status
	// Enum: [ACTIVE PAUSED]
	Status *string `json:"status,omitempty"`
}

// Validate validates this add user drugs request
func (m *AddUserDrugsRequest) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateDosageFrequency(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateDrugID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateEndDate(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateIsFasting(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateStartDate(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateStatus(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *AddUserDrugsRequest) validateDosageFrequency(formats strfmt.Registry) error {

	if err := validate.Required("dosage_frequency", "body", m.DosageFrequency); err != nil {
		return err
	}

	if err := validate.MinimumUint("dosage_frequency", "body", *m.DosageFrequency, 0, false); err != nil {
		return err
	}

	return nil
}

func (m *AddUserDrugsRequest) validateDrugID(formats strfmt.Registry) error {

	if err := validate.Required("drug_id", "body", m.DrugID); err != nil {
		return err
	}

	return nil
}

func (m *AddUserDrugsRequest) validateEndDate(formats strfmt.Registry) error {
	if swag.IsZero(m.EndDate) { // not required
		return nil
	}

	if err := validate.FormatOf("end_date", "body", "date", m.EndDate.String(), formats); err != nil {
		return err
	}

	return nil
}

func (m *AddUserDrugsRequest) validateIsFasting(formats strfmt.Registry) error {

	if err := validate.Required("is_fasting", "body", m.IsFasting); err != nil {
		return err
	}

	return nil
}

func (m *AddUserDrugsRequest) validateStartDate(formats strfmt.Registry) error {

	if err := validate.Required("start_date", "body", m.StartDate); err != nil {
		return err
	}

	if err := validate.FormatOf("start_date", "body", "date", m.StartDate.String(), formats); err != nil {
		return err
	}

	return nil
}

var addUserDrugsRequestTypeStatusPropEnum []interface{}

func init() {
	var res []string
	if err := json.Unmarshal([]byte(`["ACTIVE","PAUSED"]`), &res); err != nil {
		panic(err)
	}
	for _, v := range res {
		addUserDrugsRequestTypeStatusPropEnum = append(addUserDrugsRequestTypeStatusPropEnum, v)
	}
}

const (

	// AddUserDrugsRequestStatusACTIVE captures enum value "ACTIVE"
	AddUserDrugsRequestStatusACTIVE string = "ACTIVE"

	// AddUserDrugsRequestStatusPAUSED captures enum value "PAUSED"
	AddUserDrugsRequestStatusPAUSED string = "PAUSED"
)

// prop value enum
func (m *AddUserDrugsRequest) validateStatusEnum(path, location string, value string) error {
	if err := validate.EnumCase(path, location, value, addUserDrugsRequestTypeStatusPropEnum, true); err != nil {
		return err
	}
	return nil
}

func (m *AddUserDrugsRequest) validateStatus(formats strfmt.Registry) error {
	if swag.IsZero(m.Status) { // not required
		return nil
	}

	// value enum
	if err := m.validateStatusEnum("status", "body", *m.Status); err != nil {
		return err
	}

	return nil
}

// ContextValidate validates this add user drugs request based on context it is used
func (m *AddUserDrugsRequest) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *AddUserDrugsRequest) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *AddUserDrugsRequest) UnmarshalBinary(b []byte) error {
	var res AddUserDrugsRequest
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
