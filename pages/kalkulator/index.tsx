import {
  Card,
  Button,
  Icon,
  Callout,
  HTMLSelect,
  Toaster,
  Position,
  Toast,
} from "@blueprintjs/core";
import styled from "@emotion/styled";
import FamilyForm from "../../components/calculator/Family";
import RelationForm from "../../components/calculator/Relation";
import Cookie from "universal-cookie";
import RelativesForm from "../../components/calculator/Relatives";
import axios from "axios";
import React from "react";
import { useRouter } from "next/dist/client/router";

const calculatorContext = React.createContext<any>({});
const cookies = new Cookie();

export default function Kalkulator() {
  const [calculatorState, calculatorDispatch] = React.useReducer(
    reducer,
    cookies.get("calculatorState") || {}
  );
  const [required, setRequired] = React.useState<string[]>([]);
  const [calculated, setCalculated] = React.useState<any>(null);

  const checkRequired = () => {
    for (const field of required) {
      if (
        calculatorState[field] === null ||
        calculatorState[field] === undefined
      ) {
        toaster.current.show({
          intent: "danger",
          message: "Wypełnij wszystkie pola.",
        });
        return false;
      }
    }
    return true;
  };

  const onSubmit = () => {
    if (checkRequired())
      axios
        .post("/api/calculate-heritage", {
          ...calculatorState,
        })
        .then((res) => {
          setCalculated(res.data);
        })
        .catch(() =>
          toaster.current.show({ intent: "danger", message: "Wystąpił błąd." })
        );
  };

  const router = useRouter();

  React.useEffect(() => {
    if (calculated) {
      document.cookie = `calculatorResult=${JSON.stringify(
        calculated || {}
      )};expires=${new Date(
        new Date().getTime() + 60 * 60 * 1000 * 48
      ).toUTCString()};path=/kalkulator`;
      router.push("/kalkulator/rezultat");
    }
  }, [calculated]);

  React.useEffect(() => {
    if (!calculatorState.relation) {
      setRequired(["relation"]);
    } else if ([1, 2, 3, 4].includes(calculatorState.relation)) {
      setRequired(["parents", "spouse", "children", "kin"]);
    } else if ([5, 6].includes(calculatorState.relation)) {
      setRequired(["parents", "spouse", "children", "kin", "userKin"]);
    }
  }, [calculatorState.relation]);

  React.useEffect(() => {
    document.cookie = `calculatorState=${JSON.stringify(
      calculatorState
    )};expires=${new Date(
      new Date().getTime() + 60 * 60 * 1000 * 48
    ).toUTCString()};path=/kalkulator`;

    if (calculatorState.relation === 4 && calculatorState.children < 1)
      calculatorDispatch({ type: "setChildren", value: 1 });
    if (calculatorState.relation === 2 && calculatorState.kin < 1)
      calculatorDispatch({ type: "setKin", value: 1 });
  }, [calculatorState]);

  const contextValue = { calculatorState, calculatorDispatch, calculated };
  const toaster = React.useRef<Toaster>();

  return (
    <>
      <calculatorContext.Provider value={contextValue}>
        <h1 className="font-bold text-4xl">
          Kalkulator ustawowego udziału w spadku
        </h1>
        <p>
          Oblicz, jaka część spadku Ci się należy, jeśli spadkodawca nie
          pozostawił testamentu.
        </p>
        <RelationForm />
        <FamilyForm />
        <RelativesForm />
        <Button
          onClick={onSubmit}
          className="mt-10 h-15 font-bold w-full"
          intent="success"
        >
          KONTYNUUJ
        </Button>
        <Toaster
          position={Position.TOP_RIGHT}
          ref={toaster}
          className="z-50 mt-10"
        ></Toaster>
      </calculatorContext.Provider>
    </>
  );
}

export const useCalculator = () => React.useContext(calculatorContext);

export const CardForm = styled(Card)`
  margin-top: 30px;
  @media (min-width: 800px) {
    min-height: 300px;
  }
`;

const reducer = (state: any, action: { type; value }) => {
  switch (action.type) {
    case "setState":
      return action.value;
    case "setRelation":
      state.relation = action.value;
      return Object.assign({}, state);
    case "setParents":
      state.parents = action.value;
      return Object.assign({}, state);
    case "setSpouse":
      state.spouse = action.value;
      return Object.assign({}, state);
    case "setChildren":
      state.children = action.value;
      return Object.assign({}, state);
    case "setKin":
      state.kin = action.value;
      return Object.assign({}, state);
    case "setUserKin":
      state.userKin = action.value;
      return Object.assign({}, state);
    default:
      return state;
  }
};
