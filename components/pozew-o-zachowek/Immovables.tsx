import { InputGroup, FormGroup } from "@blueprintjs/core";
import { Divider, Button } from "@blueprintjs/core";
import Select from "react-select";
import { Formik, Field, ErrorMessage } from "formik";
import Link from "next/link";
import {
  RowForm,
  RowFormGroup,
  RenderErrorMessage,
} from "../../pages/testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku";
import ColorfulIcon from "../layout/ColorfulIcon";
import { getRelation } from "../oswiadczenie/OtherHereditariesRenderer";
import * as yup from "yup";

export default function Immovables({ errors, values, setFieldValue }) {
  return (
    <Formik
      onSubmit={(newValues, { resetForm }) => {
        const newImmovables = [...values.immovables];
        newImmovables.push(newValues);

        setFieldValue("immovables", newImmovables);
        resetForm({
          //@ts-ignore
          address: "",
          number: "",
          courtName: "",
          date: "",
          propertyValue: null,
          share: "",
          deadShare: "",
          propertyType: null,
          fieldSurfaceArea: null,
          buildingSurfaceArea: null,
          buildingType: null,
        });
      }}
      validationSchema={yup.object().shape({
        address: yup.string().required("To pole jest wymagane."),
        number: yup.string().required("To pole jest wymagane."),
        courtName: yup.string().required("To pole jest wymagane."),
        date: yup.date().required("To pole jest wymagane."),
        propertyValue: yup
          .number()
          .positive("Wartość nieruchomości musi być większa od 0.")
          .required("To pole jest wymagane.")
          .nullable(),
        share: yup
          .string()
          .matches(
            /[1-9][0-9]*\/[1-9][0-9]*/,
            "To pole musi zawierać właściwy ułamek zwykły większy od 0 lub być puste."
          ),
        deadShare: yup
          .string()
          .matches(
            /[1-9][0-9]*\/[1-9][0-9]*/,
            "To pole musi zawierać właściwy ułamek zwykły większy od 0 lub być puste."
          ),

        propertyType: yup
          .number()
          .required("To pole jest wymagane.")
          .nullable(),
        //testament
      })}
      initialValues={{
        address: "",
        number: "",
        courtName: "",
        date: "",
        propertyValue: null,
        share: "",
        deadShare: "",
        propertyType: null,
        fieldSurfaceArea: null,
        buildingSurfaceArea: null,
        buildingType: null,
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
                icon="home"
              />
              Nieruchomości spadkodawcy
            </h3>
            <p className="text-xs">
              Dodaj kolejno nieruchomości wchodzące w skład majątku spadkodawcy.
              Jeśli spadkodawca nie był właścicielem ani współwłaścicielem
              żadnej nieruchomości, pomiń ten krok.
            </p>
            <Divider className="mt-4 mb-4 w-full" />
            <h3 className="text-sm mb-2  w-full">DANE NIERUCHOMOŚCI:</h3>
            <RowForm className="">
              <RowFormGroup label="pełny adres nieruchomości:">
                <Field
                  as={InputGroup}
                  name="address"
                  leftIcon="home"
                  placeholder="np. ul. Polska 12, 21-522 Gdańsk"
                  intent={errors.address && touched.address ? "danger" : "none"}
                />
                <ErrorMessage name="address">{RenderErrorMessage}</ErrorMessage>
              </RowFormGroup>
              <RowFormGroup label="numer księgi wieczystej:">
                <Field
                  as={InputGroup}
                  name="number"
                  leftIcon="book"
                  placeholder="np. KA1S/12345678/9"
                  intent={errors.number && touched.number ? "danger" : "none"}
                />
                <ErrorMessage name="number">{RenderErrorMessage}</ErrorMessage>
              </RowFormGroup>
            </RowForm>
            <RowForm>
              <RowFormGroup label="nazwa sądu prowadzącego księgę:">
                <Field
                  as={InputGroup}
                  name="courtName"
                  leftIcon="take-action"
                  placeholder="np. Sąd Okręgowy w Elblągu"
                  intent={
                    errors.courtName && touched.courtName ? "danger" : "none"
                  }
                />
                <ErrorMessage name="courtName">
                  {RenderErrorMessage}
                </ErrorMessage>
              </RowFormGroup>

              <RowFormGroup label="data odpisu zwykłego księgi:">
                <Field
                  as={InputGroup}
                  name="date"
                  leftIcon="calendar"
                  type="date"
                  intent={errors.date && touched.date ? "danger" : "none"}
                />
                <ErrorMessage name="date">{RenderErrorMessage}</ErrorMessage>
              </RowFormGroup>
            </RowForm>
            <RowForm>
              <RowFormGroup
                style={{ width: "100%" }}
                label="wartość nieruchomości (w zł):"
              >
                <InputGroup
                  type="number"
                  leftIcon="dollar"
                  placeholder="np. 20000"
                  value={values.propertyValue || (true && "")}
                  onChange={(e) =>
                    setFieldValue("propertyValue", e.target.value)
                  }
                  intent={
                    errors.propertyValue && touched.propertyValue
                      ? "danger"
                      : "none"
                  }
                />
                <ErrorMessage name="propertyValue">
                  {RenderErrorMessage}
                </ErrorMessage>
              </RowFormGroup>
            </RowForm>
            <Divider className="mt-4 mb-4" />
            <h3 className="text-sm mb-2  w-full">UDZIAŁY:</h3>

            <RowForm>
              <RowFormGroup
                style={{ width: "100%" }}
                label={
                  <div className="flex flex-col">
                    udział zmarłego w nieruchomości:
                    <p className="text-xs text-gray-400">
                      jeśli zmarły był właścicielem całości nieruchomośći,
                      pozostaw pole puste
                    </p>
                  </div>
                }
              >
                <Field
                  as={InputGroup}
                  name="deadShare"
                  leftIcon="pie-chart"
                  placeholder="np. 1/3"
                  intent={
                    errors.deadShare && touched.deadShare ? "danger" : "none"
                  }
                />
                <ErrorMessage name="deadShare">
                  {RenderErrorMessage}
                </ErrorMessage>
              </RowFormGroup>
            </RowForm>
            <RowForm>
              <RowFormGroup
                style={{ width: "100%" }}
                label={
                  <div className="flex flex-col">
                    Twój udział w nieruchomości:
                    <p className="text-xs text-gray-400">
                      jeśli żadna część nieruchomośći do tej pory nie należała
                      do Ciebie, pozostaw pole puste
                    </p>
                  </div>
                }
              >
                <Field
                  as={InputGroup}
                  name="share"
                  leftIcon="pie-chart"
                  placeholder="np. 1/2"
                  intent={errors.share && touched.share ? "danger" : "none"}
                />
                <ErrorMessage name="share">{RenderErrorMessage}</ErrorMessage>
              </RowFormGroup>
            </RowForm>
            <Divider className="mt-4 mb-4" />

            <FormGroup label="rodzaj nieruchomości:">
              <Field
                as={Select}
                menuPortalTarget={document.body}
                options={[1, 2, 3, 4, 5].map((type) => {
                  return {
                    value: type,
                    label: getPropertyType({ propertyType: type }),
                  };
                })}
                isSearchable={false}
                onChange={({ value }) => {
                  setFieldValue("propertyType", value);
                }}
                value={
                  values.propertyType == null
                    ? null
                    : {
                        value: values.propertyType,
                        label: getPropertyType(values),
                      }
                }
                placeholder="wybierz..."
                name="propertyType"
                leftIcon="take-action"
                intent={
                  errors.propertyType && touched.propertyType
                    ? "danger"
                    : "none"
                }
              />
              <ErrorMessage name="propertyType">
                {RenderErrorMessage}
              </ErrorMessage>
            </FormGroup>
            {[1, 3, 4].includes(values.propertyType) ? (
              <RowForm>
                <RowFormGroup
                  style={{ width: "100%" }}
                  label={
                    <>
                      powierzchnia{" "}
                      {[1, 3].includes(values.propertyType)
                        ? "budynku"
                        : "lokalu"}{" "}
                      (w m<sup>2</sup> ):
                    </>
                  }
                >
                  <Field
                    as={InputGroup}
                    name="buildingSurfaceArea"
                    type="number"
                    validate={(value) => {
                      if (!value) return "To pole jest wymagane.";
                      switch (typeof value) {
                        case "number":
                          if (value <= 0) {
                            return "To pole musi zawierać liczbę większą od 0.";
                          }
                          return null;
                        case "string":
                          return "To pole musi zawierać liczbę większą od 0.";
                      }
                      return null;
                    }}
                    leftIcon="applications"
                    placeholder="np. 200"
                    intent={
                      errors.buildingSurfaceArea && touched.buildingSurfaceArea
                        ? "danger"
                        : "none"
                    }
                  />
                  <ErrorMessage name="buildingSurfaceArea">
                    {RenderErrorMessage}
                  </ErrorMessage>
                </RowFormGroup>
              </RowForm>
            ) : null}
            {[1, 2, 5].includes(values.propertyType) ? (
              <RowForm>
                <RowFormGroup
                  style={{ width: "100%" }}
                  label={
                    <>
                      powierzchnia gruntu (w m<sup>2</sup> ):
                    </>
                  }
                >
                  <Field
                    as={InputGroup}
                    name="fieldSurfaceArea"
                    type="number"
                    validate={(value) => {
                      if (!value) return "To pole jest wymagane.";
                      switch (typeof value) {
                        case "number":
                          if (value <= 0) {
                            return "To pole musi zawierać liczbę większą od 0.";
                          }
                          return null;
                        case "string":
                          return "To pole musi zawierać liczbę większą od 0.";
                      }
                      return null;
                    }}
                    leftIcon="application"
                    placeholder="np. 10000"
                    intent={
                      errors.fieldSurfaceArea && touched.fieldSurfaceArea
                        ? "danger"
                        : "none"
                    }
                  />
                  <ErrorMessage name="fieldSurfaceArea">
                    {RenderErrorMessage}
                  </ErrorMessage>
                </RowFormGroup>
              </RowForm>
            ) : null}
            {[1, 3].includes(values.propertyType) ? (
              <FormGroup label="rodzaj budynku:">
                <Field
                  as={Select}
                  menuPortalTarget={document.body}
                  options={[1, 2, 3].map((type) => {
                    return {
                      value: type,
                      label: getBuildingType({ buildingType: type }),
                    };
                  })}
                  isSearchable={false}
                  onChange={({ value }) => {
                    setFieldValue("buildingType", value);
                  }}
                  value={
                    values.buildingType == null
                      ? null
                      : {
                          value: values.buildingType,
                          label: getBuildingType(values),
                        }
                  }
                  placeholder="wybierz..."
                  name="buildingType"
                  validate={(value) =>
                    value ? null : "To pole jest wymagane."
                  }
                  leftIcon="take-action"
                  intent={
                    errors.buildingType && touched.buildingType
                      ? "danger"
                      : "none"
                  }
                />
                <ErrorMessage name="buildingType">
                  {RenderErrorMessage}
                </ErrorMessage>
              </FormGroup>
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

const getPropertyType = ({ propertyType }) => {
  switch (propertyType) {
    case 1:
      return "gruntowa zabudowana";
    case 2:
      return "gruntowa niezabudowana";
    case 3:
      return "budynkowa";
    case 4:
      return "lokalowa (lokal mieszkalny)";
    case 5:
      return "rolna";
  }
};

const getBuildingType = ({ buildingType }) => {
  switch (buildingType) {
    case 1:
      return "dom jednorodzinny";
    case 2:
      return "dom zabliźniaczony";
    case 3:
      return "dom letniskowy";
  }
};
