import { InputGroup, FormGroup } from "@blueprintjs/core";
import { Divider, Button } from "@blueprintjs/core";
import Select from "react-select";
import { Formik, Field, ErrorMessage } from "formik";
import Link from "next/link";
import {
  RowForm,
  RowFormGroup,
  RenderErrorMessage,
} from "../../pages/testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku/form";
import ColorfulIcon from "../layout/ColorfulIcon";
import { getRelation } from "../oswiadczenie/OtherHereditariesRenderer";
import * as yup from "yup";

export default function Movables({ errors, values, setFieldValue }) {
  return (
    <Formik
      onSubmit={(newValues, { resetForm }) => {
        const newMovables = [...values.movables];
        newMovables.push(newValues);

        setFieldValue("movables", newMovables);
        resetForm();
      }}
      validationSchema={yup.object().shape({
        value: yup
          .number()
          .positive("Wartość ruchomości musi być większa od 0.")
          .required("To pole jest wymagane.")
          .nullable(),

        type: yup.number().required("To pole jest wymagane.").nullable(),
        //testament
      })}
      initialValues={{
        type: null,
        value: null,
        vehicleType: null,
        vehicleBrand: "",
        vehicleModel: "",
        vehicleRegistration: "",
        itemName: "",
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, errors, touched, handleSubmit, setFieldValue }) => {
        return (
          <div className="w-full flex flex-col">
            <h3 className="flex items-center text-2xl  w-full">
              <ColorfulIcon
                size={18}
                style={{ marginRight: 7 }}
                color="100, 149, 237"
                icon="known-vehicle"
              />
              Ruchomości spadkodawcy
            </h3>
            <p className="text-xs">
              Dodaj kolejno ruchomości (pojazdy, wartościowe przedmioty np.
              meble, biżuteria, dzieła sztuki, kolekcje itp.) wchodzące w skład
              majątku spadkodawcy. Jeśli w majątku spadkodawcy nie ma znaczących
              ruchomości, pomiń ten krok.
            </p>
            <Divider className="mt-4 mb-4 w-full" />
            <h3 className="text-sm mb-2  w-full">DANE RUCHOMOŚCI:</h3>
            <FormGroup label="rodzaj ruchomości:">
              <Field
                as={Select}
                menuPortalTarget={document.body}
                options={[1, 2].map((type) => {
                  return {
                    value: type,
                    label: getPropertyType({ type }),
                  };
                })}
                isSearchable={false}
                onChange={({ value }) => {
                  setFieldValue("type", value);
                }}
                value={
                  values.type == null
                    ? null
                    : {
                        value: values.type,
                        label: getPropertyType(values),
                      }
                }
                placeholder="wybierz..."
                name="type"
                leftIcon="take-action"
                intent={errors.type && touched.type ? "danger" : "none"}
              />
              <ErrorMessage name="propertyType">
                {RenderErrorMessage}
              </ErrorMessage>
            </FormGroup>
            <RowForm>
              <RowFormGroup
                style={{ width: "100%" }}
                label="wartość ruchomości (w zł):"
              >
                <Field
                  as={InputGroup}
                  value={values.value || (true && "")}
                  onChange={(e) => setFieldValue("value", e.target.value)}
                  type="number"
                  leftIcon="dollar"
                  placeholder="np. 20000"
                  intent={errors.value && touched.value ? "danger" : "none"}
                />
                <ErrorMessage name="value">{RenderErrorMessage}</ErrorMessage>
              </RowFormGroup>
            </RowForm>

            {values.type == 1 ? (
              <>
                <RowForm className="">
                  <RowFormGroup label="rodzaj pojazdu:">
                    <Field
                      name="value"
                      validate={(value) =>
                        value ? null : "To pole jest wymagane."
                      }
                      as={Select}
                      menuPortalTarget={document.body}
                      options={[1, 2, 3].map((type) => {
                        return {
                          value: type,
                          label: getVehicleType({ type }),
                        };
                      })}
                      isSearchable={false}
                      onChange={({ value }) => {
                        setFieldValue("vehicleType", value);
                      }}
                      value={
                        values.vehicleType == null
                          ? null
                          : {
                              value: values.vehicleType,
                              label: getVehicleType(values),
                            }
                      }
                      placeholder="wybierz..."
                      intent={
                        errors.vehicleType && touched.vehicleType
                          ? "danger"
                          : "none"
                      }
                    />
                    <ErrorMessage name="vehicleType">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>
                  <RowFormGroup label="marka pojazdu:">
                    <Field
                      validate={(value) =>
                        value ? null : "To pole jest wymagane."
                      }
                      as={InputGroup}
                      name="vehicleBrand"
                      leftIcon="known-vehicle"
                      placeholder="np. Volkswagen"
                      intent={
                        errors.vehicleBrand && touched.vehicleBrand
                          ? "danger"
                          : "none"
                      }
                    />
                    <ErrorMessage name="vehicleBrand">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>
                </RowForm>
                <RowForm>
                  <RowFormGroup label="model pojazdu:">
                    <Field
                      validate={(value) =>
                        value ? null : "To pole jest wymagane."
                      }
                      as={InputGroup}
                      name="vehicleModel"
                      leftIcon="application"
                      placeholder="np. Polo Classic"
                      intent={
                        errors.vehicleModel && touched.vehicleModel
                          ? "danger"
                          : "none"
                      }
                    />
                    <ErrorMessage name="vehicleModel">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>

                  <RowFormGroup label="numer rejestracyjny pojazdu:">
                    <Field
                      as={InputGroup}
                      validate={(value) =>
                        value ? null : "To pole jest wymagane."
                      }
                      name="vehicleRegistration"
                      placeholder="np. AA 111AA"
                      leftIcon="numerical"
                      intent={
                        errors.vehicleRegistration &&
                        touched.vehicleRegistration
                          ? "danger"
                          : "none"
                      }
                    />
                    <ErrorMessage name="vehicleRegistration">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>
                </RowForm>
              </>
            ) : null}
            {values.type == 2 ? (
              <RowForm>
                <RowFormGroup
                  style={{ width: "100%" }}
                  label="nazwa ruchomości:"
                >
                  <Field
                    validate={(value) =>
                      value ? null : "To pole jest wymagane."
                    }
                    as={InputGroup}
                    name="itemName"
                    leftIcon="application"
                    placeholder="np. kolekcja znaczków pocztowych"
                    intent={
                      errors.itemName && touched.itemName ? "danger" : "none"
                    }
                  />
                  <ErrorMessage name="itemName">
                    {RenderErrorMessage}
                  </ErrorMessage>
                </RowFormGroup>
              </RowForm>
            ) : null}

            <Button
              className="w-full mt-4"
              outlined
              icon="add"
              onClick={() => {
                handleSubmit();
              }}
            >
              DODAJ
            </Button>
          </div>
        );
      }}
    </Formik>
  );
}

const getPropertyType = ({ type }) => {
  switch (type) {
    case 1:
      return "pojazd";
    case 2:
      return "przedmiot wartościowy";
  }
};

const getVehicleType = ({ type }) => {
  switch (type) {
    case 1:
      return "samochód osobowy";
    case 2:
      return "samochód ciężarowy";
    case 3:
      return "motocykl";
  }
};
