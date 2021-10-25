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
        const newGrants = [...values.grants];
        newGrants.push(newValues);

        setFieldValue("grants", newGrants);
        resetForm();
      }}
      validationSchema={yup.object().shape({
        value: yup
          .number()
          .positive("Wartość ruchomości musi być większa od 0.")
          .required("To pole jest wymagane.")
          .nullable(),

        date: yup.date().required("To pole jest wymagane.").nullable(),
        city: yup.string().required("To pole jest wymagane."),
        //testament
      })}
      initialValues={{
        value: null,

        date: null,
        city: "",
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
                icon="bank-account"
              />
              Darowizny
            </h3>
            <p className="text-xs">
              Dodaj kolejno darowizny, które spadkodawca aktem notarialnym
              ofiarował mniej niż 10 lat przed swoją śmiercią osobom, które
              pozywasz o zachowek. Jeśli takich nie ma, pomiń ten krok.
            </p>
            <Divider className="mt-4 mb-4 w-full" />
            <h3 className="text-sm mb-2  w-full">DANE RUCHOMOŚCI:</h3>

            <RowForm>
              <RowFormGroup
                style={{ width: "100%" }}
                label="kwota darowizny (w zł):"
              >
                <Field
                  as={InputGroup}
                  name="value"
                  onChange={(e) =>
                    setFieldValue("value", parseInt(e.target.value))
                  }
                  value={values.value || (true && "")}
                  type="number"
                  leftIcon="dollar"
                  placeholder="np. 20000"
                  intent={errors.value && touched.value ? "danger" : "none"}
                />
                <ErrorMessage name="value">{RenderErrorMessage}</ErrorMessage>
              </RowFormGroup>
            </RowForm>
            <RowForm>
              <RowFormGroup label="miasto podpisania aktu darowizny:">
                <Field
                  as={InputGroup}
                  name="city"
                  leftIcon="home"
                  placeholder="np. Gdynia"
                  intent={errors.city && touched.city ? "danger" : "none"}
                />
                <ErrorMessage name="city">{RenderErrorMessage}</ErrorMessage>
              </RowFormGroup>
              <RowFormGroup label="data darowizny:">
                <Field
                  as={InputGroup}
                  name="date"
                  type="date"
                  onChange={(e) => setFieldValue("date", e.currentTarget.value)}
                  value={values.date || (true && "")}
                  leftIcon="calendar"
                  intent={errors.date && touched.date ? "danger" : "none"}
                />
                <ErrorMessage name="date">{RenderErrorMessage}</ErrorMessage>
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
  );
}
