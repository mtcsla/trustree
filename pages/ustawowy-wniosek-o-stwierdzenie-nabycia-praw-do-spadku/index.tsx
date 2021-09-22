import { CardForm } from "../kalkulator";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { DateInput } from "@blueprintjs/datetime";
import { FamilyImage } from "../../components/calculator/Relation";
import styled from "@emotion/styled";
import {
  FormGroup,
  InputGroup,
  Divider,
  HTMLSelect,
  Button,
} from "@blueprintjs/core";
import * as yup from "yup";
import Link from "next/link";

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wprowadź poprawny adres e-mail.")
    .required("To pole jest wymagane."),
  name: yup.string().required("To pole jest wymagane."),
  pesel: yup
    .string()
    .required("To pole jest wymagane.")
    .matches(/^[0-9]{11}$/, "To pole musi zawierać poprawny numer PESEL."),
  street: yup.string().required("To pole jest wymagane."),
  city: yup.string().required("To pole jest wymagane."),
  postal: yup
    .string()
    .required("To pole jest wymagane.")
    .matches(
      /^[0-9]{2}\-[0-9]{3}$/,
      "To pole musi zawierać poprawny kod pocztowy."
    ),
  share: yup
    .string()
    .required("To pole jest wymagane.")
    .matches(
      /^[0-9]*\/[0-9]*$/,
      "To pole musi zawierać właściwy ułamek zwykły."
    ),
  forma: yup.number().required("To pole jest wymagane.").nullable(),
  gender: yup.number().required("To pole jest wymagane.").nullable(),
  relation: yup.number().required("To pole jest wymagane.").nullable(),

  //dead
  deadAddress: yup.string().required("To pole jest wymagane."),
  deadName: yup.string().required("To pole jest wymagane."),
  deadCity: yup.string().required("To pole jest wymagane."),
  deadDate: yup.date().required("To pole jest wymagane.").nullable(),
  deadGender: yup.number().required("To pole jest wymagane.").nullable(),
  deadActUscName: yup.string().required("To pole jest wymagane."),
  deadActNumber: yup.string().required("To pole jest wymagane."),

  //court
  courtName: yup.string().required("To pole jest wymagane."),
  courtAddress: yup.string().required("To pole jest wymagane."),
  courtNumber: yup.string().required("To pole jest wymagane."),

  //otherHereditaries
  otherHereditaries: yup.array(),
});

export default function WniosekTestament() {
  return (
    <>
      <h1 className="text-4xl font-bold">
        Wygeneruj wniosek o stwierdzenie nabycia praw do spadku
        <br />
        <p className="text-sm mb-5">wg. dziedziczenia ustawowego</p>
      </h1>
      <p>Podaj nam swoje dane, a my utworzymy za Ciebie wniosek.</p>
      <Formik
        onSubmit={null}
        validateOnChange
        validationSchema={yupSchema}
        initialValues={{
          email: "",
          name: "",
          pesel: "",
          street: "",
          postal: "",
          city: "",
          share: "",
          forma: null,
          gender: null,
          relation: null,
          actType: null,
          actUscName: "",
          actNumber: "",
          actDate: null,
          deadName: "",
          deadAddress: "",
          deadCity: "",
          deadDate: null,
          deadGender: null,
          deadActUscName: "",
          deadActNumber: "",
          courtName: "",
          courtAddress: "",
          courtNumber: "",
          otherHereditaries: [],
        }}
      >
        {({ errors, touched, values, setFieldValue }) => {
          React.useEffect(() => {
            document.cookie = `ustawaWniosekState=${JSON.stringify(values)};`;
          }, [values]);

          React.useEffect(() => {
            console.log(values.otherHereditaries);
          }, [values.otherHereditaries]);

          return (
            <>
              <CardForm>
                <div className="flex flex-wrap w-full">
                  <Body
                    className="flex flex-col flex-1"
                    style={{ minWidth: 220 }}
                  >
                    <span className="text-2xl font-bold">Twoje dane:</span>
                    <p className="mt-2 text-xs">
                      Potrzebujemy Twoich danych osobowych, aby wykonać wniosek
                      w Twoim imieniu.
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
                        intent={errors.name && touched.name ? "danger" : "none"}
                      />
                      <ErrorMessage name="name">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>

                    <FormGroup label="numer pesel:">
                      <Field
                        as={InputGroup}
                        leftIcon="numerical"
                        name="pesel"
                        placeholder="np 22732152944"
                        intent={
                          errors.pesel && touched.pesel ? "danger" : "none"
                        }
                      />
                      <ErrorMessage name="pesel">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                  </Body>
                  <FamilyImage className="p-3 rounded-b">
                    <div
                      className="rounded p-3"
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "end",
                        backgroundImage: "url(/people.jpg)",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 40%",
                      }}
                    >
                      <a
                        className="text-xs text-white"
                        style={{ fontSize: 8 }}
                        href="https://www.vecteezy.com/free-vector/human"
                      >
                        Human Vectors by Vecteezy
                      </a>
                    </div>
                  </FamilyImage>
                </div>
                <Divider className="w-full mt-10 mb-6" />

                <RowForm className="truncate">
                  <RowFormGroup label="ulica adresu:">
                    <Field
                      as={InputGroup}
                      leftIcon="office"
                      name="street"
                      placeholder="np. Miejska 37"
                      intent={
                        errors.street && touched.street ? "danger" : "none"
                      }
                    />
                    <ErrorMessage name="street">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>
                  <RowFormGroup label="kod pocztowy adresu:">
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
                <RowForm className="truncate">
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

                  <RowFormGroup
                    label="ustawowy udział w spadku:"
                    labelInfo="(w ułamku zwykłym)"
                  >
                    <Field
                      as={InputGroup}
                      leftIcon="pie-chart"
                      name="share"
                      placeholder="np. 1/3"
                      intent={errors.share && touched.share ? "danger" : "none"}
                    />
                    <ErrorMessage name="share">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>
                </RowForm>
                <RowForm className="truncate">
                  <RowFormGroup label="forma przyjęcia spadku:">
                    <Field
                      className="w-full"
                      as={HTMLSelect}
                      name="forma"
                      intent={errors.forma && touched.forma ? "danger" : "none"}
                    >
                      <option selected disabled>
                        wybierz...
                      </option>
                      <option value={0}>przyjęcie proste</option>
                      <option value={1}>
                        przyjęcie z dobrodziejstwem inwentarza
                      </option>
                    </Field>
                    <ErrorMessage name="forma">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>
                  <RowFormGroup label="płeć:">
                    <Field
                      className="w-full"
                      as={HTMLSelect}
                      name="gender"
                      intent={
                        errors.gender && touched.gender ? "danger" : "none"
                      }
                    >
                      <option selected disabled>
                        wybierz...
                      </option>
                      <option value={0}>mężczyzna</option>
                      <option value={1}>kobieta</option>
                    </Field>
                    <ErrorMessage name="gender">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </RowFormGroup>
                </RowForm>
              </CardForm>

              <>
                <div className="flex flex-col w-auto">
                  <h2 className="mt-10 text-xl">
                    Kim był dla ciebie spadkodawca (zmarły)?
                  </h2>
                  <p className="text-xs">
                    Wybierz pokrewieństwo zmarłego wobec Ciebie.
                  </p>
                  <Field as={HTMLSelect} className="mt-3" name="relation">
                    <option selected disabled>
                      wybierz...
                    </option>
                    <option value={1}>małżonkiem</option>
                    <option value={2}>rodzeństwem</option>
                    <option value={3}>dzieckiem</option>
                    <option value={4}>rodzicem</option>
                    <option value={5}>dziadkiem/babcią</option>
                    <option value={6}>wujkiem/ciotką</option>
                  </Field>
                  <ErrorMessage name="relation">
                    {RenderErrorMessage}
                  </ErrorMessage>
                </div>

                {values.relation && values.relation != 1 ? (
                  <div className="flex mt-6 flex-col w-auto">
                    <h2 className="text-xl">
                      Którym dokumentem chcesz udowodnić swoje powiązanie ze
                      zmarłym?
                    </h2>
                    <p className="text-xs">
                      Wybierz dokument, którym chcesz dowieść swojego
                      pokrewieństwa, oba z nich są poprawne w każdym przypadku.
                    </p>
                    <Field
                      as={HTMLSelect}
                      className="mt-3 mb-6"
                      name="actType"
                      validate={(value) => {
                        if (!value) return "To pole jest wymagane.";
                      }}
                    >
                      <option selected disabled>
                        wybierz...
                      </option>
                      <option value={0}>
                        odpis skrócony aktu małżeństwa
                        {values.relation == 3 ? " zmarłego" : ""}
                      </option>
                      <option value={1}>
                        odpis skrócony aktu urodzenia
                        {values.relation == 3 ? " zmarłego" : ""}
                      </option>
                    </Field>
                    <ErrorMessage name="actType">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </div>
                ) : null}
                {values.actType != null || values.relation == 1 ? (
                  <CardForm className="min-h-0">
                    <div className="flex flex-col w-full">
                      <span className="text-2xl font-bold w-full">
                        {values.relation != 3 ? "Twój o" : "O"}dpis skrócony{" "}
                        {values.relation == 1 || values.actType == 0
                          ? "aktu małżeństwa"
                          : "aktu urodzenia"}
                        {values.relation == 3 ? " zmarłego" : ""}
                      </span>
                      <p className="text-xs">
                        Podaj nam dane dotyczące tego dokumentu.
                      </p>
                      <Divider className="mt-4 mb-4 w-full" />
                      <FormGroup label="nazwa urzędu stanu cywilnego wydającego dokument:">
                        <Field
                          validate={(value) => {
                            if (!value) return "To pole jest wymagane.";
                          }}
                          as={InputGroup}
                          name="actUscName"
                          leftIcon="office"
                          placeholder="np. USC w Warszawie"
                          intent={
                            errors.actUscName && touched.actUscName
                              ? "danger"
                              : "none"
                          }
                        />
                        <ErrorMessage name="actUscName">
                          {RenderErrorMessage}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup
                        label={
                          "data " +
                          (values.relation == 1 || values.actType == 0
                            ? "zawarcia małżeństwa"
                            : "urodzenia") +
                          (values.relation == 3 ? " zmarłego" : "") +
                          ":"
                        }
                      >
                        <Field
                          validate={(value) => {
                            if (!value) return "To pole jest wymagane.";
                          }}
                          as={InputGroup}
                          type="date"
                          name="actDate"
                          leftIcon="calendar"
                          intent={
                            errors.actDate && touched.actDate
                              ? "danger"
                              : "none"
                          }
                        />
                        <ErrorMessage name="actDate">
                          {RenderErrorMessage}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup label="numer odpisu skróconego aktu:">
                        <Field
                          as={InputGroup}
                          name="actNumber"
                          validate={(value) => {
                            if (!value) return "To pole jest wymagane.";
                          }}
                          leftIcon="numerical"
                          placeholder="np. 3321/2007"
                          intent={
                            errors.actNumber && touched.actNumber
                              ? "danger"
                              : "none"
                          }
                        />
                        <ErrorMessage name="actNumber">
                          {RenderErrorMessage}
                        </ErrorMessage>
                      </FormGroup>
                    </div>
                  </CardForm>
                ) : null}
              </>

              <CardForm className="items-start">
                <div className="w-full flex flex-col">
                  <span className="text-2xl font-bold w-full">
                    Dane spadkodawcy (zmarłego):
                  </span>
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
                        errors.deadName && touched.deadName ? "danger" : "none"
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
                        errors.deadCity && touched.deadCity ? "danger" : "none"
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
                        errors.deadDate && touched.deadDate ? "danger" : "none"
                      }
                    />
                    <ErrorMessage name="deadDate">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </FormGroup>
                  <FormGroup label="płeć:">
                    <Field
                      className="w-full"
                      as={HTMLSelect}
                      name="deadGender"
                      intent={
                        errors.deadGender && touched.deadGender
                          ? "danger"
                          : "none"
                      }
                    >
                      <option selected disabled>
                        wybierz
                      </option>
                      <option value={0}>mężczyzna</option>
                      <option value={1}>kobieta</option>
                    </Field>
                    <ErrorMessage name="deadGender">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </FormGroup>
                  <Divider className="mt-4 mb-4 w-full" />
                  <p className="text-xl font-bold">
                    Odpis skrócony aktu zgonu zmarłego
                  </p>
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
                    console.log({
                      otherHereditaries: values.otherHereditaries,
                      errors,
                      newValues,
                    });
                    const newHerediaries = [...values.otherHereditaries];
                    newHerediaries.push(newValues);

                    setFieldValue("otherHereditaries", newHerediaries);

                    resetForm();
                  }}
                  validationSchema={yup.object().shape({
                    name: yup.string().required("To pole jest wymagane."),
                    address: yup.string().required("To pole jest wymagane."),
                    share: yup
                      .string()
                      .required("To pole jest wymagane.")
                      .matches(
                        /^[0-9]*\/[0-9]*$/,
                        "To pole musi zawierać właściwy ułamek zwykły."
                      ),
                    forma: yup
                      .number()
                      .required("To pole jest wymagane.")
                      .nullable(),
                    gender: yup
                      .number()
                      .required("To pole jest wymagane.")
                      .nullable(),
                    relation: yup
                      .number()
                      .required("To pole jest wymagane.")
                      .nullable(),
                    actType: yup.number().nullable(),
                    actDate: yup.date().nullable(),
                    actuscName: yup.string(),
                    actNumber: yup.string(),
                  })}
                  initialValues={{
                    name: "",
                    address: "",
                    share: "",
                    forma: null,
                    gender: null,
                    relation: null,
                    actType: null,
                    actUscName: "",
                    actNumber: "",
                    actDate: null,
                  }}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ values, errors, touched, handleSubmit }) => {
                    return (
                      <div className="w-full flex flex-col">
                        <span className="text-2xl font-bold w-full">
                          Inni spadkobiercy
                        </span>
                        <p className="text-xs">
                          Dodaj kolejno innych spadkobierców dziedziczących po
                          zmarłym do listy.
                        </p>
                        <Divider className="mt-4 mb-4 w-full" />
                        <span className="text-sm mb-2 ml-1 font-bold w-full">
                          DANE SPADKOBIERCY:
                        </span>
                        <RowForm className="mb-5">
                          <RowFormGroup label="imię i nazwisko:">
                            <Field
                              as={InputGroup}
                              name="name"
                              leftIcon="person"
                              placeholder="np. Janusz Kowalski"
                              intent={
                                errors.name && touched.name ? "danger" : "none"
                              }
                            />
                            <ErrorMessage name="name">
                              {RenderErrorMessage}
                            </ErrorMessage>
                          </RowFormGroup>
                          <RowFormGroup label="adres zamieszkania:">
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
                          <RowFormGroup
                            label="udział spadkobiercy w spadku:"
                            helperText={
                              <Link passHref href="/kalkulator">
                                <a className="text-gray-400">
                                  oblicz w naszym kalkulatorze
                                </a>
                              </Link>
                            }
                          >
                            <Field
                              as={InputGroup}
                              name="share"
                              leftIcon="pie-chart"
                              placeholder="np. 2/3"
                              intent={
                                errors.share && touched.share
                                  ? "danger"
                                  : "none"
                              }
                            />
                            <ErrorMessage name="share">
                              {RenderErrorMessage}
                            </ErrorMessage>
                          </RowFormGroup>
                          <RowFormGroup label="forma przyjęcia spadku:">
                            <Field
                              className="w-full"
                              as={HTMLSelect}
                              name="forma"
                              intent={
                                errors.address && touched.address
                                  ? "danger"
                                  : "none"
                              }
                            >
                              <option selected disabled>
                                wybierz...
                              </option>
                              <option value={0}>przyjęcie proste</option>
                              <option value={1}>
                                przyjęcie z dobrodziejstwem inwentarza
                              </option>
                            </Field>
                            <ErrorMessage name="address">
                              {RenderErrorMessage}
                            </ErrorMessage>
                          </RowFormGroup>
                        </RowForm>
                        <RowForm>
                          <RowFormGroup label="płeć:">
                            <Field
                              className="w-full"
                              as={HTMLSelect}
                              name="gender"
                              intent={
                                errors.gender && touched.gender
                                  ? "danger"
                                  : "none"
                              }
                            >
                              <option selected disabled>
                                wybierz...
                              </option>
                              <option value={0}>mężczyzna</option>
                              <option value={1}>kobieta</option>
                            </Field>
                            <ErrorMessage name="gender">
                              {RenderErrorMessage}
                            </ErrorMessage>
                          </RowFormGroup>
                          <RowFormGroup label="kim był zmarły dla tego spadkobiercy?">
                            <Field
                              className="w-full"
                              as={HTMLSelect}
                              name="relation"
                              intent={
                                errors.relation && touched.relation
                                  ? "danger"
                                  : "none"
                              }
                            >
                              <option selected disabled>
                                wybierz...
                              </option>
                              <option value={1}>małżonkiem</option>
                              <option value={2}>rodzeństwem</option>
                              <option value={3}>dzieckiem</option>
                              <option value={4}>rodzicem</option>
                              <option value={5}>dziadkiem/babcią</option>
                              <option value={6}>wujkiem/ciotką</option>
                            </Field>
                            <ErrorMessage name="relation">
                              {RenderErrorMessage}
                            </ErrorMessage>
                          </RowFormGroup>
                        </RowForm>

                        {values.relation && values.relation != 1 ? (
                          <>
                            <Divider className="mt-6 mb-6 w-full"></Divider>
                            <h2 className="text-xl">
                              Którym dokumentem chcesz udowodnić powiązanie tego
                              spadkobiercy ze zmarłym?
                            </h2>
                            <p className="text-xs">
                              Wybierz dokument, którym chcesz dowieść
                              pokrewieństwa tego spadkobiercy, oba z nich są
                              poprawne w każdym przypadku.
                            </p>
                            <Field
                              as={HTMLSelect}
                              name="actType"
                              className="mb-0 mt-4"
                              validate={(value) => {
                                if (!value) return "To pole jest wymagane.";
                                else return null;
                              }}
                            >
                              <option selected disabled>
                                wybierz...
                              </option>
                              <option value={0}>
                                odpis skrócony aktu małżeństwa
                                {values.relation == 3 ? " zmarłego" : ""}
                              </option>
                              <option value={1}>
                                odpis skrócony aktu urodzenia
                                {values.relation == 3 ? " zmarłego" : ""}
                              </option>
                            </Field>
                            <ErrorMessage name="actType">
                              {RenderErrorMessage}
                            </ErrorMessage>
                          </>
                        ) : null}

                        {values.relation == 1 || values.actType != null ? (
                          <>
                            <Divider className="mt-6 mb-6 w-full" />

                            <div className="flex flex-col w-full">
                              <span className="text-2xl font-bold w-full">
                                Odpis skrócony{" "}
                                {values.relation == 1 || values.actType == 0
                                  ? "aktu małżeństwa"
                                  : "aktu urodzenia"}
                                {values.relation == 3
                                  ? " zmarłego"
                                  : " tego spadkobiercy"}
                              </span>
                              <p className="text-xs">
                                Podaj nam dane dotyczące tego dokumentu.
                              </p>
                              <Divider className="mt-4 mb-4 w-full" />
                              <FormGroup label="nazwa urzędu stanu cywilnego wydającego dokument:">
                                <Field
                                  validate={(value) => {
                                    if (!value) return "To pole jest wymagane.";
                                  }}
                                  as={InputGroup}
                                  name="actUscName"
                                  leftIcon="office"
                                  placeholder="np. USC w Warszawie"
                                  intent={
                                    errors.actUscName && touched.actUscName
                                      ? "danger"
                                      : "none"
                                  }
                                />
                                <ErrorMessage name="actUscName">
                                  {RenderErrorMessage}
                                </ErrorMessage>
                              </FormGroup>
                              <FormGroup
                                label={
                                  "data " +
                                  (values.relation == 1 || values.actType == 0
                                    ? "zawarcia małżeństwa"
                                    : "urodzenia") +
                                  (values.relation == 3 ? " zmarłego" : "") +
                                  ":"
                                }
                              >
                                <Field
                                  validate={(value) => {
                                    if (!value) return "To pole jest wymagane.";
                                  }}
                                  as={InputGroup}
                                  type="date"
                                  name="actDate"
                                  leftIcon="calendar"
                                  intent={
                                    errors.actDate && touched.actDate
                                      ? "danger"
                                      : "none"
                                  }
                                />
                                <ErrorMessage name="actDate">
                                  {RenderErrorMessage}
                                </ErrorMessage>
                              </FormGroup>
                              <FormGroup label="numer odpisu skróconego aktu:">
                                <Field
                                  as={InputGroup}
                                  name="actNumber"
                                  validate={(value) => {
                                    if (!value) return "To pole jest wymagane.";
                                  }}
                                  leftIcon="numerical"
                                  placeholder="np. 3321/2007"
                                  intent={
                                    errors.actNumber && touched.actNumber
                                      ? "danger"
                                      : "none"
                                  }
                                />
                                <ErrorMessage name="actNumber">
                                  {RenderErrorMessage}
                                </ErrorMessage>
                              </FormGroup>
                            </div>
                          </>
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
                <OtherHereditariesRenderer
                  otherHereditaries={values.otherHereditaries}
                />
              </CardForm>

              <CardForm className="items-start">
                <div className="w-full flex flex-col">
                  <span className="text-2xl font-bold w-full">
                    Dane sądu, do którego chcesz złożyć wniosek:
                  </span>
                  <Divider className="mt-4 mb-4 w-full" />
                  <FormGroup label="nazwa sądu:">
                    <Field
                      as={InputGroup}
                      name="courtName"
                      leftIcon="take-action"
                      placeholder="np. Sąd Rejonowy w Elblągu"
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
                      as={HTMLSelect}
                      name="courtNumber"
                      className="w-full"
                      intent={
                        errors.courtNumber && touched.courtNumber
                          ? "danger"
                          : "none"
                      }
                    >
                      <option selected disabled>
                        wybierz...
                      </option>
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="V">V</option>
                      <option value="VI">VI</option>
                      <option value="VII">VII</option>
                      <option value="VIII">VIII</option>
                      <option value="IX">IX</option>
                      <option value="X">X</option>
                    </Field>
                    <ErrorMessage name="courtNumber">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </FormGroup>
                </div>
              </CardForm>
              <Button
                rightIcon="caret-right"
                className="mt-10 w-full"
                intent="success"
              >
                DALEJ
              </Button>
            </>
          );
        }}
      </Formik>
    </>
  );
}

const OtherHereditariesRenderer = ({ otherHereditaries }) => {
  if (!otherHereditaries.length) {
    return null;
  } else
    return (
      <>
        <span className="text-xl font-bold mt-4 w-full mb-4">
          Dodani spadkobiercy:
        </span>

        <div className="w-full flex flex-col text-sm">
          {otherHereditaries.map((hereditary) => (
            <div
              className="border p-3 rounded-xl mb-6"
              style={{ background: "var(--input-color)" }}
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">imię i nazwisko:</p>
                  <p>{hereditary.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">udział w spadku:</p>
                  <p className="text-right">{hereditary.share}</p>
                </div>
              </div>
              <Divider />
              <p className="text-xs">adres:</p>
              <p>{hereditary.address}</p>
              <Divider />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">forma przyjęcia spadku:</p>
                  <p>
                    {hereditary.forma == 0
                      ? "przyjęcie proste"
                      : "przyjęcie z dobrodziejstwem inwentarza"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    kim był zmarły dla tego spadkobiercy?
                  </p>
                  <p className="text-right">
                    {getRelation(hereditary.relation)}
                  </p>
                </div>
              </div>
              <Divider />
              <span className="text-xl font-bold">
                Odpis skrócony aktu{" "}
                {hereditary.actType == 0 || hereditary.relation == 1
                  ? "małżeństwa"
                  : "urodzenia"}
              </span>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">nazwa urzędu stanu cywilnego:</p>
                  <p>{hereditary.actUscName}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">
                    data{" "}
                    {hereditary.actType == 0 || hereditary.relation == 1
                      ? "zawarcia małżeństwa"
                      : "urodzenia"}
                    :
                  </p>
                  <p>
                    {new Date(hereditary.actDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    numer odpisu skróconego aktu:
                  </p>
                  <p className="text-right">{hereditary.actNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
};

const Body = styled.div`
  @media (max-width: 800px) {
    width: 100%;

    margin-bottom: 20px;
    margin-right: 0px;
  }
`;

const ColumnForm = styled.div`
  width: 49%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const WrapFlex = styled.div`
  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

const RowFormGroup = styled(FormGroup)`
  width: 49%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const RowForm = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (min-width: 800px) {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const RenderErrorMessage = (message) => {
  return <p className="text-xs text-red-500 mt-2">{message}</p>;
};

function getRelation(relation) {
  if (typeof relation !== "number") relation = parseInt(relation);

  switch (relation) {
    case 1:
      return "małżonkiem";
    case 2:
      return "rodzeństwem";
    case 3:
      return "dzieckiem";
    case 4:
      return "rodzicem";
    case 5:
      return "dziadkiem/babcią";
    case 6:
      return "wujkiem/ciotką";
    default:
      return "małżonkiem";
  }
}
