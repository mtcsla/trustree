import {
  Button,
  Callout,
  Divider,
  FormGroup,
  Icon,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import styled from "@emotion/styled";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import Select from "react-select";
import * as yup from "yup";
import { FamilyImage } from "../../components/calculator/Relation";
import ColorfulIcon from "../../components/layout/ColorfulIcon";
import {
  getRelation,
  OtherHereditariesRenderer,
} from "../../components/pozew-o-zachowek/OtherHereditariesRenderer";
import { CardForm } from "../kalkulator";
import Immovables from "../../components/pozew-o-zachowek/Immovables";
import Movables from "../../components/pozew-o-zachowek/Movables";
import Grants from "../../components/pozew-o-zachowek/Grants";
import { ImmovablesRenderer } from "../../components/pozew-o-zachowek/ImmovablesRenderer";
import { MovablesRenderer } from "../../components/pozew-o-zachowek/MovablesRenderer";
import { GrantsRenderer } from "../../components/pozew-o-zachowek/GrantsRenderer";

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

    .matches(
      /^[1-9][0-9]*\/[1-9][0-9]*$/,
      "To pole musi zawierać właściwy ułamek zwykły lub być puste."
    ),
  invalid: yup.number().required("To pole jest wymagane.").nullable(),
  value: yup.number().required("To pole jest wymagane.").nullable(),
  mediation: yup.number().required("To pole jest wymagane.").nullable(),
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
  courtNumber: yup.string().required("To pole jest wymagane.").nullable(),
  //testament
  testamentDate: yup.date().required().nullable(),

  //otherHereditaries
  immovables: yup.array(),
  otherHereditaries: yup.array(),
  //ruling
  rulingCourtName: yup.string().required("To pole jest wymagane."),
  rulingCourtNumber: yup.string().required("To pole jest wymagane.").nullable(),
  rulingDate: yup.date().required("To pole jest wymagane.").nullable(),
  rulingSignature: yup.string().required("To pole jest wymagane."),
  rulingClosure: yup.boolean().required("To pole jest wymagane.").nullable(),
  rulingClosureDate: yup.date().nullable(),
});

export default function WniosekTestament() {
  const router = useRouter();
  const [loaded, setLoaded] = React.useState(false);
  const toaster = React.useRef<Toaster>();
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <Toaster
        position={Position.TOP_RIGHT}
        ref={toaster}
        className="z-50 mt-10"
      />
      <h1 className="text-4xl ">Wygeneruj pozew o zachowek</h1>
      <p>Podaj nam swoje dane, a my utworzymy za Ciebie pozew.</p>
      <Callout intent="primary" className="mt-6">
        Wykonanie tego pisma kosztuje <b>300zł</b>.
      </Callout>
      {loaded ? (
        <Formik
          onSubmit={(values) => {
            const newValues = { ...values };

            newValues.otherHereditaries = JSON.stringify(
              newValues.otherHereditaries
            );
            newValues.immovables = JSON.stringify(newValues.immovables);
            newValues.movables = JSON.stringify(newValues.movables);
            newValues.grants = JSON.stringify(newValues.grants);

            router.push(
              "/pozew-o-zachowek/finalizacja?" +
                new URLSearchParams(newValues).toString()
            );
          }}
          validateOnChange
          validationSchema={yupSchema}
          initialValues={
            JSON.parse(localStorage.getItem("pozewOZachowek")) || {
              email: "",
              name: "",
              pesel: "",
              street: "",
              postal: "",
              city: "",
              share: "",
              mediation: null,
              invalid: null,
              gender: null,
              relation: null,
              actType: null,
              value: null,
              actUscName: "",
              actNumber: "",
              actDate: null,
              //
              deadName: "",
              deadAddress: "",
              deadCity: "",
              deadDate: null,
              deadGender: null,
              deadActUscName: "",
              deadActNumber: "",
              //
              courtName: "",
              courtAddress: "",
              courtNumber: null,
              //
              otherHereditaries: [],
              immovables: [],
              movables: [],
              grants: [],
              //
              testamentDate: null,
              rulingCourtName: "",
              rulingCourtNumber: null,
              rulingDate: null,
              rulingSignature: "",
              rulingClosure: null,
              rulingClosureDate: null,
            }
          }
        >
          {({ errors, touched, values, setFieldValue, handleSubmit }) => {
            React.useEffect(() => {
              localStorage.setItem("pozewOZachowek", JSON.stringify(values));
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
                        Potrzebujemy Twoich danych osobowych, aby wykonać pozew
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
                          intent={
                            errors.name && touched.name ? "danger" : "none"
                          }
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
                    <FamilyImage className="p-3 rounded-b bg-transparent">
                      <div
                        className="rounded p-3"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          backgroundImage: "url(/court.jpg)",
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

                  <RowForm className="">
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
                  <RowForm className="">
                    <Callout className="mb-2" intent="success">
                      Jeśli odziedziczyłeś całość spadku, pozostaw pole z
                      udziałem puste. Możesz obliczyć swój udział w spadku i
                      zachowek w naszych kalkulatorach:
                      <ul className="list-disc pl-3">
                        <li className="font-bold">
                          <a href="/kalkulator">udział w spadku</a>
                        </li>
                        <li className="font-bold">
                          <a href="/kalkulator-zachowku">kwota zachowku</a>
                        </li>
                      </ul>
                    </Callout>
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
                      className=""
                      label="ustawowy udział w spadku:"
                      labelInfo=""
                    >
                      <Field
                        as={InputGroup}
                        leftIcon="pie-chart"
                        name="share"
                        placeholder="np. 1/3"
                        intent={
                          errors.share && touched.share ? "danger" : "none"
                        }
                      />
                      <ErrorMessage name="share">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                  </RowForm>
                  <RowForm>
                    <RowFormGroup label="czy zgłosiłeś zarzut nieważności testamentu?">
                      <Field
                        className="w-full"
                        as={Select}
                        menuPortalTarget={document.body}
                        isSearchable={false}
                        name="invalid"
                        intent={
                          errors.invalid && touched.invalid ? "danger" : "none"
                        }
                        onChange={({ value }) =>
                          setFieldValue("invalid", value)
                        }
                        placeholder="wybierz..."
                        value={
                          values.invalid == null
                            ? null
                            : {
                                value: values.invalid,
                                label: values.invalid ? "tak" : "nie",
                              }
                        }
                        options={[
                          {
                            value: 0,
                            label: "nie",
                          },
                          {
                            value: 1,
                            label: "tak",
                          },
                        ]}
                      />
                      <ErrorMessage name="invalid">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                    <RowFormGroup label="płeć:">
                      <Field
                        className="w-full"
                        as={Select}
                        menuPortalTarget={document.body}
                        isSearchable={false}
                        name="gender"
                        intent={
                          errors.gender && touched.gender ? "danger" : "none"
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
                                label: !values.gender ? "mężczyzna" : "kobieta",
                              }
                        }
                        options={[
                          {
                            value: 1,
                            label: "kobieta",
                          },
                          {
                            value: 0,
                            label: "mężczyzna",
                          },
                        ]}
                      />

                      <ErrorMessage name="gender">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                  </RowForm>
                  <RowForm>
                    <RowFormGroup label="czy próbowałeś dokonać mediacji ze stroną pozwaną?">
                      <Field
                        className="w-full"
                        as={Select}
                        menuPortalTarget={document.body}
                        isSearchable={false}
                        name="mediation"
                        intent={
                          errors.mediation && touched.mediation
                            ? "danger"
                            : "none"
                        }
                        onChange={({ value }) =>
                          setFieldValue("mediation", value)
                        }
                        placeholder="wybierz..."
                        value={
                          values.mediation == null
                            ? null
                            : {
                                value: values.mediation,
                                label: values.mediation ? "tak" : "nie",
                              }
                        }
                        options={[
                          {
                            value: 0,
                            label: "nie",
                          },
                          {
                            value: 1,
                            label: "tak",
                          },
                        ]}
                      />
                      <ErrorMessage name="mediation">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                    <RowFormGroup
                      className=""
                      label="kwota zachowku, o który chcesz się ubiegać (w zł):"
                      labelInfo=""
                    >
                      <Field
                        as={InputGroup}
                        leftIcon="dollar"
                        name="value"
                        type="number"
                        placeholder="np. 10000"
                        intent={
                          errors.value && touched.value ? "danger" : "none"
                        }
                      />
                      <ErrorMessage name="value">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </RowFormGroup>
                  </RowForm>
                </CardForm>
                <Callout className="mt-10" intent="primary">
                  Wniosek o stwierdzenie nabycia spadku - to podstawowe pismo,
                  które trzeba złożyć w sądzie w przypadku powołania do{" "}
                  <a
                    className="text-blue-600"
                    href="https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/kodeks-cywilny-16785996/art-931"
                  >
                    dziedziczenia na podstawie ustawy
                  </a>
                  , czyli w trybie tzw. dziedziczenia ustawowego lub na
                  podstawie testamentu (sporządzonego w formie pisemnej lub
                  ustnej).
                </Callout>
                <>
                  <div className="flex flex-col w-auto">
                    <h2 className="flex items-center mt-10 text-xl">
                      <ColorfulIcon
                        size={14}
                        style={{ marginRight: 7 }}
                        color="147, 112, 219"
                        icon="graph"
                      />
                      Kim był dla ciebie spadkodawca (zmarły)?
                    </h2>
                    <p className="text-xs mb-4">
                      Wybierz pokrewieństwo zmarłego wobec Ciebie.
                    </p>
                    <Field
                      className="w-full"
                      as={Select}
                      menuPortalTarget={document.body}
                      isSearchable={false}
                      name="relation"
                      intent={
                        errors.relation && touched.relation ? "danger" : "none"
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
                          value: 3,
                          label: "dzieckiem",
                        },
                        {
                          value: 4,
                          label: "rodzicem",
                        },
                      ]}
                    />
                    <ErrorMessage name="relation">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </div>

                  {values.relation && values.relation != 1 ? (
                    <div className="flex mt-6 flex-col w-auto">
                      <h2 className="flex items-center text-xl">
                        <ColorfulIcon
                          size={14}
                          style={{ marginRight: 7 }}
                          color="60,179,113"
                          icon="document"
                        />
                        Którym dokumentem chcesz udowodnić swoje powiązanie ze
                        zmarłym?
                      </h2>
                      <p className="text-xs">
                        Wybierz dokument, którym chcesz dowieść swojego
                        pokrewieństwa, oba z nich są poprawne w każdym
                        przypadku.
                      </p>
                      <Field
                        as={Select}
                        menuPortalTarget={document.body}
                        isSearchable={false}
                        onChange={({ value }) => {
                          setFieldValue("actType", value);
                        }}
                        value={
                          values.actType == null
                            ? null
                            : {
                                value: values.actType,
                                label: values.actType
                                  ? "odpis skrócony aktu urodzenia"
                                  : "odpis skrócony aktu małżeństwa",
                              }
                        }
                        placeholder="wybierz..."
                        name="actType"
                        className="mb-0 mt-4"
                        validate={(value) => {
                          if (value == null) return "To pole jest wymagane.";
                          else return null;
                        }}
                        options={[
                          {
                            value: 0,
                            label: "odpis skrócony aktu małżeństwa",
                          },
                          {
                            value: 1,
                            label: "odpis skrócony aktu urodzenia",
                          },
                        ]}
                      />
                      <ErrorMessage name="actType">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </div>
                  ) : null}
                  {values.actType != null || values.relation == 1 ? (
                    <CardForm className="min-h-0">
                      <div className="flex flex-col w-full">
                        <h3 className="flex items-center text-2xl  w-full">
                          <ColorfulIcon
                            size={18}
                            style={{ marginRight: 7 }}
                            color="220, 20, 60"
                            icon="document-share"
                          />
                          {values.relation != 3 ? "Twój o" : "O"}dpis skrócony{" "}
                          {values.relation == 1 || values.actType == 0
                            ? "aktu małżeństwa"
                            : "aktu urodzenia"}
                          {values.relation == 3 ? " zmarłego" : ""}
                        </h3>
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
                      Aby wykonać pozew potrzebujemy również danych o zmarłym,
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
                <Callout intent="primary" className="mt-8">
                  Dzięki naszemu kalkulatorowi udziału w spadku oraz
                  precyzyjnych pytań przygotowanych na mnogość danych sytuacji,
                  utworzymy automatycznie dokument niezbędny, w razie gdybyś
                  pragnął/pragnęła przyjąć spadek w formie prostej bądź z
                  dobrodziejstwem inwentarza.
                </Callout>

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
                      share: yup
                        .string()
                        .matches(
                          /^[1-9][0-9]*\/[1-9][0-9]*$/,
                          "To pole musi zawierać właściwy ułamek zwykły lub być puste."
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
                      sued: yup
                        .number()
                        .nullable()
                        .required("To pole jest wymagane."),
                      //testament
                    })}
                    initialValues={{
                      name: "",
                      address: "",
                      share: "",
                      forma: null,
                      gender: null,
                      sued: null,
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
                            Spadkobiercy testamentowi
                          </h3>
                          <p className="text-xs">
                            Dodaj kolejno spadkobierców, którym zmarły przepisał
                            majątek.
                          </p>
                          <Divider className="mt-4 mb-4 w-full" />
                          <h3 className="text-sm mb-2  w-full">
                            DANE SPADKOBIERCY:
                          </h3>
                          <RowForm className="">
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
                            <Callout className="mb-2" intent="success">
                              Jeśli spadkobierca odziedziczył całość spadku,
                              pozostaw pole z udziałem puste.
                            </Callout>
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
                                as={Select}
                                menuPortalTarget={document.body}
                                isSearchable={false}
                                name="forma"
                                intent={
                                  errors.forma && touched.forma
                                    ? "danger"
                                    : "none"
                                }
                                onChange={({ value }) =>
                                  setFieldValue("forma", value)
                                }
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
                                    label:
                                      "przyjęcie z dobrodziejstwem inwentarza",
                                  },
                                ]}
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
                                    value: 0,
                                    label: "niespokrewnionym",
                                  },
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
                          <RowForm>
                            <RowFormGroup
                              style={{ width: "100%" }}
                              label="czy chcesz pozwać tego spadkobiercę?"
                              helperText="musisz pozwać conajmniej jednego"
                            >
                              <Field
                                className="w-full"
                                as={Select}
                                menuPortalTarget={document.body}
                                isSearchable={false}
                                name="sued"
                                intent={
                                  errors.sued && touched.sued
                                    ? "danger"
                                    : "none"
                                }
                                placeholder="wybierz..."
                                onChange={({ value }) => {
                                  setFieldValue("sued", value);
                                }}
                                value={
                                  values.sued == null
                                    ? null
                                    : {
                                        value: values.sued,
                                        label: !values.sued ? "nie" : "tak",
                                      }
                                }
                                options={[
                                  {
                                    value: 0,
                                    label: "nie",
                                  },
                                  { value: 1, label: "tak" },
                                ]}
                              />

                              <ErrorMessage name="sued">
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

                <CardForm
                  className="items-stretch"
                  style={{
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4 className="flex items-center text-2xl  w-full">
                    <ColorfulIcon
                      size={18}
                      style={{ marginRight: 7 }}
                      color="200, 170, 75"
                      icon="rotate-document"
                    />
                    Testament, który spisał spadkodawca
                  </h4>
                  <Divider className="w-full mt-4 mb-4" />
                  <FormGroup label="data spisania testamentu:">
                    <Field
                      as={InputGroup}
                      name="testamentDate"
                      type="date"
                      leftIcon="calendar"
                      placeholder="np. Sąd Okręgowy w Elblągu"
                      intent={
                        errors.testamentDate && touched.testamentDate
                          ? "danger"
                          : "none"
                      }
                    />
                    <ErrorMessage name="testamentDate">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </FormGroup>
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
                      Postanowienie sądu
                    </h4>
                    <p className="text-xs">
                      Podaj nam dane dotyczące postanowienia sądu ws. nabycia
                      spadku na podstawie testamentu.
                    </p>
                    <Divider className="mt-4 mb-4 w-full" />
                    <FormGroup label="nazwa sądu:">
                      <Field
                        as={InputGroup}
                        name="rulingCourtName"
                        leftIcon="take-action"
                        placeholder="np. Sąd Okręgowy w Elblągu"
                        intent={
                          errors.rulingCourtName && touched.rulingCourtName
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="rulingCourtName">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>

                    <FormGroup label="numer wydziału cywilnego sądu:">
                      <Field
                        as={Select}
                        menuPortalTarget={document.body}
                        placeholder="wybierz..."
                        className="w-full"
                        intent={
                          errors.rulingCourtNumber && touched.rulingCourtNumber
                            ? "danger"
                            : "none"
                        }
                        isSearchable={false}
                        onChange={({ value }) =>
                          setFieldValue("rulingCourtNumber", value)
                        }
                        value={
                          !values.rulingCourtName ||
                          values.rulingCourtName == null
                            ? null
                            : {
                                value: values.rulingCourtNumber,
                                label: values.rulingCourtNumber,
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
                      <ErrorMessage name="rulingCourtNumber">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <Divider className="mt-4 mb-4" />
                    <FormGroup label="data wydania postanowienia:">
                      <Field
                        as={InputGroup}
                        name="rulingDate"
                        leftIcon="calendar"
                        type="date"
                        intent={
                          errors.rulingDate && touched.rulingDate
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="rulingDate">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <FormGroup label="sygnatura postanowienia:">
                      <Field
                        as={InputGroup}
                        name="rulingSignature"
                        leftIcon="edit"
                        placeholder="np. AKT II NE 421/17"
                        intent={
                          errors.rulingSignature && touched.rulingSignature
                            ? "danger"
                            : "none"
                        }
                      />
                      <ErrorMessage name="rulingSignature">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    <Divider className="mt-4 mb-4" />

                    <FormGroup label="czy istnieje klauzula wykonalności?">
                      <Field
                        as={Select}
                        menuPortalTarget={document.body}
                        name="rulingClosure"
                        placeholder="wybierz..."
                        className="w-full"
                        intent={
                          errors.rulingClosure && touched.rulingClosure
                            ? "danger"
                            : "none"
                        }
                        isSearchable={false}
                        onChange={({ value }) =>
                          setFieldValue("rulingClosure", value)
                        }
                        value={
                          values.rulingClosure == null
                            ? null
                            : {
                                value: values.rulingClosure,
                                label:
                                  values.rulingClosure == 1 ? "tak" : "nie",
                              }
                        }
                        options={[
                          {
                            value: 0,
                            label: "nie",
                          },
                          {
                            value: 1,
                            label: "tak",
                          },
                        ]}
                      />
                      <ErrorMessage name="rulingClosure">
                        {RenderErrorMessage}
                      </ErrorMessage>
                    </FormGroup>
                    {values.rulingClosure == 1 ? (
                      <FormGroup label="sygnatura klauzuli:">
                        <Field
                          as={InputGroup}
                          name="rulingClosureDate"
                          leftIcon="calendar"
                          validate={(value) =>
                            value ? null : "To pole jest wymagane."
                          }
                          type="date"
                          intent={
                            errors.rulingClosureDate &&
                            touched.rulingClosureDate
                              ? "danger"
                              : "none"
                          }
                        />
                        <ErrorMessage name="rulingClosureDate">
                          {RenderErrorMessage}
                        </ErrorMessage>
                      </FormGroup>
                    ) : null}
                  </div>
                </CardForm>
                <CardForm>
                  <Immovables {...{ errors, values, setFieldValue }} />
                  <ImmovablesRenderer
                    immovables={values.immovables}
                    setValue={(value) => setFieldValue("immovables", value)}
                  />
                </CardForm>
                <CardForm>
                  <Movables {...{ errors, values, setFieldValue }} />
                  <MovablesRenderer
                    movables={values.movables}
                    setValue={(value) => setFieldValue("movables", value)}
                  />
                </CardForm>
                <CardForm>
                  <Grants {...{ errors, values, setFieldValue }} />
                  <GrantsRenderer
                    grants={values.grants}
                    setValue={(value) => setFieldValue("grants", value)}
                  />
                </CardForm>
                <CardForm
                  className="items-stretch"
                  style={{
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4 className="flex items-center text-2xl  w-full">
                    <ColorfulIcon
                      size={18}
                      style={{ marginRight: 7 }}
                      color="200, 170, 75"
                      icon="rotate-document"
                    />
                    Testament, który spisał spadkodawca
                  </h4>
                  <Divider className="w-full mt-4 mb-4" />
                  <FormGroup label="data spisania testamentu:">
                    <Field
                      as={InputGroup}
                      name="testamentDate"
                      type="date"
                      leftIcon="calendar"
                      placeholder="np. Sąd Okręgowy w Elblągu"
                      intent={
                        errors.testamentDate && touched.testamentDate
                          ? "danger"
                          : "none"
                      }
                    />
                    <ErrorMessage name="testamentDate">
                      {RenderErrorMessage}
                    </ErrorMessage>
                  </FormGroup>
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
                      Dane sądu, do którego chcesz złożyć pozew
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
                          !values.courtName || values.courtName == null
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
                <Button
                  rightIcon="caret-right"
                  className="mt-10 w-full"
                  intent="success"
                  onClick={(e) => {
                    if (!countSued(values.otherHereditaries)) {
                      toaster.current.show({
                        message:
                          "Musisz pozwać conajmniej jednego spadkobiercę testamentowego.",
                        intent: "danger",
                      });
                    } else {
                      handleSubmit(e);
                    }
                    console.log(errors);
                  }}
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

export const Body = styled.div`
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

export const RowFormGroup = styled(FormGroup)`
  width: 49%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const RowForm = styled.div`
  display: flex;

  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 800px) {
    text-overflow: ellipsis;
  }
`;

export const RenderErrorMessage = (message) => {
  return <p className="text-xs text-red-500 mt-2">{message}</p>;
};

const countSued = (hereditaries: any[]) => {
  if (hereditaries.length === 0) return 0;
  let sued = 0;
  for (const i of hereditaries) {
    if (i.sued == 1) sued++;
  }
  return sued;
};
