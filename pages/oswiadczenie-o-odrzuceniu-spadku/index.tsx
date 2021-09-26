import { Button } from "@blueprintjs/core";
import { Formik } from "formik";
import React from "react";
import { CardForm } from "../kalkulator";
import * as yup from "yup";

export default function OswiadczenieOdrzuc() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <h1 className="text-4xl">Oświadczenie o odrzuceniu spadku</h1>
      <p className="mt-2">
        Podaj nam swoje dane, a my wykonamy za Ciebie oświadczenie.
      </p>
      {loaded ? (
        <Formik
          onSubmit={() => {}}
          initialValues={localStorage.getItem("oswiadczenieOdrzucValues") || {}}
          validationSchema={yup.object().shape({})}
        >
          {({ handleSubmit, values }) => {
            React.useEffect(() => {
              localStorage.setItem(
                "oswiadczenieOdrzucValues",
                JSON.stringify(values)
              );
            }, [values]);
            return (
              <>
                <CardForm></CardForm>
                <Button
                  className="mt-10"
                  intent="success"
                  fill
                  onClick={() => handleSubmit()}
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
