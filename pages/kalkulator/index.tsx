import { Button, Card, Position, Toaster } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Cookie from "universal-cookie";
import FamilyForm from "../../components/calculator/Family";
import RelationForm from "../../components/calculator/Relation";
import RelativesForm from "../../components/calculator/Relatives";
import { Stepper } from "../testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku";

const calculatorContext = React.createContext<any>({});
const cookies = new Cookie();

export default function Kalkulator() {
  const [calculatorState, calculatorDispatch] = React.useReducer(reducer, {
    relation: null,
    parents: null,
    spouse: null,
    parentAlive: null,
    children: 0,
    kin: 0,
    userKin: 0,
  });

  React.useEffect(() => {
    calculatorDispatch({
      type: "setState",
      value: JSON.parse(
        sessionStorage.getItem("calculatorState") ||
          JSON.stringify(calculatorState)
      ),
    });
  }, []);

  const [required, setRequired] = React.useState<string[]>([]);

  const checkRequired = () => {
    for (const field of required) {
      if (calculatorState[field] == null) {
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
    if (checkRequired()) {
      router.push(
        `/kalkulator/rezultat?${new URLSearchParams(
          calculatorState
        ).toString()}`
      );
    }
  };

  const router = useRouter();

  React.useEffect(() => {
    if (!calculatorState.relation) {
      setRequired(["relation"]);
    } else if (calculatorState.relation === 1) {
      setRequired(["parents"]);
    } else {
      setRequired(["parents", "spouse"]);
    }
  }, [calculatorState.relation]);

  React.useEffect(() => {
    if (calculatorState.relation === 4 && !calculatorState.children)
      calculatorDispatch({ type: "setChildren", value: 1 });
    if (calculatorState.relation === 2 && !calculatorState.kin)
      calculatorDispatch({ type: "setKin", value: 1 });
    sessionStorage.setItem("calculatorState", JSON.stringify(calculatorState));
  }, [calculatorState]);

  const contextValue = { calculatorState, calculatorDispatch };
  const toaster = React.useRef<Toaster>();

  return (
    <>
      <p className="w-full mt-0 text-center">
        <b>TA USŁUGA JEST DARMOWA</b>
      </p>
      <Stepper nOfSteps={2} currentStep={1} message={"wypełnij formularz"} />

      <calculatorContext.Provider value={contextValue}>
        <h1 className=" text-4xl">Kalkulator ustawowego udziału w spadku</h1>
        <p>
          <b>Za darmo</b> oblicz, jaka część spadku Ci się należy, jeśli
          spadkodawca nie pozostawił testamentu.
        </p>
        <RelationForm />
        <FamilyForm />
        <RelativesForm />
        <Button
          onClick={onSubmit}
          className="mt-10 h-15  w-full"
          intent="primary"
          rightIcon="caret-right"
        >
          OBLICZ
        </Button>
        <Toaster position={Position.TOP_RIGHT} ref={toaster} className="z-50" />
      </calculatorContext.Provider>
    </>
  );
}

export const useCalculator = () => React.useContext(calculatorContext);

export const CardForm = styled(Card)`
  margin-top: 30px;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;

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
    case "setParentAlive":
      state.parentAlive = action.value;
      return Object.assign({}, state);

    default:
      return state;
  }
};
