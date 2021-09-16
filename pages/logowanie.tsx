import {
  Button,
  Callout,
  Card,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React from "react";
import * as yup from "yup";
import { useAuth } from "../components/firebase/firebaseAuth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Wprowadź poprawny adres e-mail.")
    .required("Wprowadź adres e-mail."),
  password: yup
    .string()
    .required("Wprowadź hasło.")
    .min(6, "Hasło musi składać się z przynajmniej 6 znaków."),
});

const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      state.email = action.value;
      return Object.assign({}, state);
    case "setPassword":
      state.password = action.value;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default function LoginPage() {
  const [loginData, dispatch] = React.useReducer(reducer, {
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const router = useRouter();
  const { signIn, currentUser } = useAuth();

  React.useEffect(() => {
    if (currentUser) router.push("/");
  }, [currentUser]);

  const onSubmit = async () => {
    schema
      .validate(loginData)
      .then(() => {
        signIn(loginData.email, loginData.password)
          .then(() => {
            console.debug("Zalogowano.");
            setError(null);
            router.push("/");
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  return (
    <>
      <div className="flex-1 w-full flex items-start flex-wrap">
        <div className="flex flex-col m-3 h-full justify-center">
          <h1 className="text-4xl font-bold">Logowanie</h1>
          <p style={{ marginTop: 10, marginBottom: 20 }}>
            Zaloguj się, aby uzyskać dostęp do swojego konta.
          </p>
          <Callout intent="primary" className="">
            Na chwilę obecną logowanie służy tylko do uzyskiwania dostępu do
            edycji bloga przez naszych pisarzy. Niedługo wprowadzimy funkcje
            służące użytkownikom do współpracy z prawnikiem, które również będą
            wymagać logowania.
          </Callout>

          <Card className="flex bg-white p-5" style={{ marginTop: 30 }}>
            <LoginForm className="flex flex-col p-4" style={{ minWidth: 250 }}>
              <h2 className="text-3xl font-bold" style={{ marginBottom: 10 }}>
                Twoje dane
              </h2>
              <FormGroup label="adres e-mail" labelFor="email">
                <InputGroup
                  id="email"
                  leftIcon="envelope"
                  placeholder="np. jkowalski@mail.pl"
                  onChange={(e) =>
                    dispatch({ type: "setEmail", value: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup label="hasło" labelFor="password">
                <InputGroup
                  id="password"
                  leftIcon="key"
                  type="password"
                  onChange={(e) =>
                    dispatch({ type: "setPassword", value: e.target.value })
                  }
                />
              </FormGroup>
              <span className="m-2 text-center text-red-600">{error}</span>
              <Button
                className="w-full"
                style={{ marginTop: 10 }}
                type="submit"
                intent="success"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                ZALOGUJ SIĘ
              </Button>
            </LoginForm>

            <Picture style={{ marginLeft: 20, background: "none" }}>
              <div
                className="rounded-xl flex justify-end"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/security.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "50% 63%",
                }}
              >
                <a
                  style={{
                    alignSelf: "end",
                    textDecoration: "none",
                    fontSize: 8,
                  }}
                  className="text-right w-full m-6 text-xs text-white"
                  href="https://www.vecteezy.com/free-vector/security"
                >
                  Security Vectors by Vecteezy
                </a>
              </div>
            </Picture>
          </Card>
        </div>
      </div>
    </>
  );
}

const Picture = styled(Callout)`
  @media (max-width: 1200px) {
    display: none;
  }
`;

const LoginForm = styled.form`
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
