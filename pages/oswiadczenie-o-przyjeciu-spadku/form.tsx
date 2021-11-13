import {
  Button,
  Callout,
  Divider,
  FormGroup,
  Icon,
  InputGroup,
} from "@blueprintjs/core";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { CardForm } from "../kalkulator";
import * as yup from "yup";
import {
  Body,
  RenderErrorMessage,
  RowForm,
  RowFormGroup,
} from "../testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku/form";
import Select from "react-select";
import ColorfulIcon from "../../components/layout/ColorfulIcon";
import { FamilyImage } from "../../components/calculator/Relation";
import {
  getRelation,
  OtherHereditariesRenderer,
} from "../../components/oswiadczenie/OtherHereditariesRenderer";
import { useRouter } from "next/dist/client/router";
import { Stepper } from "../testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku";

export default function OswiadczeniePrzyjmij() {
  const [loaded, setLoaded] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <Stepper nOfSteps={3} currentStep={2} message={"wypełnij formularz"} />
      <div className="text-4xl mb-0 mt-0 w-auto text-right flex justify-start text-gray-700 items-center">
        <div
          className="rounded flex items-center p-3 w-full"
          style={{
            alignSelf: "flex-end",
            background: "rgba(75, 181, 67, 0.2)",
          }}
        >
          <Icon icon="tick" size={30} className="mr-2" />
          <h1 className="text-4xl">PRZYJMIJ SPADEK</h1>
        </div>
      </div>

      <p className="mt-2">
        Podaj nam swoje dane, a my wykonamy za Ciebie oświadczenie o przyjęciu
        spadku.
      </p>
      {loaded ? (
        <Formik
          onSubmit={(values) => {
            const newValues = { ...values };
            newValues.otherHereditaries = JSON.stringify(
              values.otherHereditaries
            );
            router.push(
              "/oswiadczenie-o-przyjeciu-spadku/finalizacja?" +
                new URLSearchParams(newValues).toString()
            );
          }}
          initialValues={
            JSON.parse(localStorage.getItem("oswiadczeniePrzyjmijValues")) || {
              email: "",
              name: "",
              testament: null,
              testamentDate: null,
              street: "",
              postal: "",
              city: "",
              forma: null,
              deadName: "",
              deadAddress: "",
              deadCity: "",
              deadDate: null,
              deadGender: null,
              deadActUscName: "",
              deadActNumber: "",
              courtName: "",
              courtAddress: "",
              courtNumber: null,
              otherHereditaries: [],
            }
          }
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Wprowadź poprawny adres e-mail.")
              .required("To pole jest wymagane."),
            name: yup.string().required("To pole jest wymagane."),
            street: yup.string().required("To pole jest wymagane."),
            city: yup.string().required("To pole jest wymagane."),
            forma: yup.number().required("To pole jest wymagane."),
            postal: yup
              .string()
              .required("To pole jest wymagane.")
              .matches(
                /^[0-9]{2}\-[0-9]{3}$/,
                "To pole musi zawierać poprawny kod pocztowy."
              ),

            testament: yup
              .number()
              .required("To pole jest wymagane.")
              .nullable(),
            //dead
            deadAddress: yup.string().required("To pole jest wymagane."),
            deadName: yup.string().required("To pole jest wymagane."),
            deadCity: yup.string().required("To pole jest wymagane."),
            deadDate: yup.date().required("To pole jest wymagane.").nullable(),
            deadGender: yup
              .number()
              .required("To pole jest wymagane.")
              .nullable(),
            deadActUscName: yup.string().required("To pole jest wymagane."),
            deadActNumber: yup.string().required("To pole jest wymagane."),

            //court
            courtName: yup.string().required("To pole jest wymagane."),
            courtAddress: yup.string().required("To pole jest wymagane."),
            courtNumber: yup
              .string()
              .required("To pole jest wymagane.")
              .nullable(),
          })}
          validateOnChange
        >
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            React.useEffect(() => {
              localStorage.setItem(
                "oswiadczeniePrzyjmijValues",
                JSON.stringify(values)
              );
            }, [values]);

            return (
              <>
                <CardForm>
                  <div className="flex flex-wrap w-full">
                    <Body
                      className="flex flex-col flex-1"
                      style={{ minWidth: 220 }}
                    >
                      <h3 className="flex items-center text-2xl ">
                        <ColorfulIcon
                          size={18}
                          style={{ marginRight: 7 }}
                          color="255,127,80"
                          icon="person"
                        />
                        Twoje dane
                      </h3>
                      <p className="mt-2 text-xs">
                        Potrzebujemy Twoich danych osobowych, aby wykonać
                        oświadczenie w Twoim imieniu.
                      </p>
                      <Divider className="mt-4 mb-4" />

                      <FormGroup label="adres email:">
                        <Field
                          as={InputGroup}
                          leftIcon="envelope"
                          name="email"
                          placeholder="np. jkowalski@mail.pl"
                          intent={
                            errors.email && touched.email ? "danger" : "none"
                          }
                        />
                        <ErrorMessage name="email">
                          {RenderErrorMessage}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup label="imię i nazwisko:">
                        <Field
                          as={InputGroup}
                          leftIcon="person"
                          name="name"
                          placeholder="np. Jan Kowalski"
                          intent={
                            errors.name && touched.name ? "danger" : "none"
                          }
                        />
                        <ErrorMessage name="name">
                          {RenderErrorMessage}
                        </ErrorMessage>
                      </FormGroup>
                    </Body>
                    <FamilyImage className="p-3 rounded-b bg-transparent">
                      <div
                        className="rounded p-3"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          backgroundImage: "url(/people2.svg)",
                          height: "100%",
                          backgroundSize: "cover",
                          backgroundPosition: "50% 40%",
                        }}
                      >
                        <a
                          className="text-xs text-white"
                          style={{ fontSize: 8 }}
                          href="https://www.vecteezy.com/free-vector/people"
                        >
                          People Vectors by Vecteezy
                        </a>
                      </div>
                    </FamilyImage>
                  </div>
                  <Divider className="w-full mt-10 mb-6" />

                  <RowForm>
                    <RowFormGroup label="ulica i numer domu:">
                      <Field
                        as={InputGroup}
                        leftIcon="office"
                        name="street"
                        placeholder="np. ul. Miejska 37"
                        intent={
                          errors.street && touched.street ? "danger" : "none"
                        }
                      />
                      <ErrorMessage name="street">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                    <RowFormGroup label="kod pocztowy:">
                      <Field
                        as={InputGroup}
                        leftIcon="envelope"
                        name="postal"
                        placeholder="np. 21-232"
                        intent={
                          errors.postal && touched.postal ? "danger" : "none"
                        }
                      />
                      <ErrorMessage name="postal">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                  </RowForm>
                  <RowForm>
                    <RowFormGroup label="miasto adresu:">
                      <Field
                        as={InputGroup}
                        leftIcon="home"
                        name="city"
                        placeholder="np. Gdynia"
                        intent={errors.city && touched.city ? "danger" : "none"}
                      />
                      <ErrorMessage name="city">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>

                    <RowFormGroup label="forma przyjęcia spadku:">
                      <Field
                        className="w-full"
                        as={Select}
                        menuPortalTarget={document.body}
                        isSearchable={false}
                        name="forma"
                        intent={
                          errors.forma && touched.forma ? "danger" : "none"
                        }
                        onChange={({ value }) => setFieldValue("forma", value)}
                        placeholder="wybierz..."
                        value={
                          values.forma == null
                            ? null
                            : {
                                value: values.forma,
                                label: values.forma
                                  ? "przyjęcie z dobrodziejstwem inwentarza"
                                  : "przyjęcie proste",
                              }
                        }
                        options={[
                          {
                            value: 0,
                            label: "przyjęcie proste",
                          },
                          {
                            value: 1,
                            label: "przyjęcie z dobrodziejstwem inwentarza",
                          },
                        ]}
                      />
                      <ErrorMessage name="forma">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                  </RowForm>
                </CardForm>
                <CardForm className="items-start">
                  <div className="w-full flex flex-col">
                    <h3 className="flex items-center text-2xl  w-full mb-0">
                      <ColorfulIcon
                        size={18}
                        style={{ marginRight: 7 }}
                        color="189, 183, 107"
                        icon="alignment-bottom"
                      />
                      Dane spadkodawcy
                      <h3
                        className="text-xs mb-1"
                        style={{ alignSelf: "flex-end" }}
                      ></h3>
                    </h3>
                    <p className="text-xs">
                      Aby wykonać wniosek potrzebujemy również danych o zmarłym,
                      po którym jest spadek.
                    </p>
                    <Divider className="mt-4 mb-4 w-full" />
                    <FormGroup label="imię i nazwisko:">
                      <Field
                        as={InputGroup}
                        name="deadName"
                        leftIcon="person"
                        placeholder="np. Andrzej Kowalski"
                        intent={
                          errors.deadName && touched.deadName
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="deadName">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="ostatni adres zamieszkania:">
                      <Field
                        as={InputGroup}
                        name="deadAddress"
                        leftIcon="home"
                        placeholder="np. ul. Miejska 37, 21-112 Warszawa"
                        intent={
                          errors.deadAddress && touched.deadAddress
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="deadAddress">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="miejscowość śmierci:">
                      <Field
                        as={InputGroup}
                        name="deadCity"
                        leftIcon="office"
                        placeholder="np. Gdynia"
                        intent={
                          errors.deadCity && touched.deadCity
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="deadCity">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="data śmierci:">
                      <Field
                        as={InputGroup}
                        name="deadDate"
                        type="date"
                        leftIcon="calendar"
                        intent={
                          errors.deadDate && touched.deadDate
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="deadDate">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="płeć:">
                      <Field
                        className="w-full"
                        as={Select}
                        menuPortalTarget={document.body}
                        isSearchable={false}
                        name="deadGender"
                        intent={
                          errors.deadGender && touched.deadGender
                            ? "danger"
                            : "none"
                        }
                        placeholder="wybierz..."
                        onChange={({ value }) => {
                          setFieldValue("deadGender", value);
                        }}
                        value={
                          values.deadGender == null
                            ? null
                            : {
                                value: values.deadGender,
                                label: !values.deadGender
                                  ? "mężczyzna"
                                  : "kobieta",
                              }
                        }
                        options={[
                          {
                            value: 0,
                            label: "mężczyzna",
                          },
                          { value: 1, label: "kobieta" },
                        ]}
                      />
                      <ErrorMessage name="deadGender">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="czy spadkodawca zostawił testament?">
                      <Field
                        menuPortalTarget={document.body}
                        as={Select}
                        leftIcon="person"
                        name="testament"
                        placeholder="wybierz..."
                        options={[
                          { value: 0, label: "nie" },
                          { value: 1, label: "tak" },
                        ]}
                        onChange={({ value }) =>
                          setFieldValue("testament", value)
                        }
                        value={
                          values.testament == null
                            ? null
                            : {
                                value: values.testament,
                                label: values.testament ? "tak" : "nie",
                              }
                        }
                        intent={errors.name && touched.name ? "danger" : "none"}
                      />
                      <ErrorMessage name="testament">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    {values.testament == 1 ? (
                      <FormGroup label="data spisania testamentu">
                        <Field
                          as={InputGroup}
                          leftIcon="calendar"
                          name="testamentDate"
                          type="date"
                          intent={
                            errors.name && touched.name ? "danger" : "none"
                          }
                          validate={(value) => {
                            if (value == null) return "To pole jest wymagane.";
                            else return null;
                          }}
                        />
                        <ErrorMessage name="testamentDate">
                          {RenderErrorMessage}
                        </ErrorMessage>
                      </FormGroup>
                    ) : null}
                    <Divider className="mt-4 mb-4 w-full" />
                    <h4 className="flex items-center text-xl ">
                      <ColorfulIcon
                        size={14}
                        style={{ marginRight: 7 }}
                        color="64, 224, 208"
                        icon="document-open"
                      />
                      Odpis skrócony aktu zgonu zmarłego
                    </h4>
                    <FormGroup label="nazwa urzędu stanu cywilnego wydającego dokument:">
                      <Field
                        as={InputGroup}
                        name="deadActUscName"
                        leftIcon="office"
                        placeholder="np. USC w Warszawie"
                        intent={
                          errors.deadActUscName && touched.deadActUscName
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="actUscName">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>

                    <FormGroup label="numer odpisu skróconego aktu:">
                      <Field
                        as={InputGroup}
                        name="deadActNumber"
                        leftIcon="numerical"
                        placeholder="np. 3321/2007"
                        intent={
                          errors.deadActNumber && touched.deadActNumber
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="deadActNumber">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                  </div>
                </CardForm>
                <CardForm>
                  <Formik
                    onSubmit={(newValues, { resetForm }) => {
                      const newHerediaries = [...values.otherHereditaries];
                      newHerediaries.push(newValues);

                      setFieldValue("otherHereditaries", newHerediaries);
                      resetForm();
                    }}
                    validationSchema={yup.object().shape({
                      name: yup.string().required("To pole jest wymagane."),
                      address: yup.string().required("To pole jest wymagane."),

                      gender: yup
                        .number()
                        .required("To pole jest wymagane.")
                        .nullable(),
                      relation: yup
                        .number()
                        .required("To pole jest wymagane.")
                        .nullable(),
                      //testament
                    })}
                    initialValues={{
                      name: "",
                      address: "",
                      gender: null,
                      relation: null,
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      setFieldValue,
                    }) => {
                      return (
                        <div className="w-full flex flex-col">
                          <h3 className="flex items-center text-2xl  w-full">
                            <ColorfulIcon
                              size={18}
                              style={{ marginRight: 7 }}
                              color="100, 149, 237"
                              icon="people"
                            />
                            Inni spadkobiercy
                          </h3>
                          <p className="text-xs">
                            Dodaj kolejno innych spadkobierców dziedziczących po
                            zmarłym do listy.
                          </p>
                          <Divider className="mt-4 mb-4 w-full" />
                          <h3 className="text-sm mb-2  w-full">
                            DANE SPADKOBIERCY:
                          </h3>
                          <RowForm>
                            <RowFormGroup label="imię i nazwisko:">
                              <Field
                                as={InputGroup}
                                name="name"
                                leftIcon="person"
                                placeholder="np. Janusz Kowalski"
                                intent={
                                  errors.name && touched.name
                                    ? "danger"
                                    : "none"
                                }
                              />
                              <ErrorMessage name="name">
                                {RenderErrorMessage}
                              </ErrorMessage>
                            </RowFormGroup>
                            <RowFormGroup label="pełny adres zamieszkania:">
                              <Field
                                as={InputGroup}
                                name="address"
                                leftIcon="home"
                                placeholder="np. ul. Polska 12, 21-522 Gdańsk"
                                intent={
                                  errors.address && touched.address
                                    ? "danger"
                                    : "none"
                                }
                              />
                              <ErrorMessage name="address">
                                {RenderErrorMessage}
                              </ErrorMessage>
                            </RowFormGroup>
                          </RowForm>

                          <RowForm>
                            <RowFormGroup label="płeć:">
                              <Field
                                className="w-full"
                                as={Select}
                                menuPortalTarget={document.body}
                                isSearchable={false}
                                name="gender"
                                intent={
                                  errors.gender && touched.gender
                                    ? "danger"
                                    : "none"
                                }
                                placeholder="wybierz..."
                                onChange={({ value }) => {
                                  setFieldValue("gender", value);
                                }}
                                value={
                                  values.gender == null
                                    ? null
                                    : {
                                        value: values.gender,
                                        label: !values.gender
                                          ? "mężczyzna"
                                          : "kobieta",
                                      }
                                }
                                options={[
                                  {
                                    value: 0,
                                    label: "mężczyzna",
                                  },
                                  { value: 1, label: "kobieta" },
                                ]}
                              />

                              <ErrorMessage name="gender">
                                {RenderErrorMessage}
                              </ErrorMessage>
                            </RowFormGroup>
                            <RowFormGroup label="kim był zmarły dla tego spadkobiercy?">
                              <Field
                                className="w-full"
                                as={Select}
                                menuPortalTarget={document.body}
                                isSearchable={false}
                                name="relation"
                                intent={
                                  errors.relation && touched.relation
                                    ? "danger"
                                    : "none"
                                }
                                placeholder="wybierz..."
                                onChange={({ value }) => {
                                  setFieldValue("relation", value);
                                }}
                                value={
                                  values.relation == null
                                    ? null
                                    : {
                                        value: values.relation,
                                        label: getRelation(values.relation),
                                      }
                                }
                                options={[
                                  {
                                    value: 1,
                                    label: "małżonkiem",
                                  },
                                  {
                                    value: 2,
                                    label: "rodzeństwem",
                                  },
                                  {
                                    value: 3,
                                    label: "dzieckiem",
                                  },
                                  {
                                    value: 4,
                                    label: "rodzicem",
                                  },
                                  {
                                    value: 5,
                                    label: "dziadkiem/babcią",
                                  },
                                  {
                                    value: 6,
                                    label: "wujkiem/ciotką",
                                  },
                                ]}
                              />

                              <ErrorMessage name="relation">
                                {RenderErrorMessage}
                              </ErrorMessage>
                            </RowFormGroup>
                          </RowForm>

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
                  <OtherHereditariesRenderer
                    otherHereditaries={values.otherHereditaries}
                    setValue={(value) => {
                      setFieldValue("otherHereditaries", value);
                    }}
                  />
                </CardForm>
                <CardForm className="items-start">
                  <div className="w-full flex flex-col">
                    <h4 className="flex items-center text-2xl  w-full">
                      <ColorfulIcon
                        size={18}
                        style={{ marginRight: 7 }}
                        color="199, 21, 133"
                        icon="take-action"
                      />
                      Dane sądu, do którego chcesz złożyć wniosek
                    </h4>
                    <Divider className="mt-4 mb-4 w-full" />
                    <FormGroup label="nazwa sądu:">
                      <Field
                        as={InputGroup}
                        name="courtName"
                        leftIcon="take-action"
                        placeholder="np. Sąd Okręgowy w Elblągu"
                        intent={
                          errors.courtName && touched.courtName
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="courtName">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="adres sądu:">
                      <Field
                        as={InputGroup}
                        name="courtAddress"
                        leftIcon="office"
                        placeholder="np. ul. Sądowa 21, 43-212 Elbląg"
                        intent={
                          errors.courtAddress && touched.courtAddress
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="courtAddress">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="numer wydziału cywilnego sądu:">
                      <Field
                        as={Select}
                        menuPortalTarget={document.body}
                        name="courtNumber"
                        placeholder="wybierz..."
                        className="w-full"
                        intent={
                          errors.courtNumber && touched.courtNumber
                            ? "danger"
                            : "none"
                        }
                        isSearchable={false}
                        onChange={({ value }) =>
                          setFieldValue("courtNumber", value)
                        }
                        value={
                          values.courtNumber == null
                            ? null
                            : {
                                value: values.courtNumber,
                                label: values.courtNumber,
                              }
                        }
                        options={[
                          {
                            value: "I",
                            label: "I",
                          },
                          {
                            value: "II",
                            label: "II",
                          },
                          {
                            value: "III",
                            label: "III",
                          },
                          {
                            value: "IV",
                            label: "IV",
                          },
                          {
                            value: "V",
                            label: "V",
                          },
                          {
                            value: "VI",
                            label: "VI",
                          },
                          {
                            value: "VII",
                            label: "VII",
                          },
                          {
                            value: "VIII",
                            label: "VIII",
                          },
                          {
                            value: "IX",
                            label: "IX",
                          },
                          {
                            value: "X",
                            label: "X",
                          },
                        ]}
                      />
                      <ErrorMessage name="courtNumber">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                  </div>
                </CardForm>
                <p className="w-full text-center mt-4 mb-4">
                  PRZEJDŹ DO SPRAWDZENIA WPROWADZONYCH DANYCH
                </p>
                <Button
                  intent="primary"
                  fill
                  onClick={() => {
                    handleSubmit();
                  }}
                  rightIcon="caret-right"
                >
                  DALEJ
                </Button>
              </>
            );
          }}
        </Formik>
      ) : null}
    </>
  );
}
