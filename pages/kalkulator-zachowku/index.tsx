import {
  Button,
  Divider,
  FormGroup,
  HTMLSelect,
  InputGroup,
  Toaster,
} from "@blueprintjs/core";
import styled from "@emotion/styled";
import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import React from "react";
import { FamilyImage } from "../../components/calculator/Relation";
import { CardForm } from "../kalkulator/index";
import { useRouter } from "next/dist/client/router";
import Cookie from "universal-cookie";

export default function KalkulatorZachowku() {
  const toaster = React.useRef<Toaster>();
  const router = useRouter();

  const FormSchema = yup.object().shape({
    value: yup
      .number()
      .required("To pole jest wymagane.")
      .positive("Liczba musi być dodatnia."),
    share: yup
      .string()
      .required("To pole jest wymagane.")
      .matches(
        /^[1-9][0-9]*\/[1-9][0-9]*$/,
        "Wprowadź poprawny ułamek zwykły mniejszy od 1."
      ),
    workable: yup.boolean().required("To pole jest wymagane.").nullable(),
    is18: yup.boolean().required("To pole jest wymagane.").nullable(),
    writeSum: yup.number().positive("Liczba musi być dodatnia."),
    grantsSum: yup.number().positive("Liczba musi być dodatnia."),
  });

  return (
    <Formik
      initialValues={{
        value: "",
        share: "",
        is18: null,
        workable: null,
        writeSum: "",
        grantsSum: "",
      }}
      onSubmit={(values) => {
        router.push(
          `/kalkulator-zachowku/rezultat?${new URLSearchParams(
            values
          ).toString()}`
        );
      }}
      validationSchema={FormSchema}
      validateOnChange
    >
      {({ errors, touched, handleSubmit, values, setValues }) => {
        React.useEffect(() => {
          setValues(
            JSON.parse(
              sessionStorage.getItem("calculatorZachowekState") ||
                JSON.stringify(values)
            ),
            false
          );
        }, []);

        React.useEffect(() => {
          sessionStorage.setItem(
            "calculatorZachowekState",
            JSON.stringify(values)
          );
        }, [values]);

        return (
          <>
            <h1 className="text-4xl ">Kalkulator zachowku</h1>
            <p>
              Dowiedz się, ile możesz odzyskać, jeśli pominięto Cię w
              testamencie.
            </p>
            <CardForm style={{ marginTop: 30 }} className="flex flex-wrap">
              <Forms
                className="flex flex-col justify-evenly"
                style={{ margin: 10, flex: 1 }}
              >
                <h4 className=" text-2xl">Dane majątku zmarłego:</h4>

                <FormGroup
                  label="wartość majątku (w złotych):"
                  labelFor="value"
                  className="mt-5"
                >
                  <Field
                    intent={touched.value && errors.value ? "danger" : "none"}
                    as={InputGroup}
                    name="value"
                    placeholder="np. 200000"
                    type="number"
                    min={0}
                  />
                  <ErrorMessage name="value">
                    {(message) => (
                      <p className="text-red-500 text-sm">{message}</p>
                    )}
                  </ErrorMessage>
                </FormGroup>
                <FormGroup
                  label="twój ustawowy udział w spadku:"
                  className="mt-5"
                >
                  <Field
                    as={InputGroup}
                    intent={touched.share && errors.share ? "danger" : "none"}
                    name="share"
                    placeholder="np. 2/3"
                  />
                  <ErrorMessage name="share">
                    {(message) => (
                      <p className="text-red-500 text-sm">{message}</p>
                    )}
                  </ErrorMessage>
                </FormGroup>

                <p className="text-xs  text-gray-400">
                  nie znasz swojego udziału w spadku?
                </p>

                <Link href="/kalkulator" passHref>
                  <a className="mt-3">
                    <Button intent="primary" className="text-center text-xs">
                      OBLICZ UDZIAŁ W NASZYM KALKULATORZE
                    </Button>
                  </a>
                </Link>
              </Forms>
              <FamilyImage className="p-3 rounded-b">
                <div
                  className="rounded p-3"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                    backgroundImage: "url(/riches.jpg)",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 40%",
                  }}
                >
                  <a
                    href="https://www.vecteezy.com/free-vector/rich"
                    className="text-xs text-white"
                    style={{ fontSize: 8 }}
                  >
                    Rich Vectors by Vecteezy
                  </a>
                </div>
              </FamilyImage>
            </CardForm>
            <h4 className="mt-10 mb-2" style={{ marginLeft: 10 }}>
              Czy w chwili śmierci zmarłego miałeś/aś skończone 18 lat?
            </h4>
            <Field
              intent={touched.is18 && errors.is18 ? "danger" : "none"}
              as={HTMLSelect}
              className="ml-2"
              name="is18"
              style={{ minWidth: 250 }}
            >
              <option selected disabled>
                wybierz
              </option>
              <option value={1}>tak</option>
              <option value={0}>nie</option>
            </Field>
            <ErrorMessage name="is18">
              {(message) => (
                <p className="text-red-500 text-sm ml-2">{message}</p>
              )}
            </ErrorMessage>
            <Divider className="mt-6" />
            <div className="flex flex-col" style={{ marginLeft: 10 }}></div>
            <h4 className="mt-3 mb-2" style={{ marginLeft: 10 }}>
              Czy jesteś zdolny/a do pracy?
            </h4>
            <Field
              as={HTMLSelect}
              className="ml-2"
              style={{ minWidth: 250 }}
              name="workable"
              intent={touched.workable && errors.workable ? "danger" : "none"}
            >
              <option selected disabled>
                wybierz
              </option>
              <option value={1}>tak</option>
              <option value={0}>nie</option>
            </Field>
            <ErrorMessage name="workable">
              {(message) => (
                <p className="text-red-500 text-sm ml-2">{message}</p>
              )}
            </ErrorMessage>
            <div className="flex flex-col" style={{ marginLeft: 10 }}></div>
            <CardForm
              className="flex flex-col"
              style={{ justifyContent: "start", minHeight: 0 }}
            >
              <div className="flex flex-col w-full" style={{ margin: 10 }}>
                <h5 className="mb-2  w-full">
                  Jeśli zmarły darował część swojego majątku innemu lub innym
                  spadkobiercom{" "}
                  <b className="font-normal">
                    (przeciwko którym chcesz złożyć pozew)
                  </b>{" "}
                  mniej niż 10 lat przed śmiercią, podaj ich sumę w złotych.
                </h5>

                <FormGroup label="suma darowizn (w zł):" className="mt-3 mb-0">
                  <Field
                    as={InputGroup}
                    name="grantsSum"
                    intent={
                      touched.grantsSum && errors.grantsSum ? "danger" : "none"
                    }
                    type="number"
                    min={0}
                    placeholder="np. 10000"
                  />
                  <p className="text-xs text-gray-400">pole opcjonalne</p>
                </FormGroup>
                <ErrorMessage name="grantsSum">
                  {(message) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex flex-col w-full" style={{ margin: 10 }}>
                <Divider />
                <h5 className=" mt-4  w-full">
                  Jeśli w testamencie pojawiają się zapisy, podaj ich kwotę.
                </h5>
                <FormGroup
                  label="suma zapisanych kwot (w zł):"
                  className="mt-3"
                >
                  <Field
                    as={InputGroup}
                    name="writeSum"
                    type="number"
                    intent={
                      touched.writeSum && errors.writeSum ? "danger" : "none"
                    }
                    min={0}
                    placeholder="np. 10000"
                  />
                  <p className="text-xs text-gray-400">pole opcjonalne</p>
                  <ErrorMessage name="writeSum">
                    {(message) => (
                      <p className="text-red-500 text-sm">{message}</p>
                    )}
                  </ErrorMessage>
                </FormGroup>
              </div>
            </CardForm>
            <Button
              className="mt-10 h-15  w-full"
              onClick={() => {
                handleSubmit();
                if (Object.keys(errors).length) {
                  toaster.current.show({
                    intent: "danger",
                    message: "Wypełnij formularz poprawnie.",
                  });
                }
              }}
              rightIcon="caret-right"
              intent="primary"
            >
              KONTYNUUJ
            </Button>
            <Toaster ref={toaster} className="mt-10" position="top-right" />
          </>
        );
      }}
    </Formik>
  );
}

const renderError = (message) => (
  <p className="text-sm text-red-500">{message}</p>
);

const Forms = styled.div`
  @media (max-width: 800px) {
    width: 100%;
  }
`;
