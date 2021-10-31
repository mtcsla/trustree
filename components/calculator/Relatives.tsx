import { Callout, Divider, HTMLSelect, Slider } from "@blueprintjs/core";
import styled from "@emotion/styled";
import React from "react";
import { CardForm, useCalculator } from "../../pages/kalkulator/index";

const RelativesForm = () => {
  const { calculatorState, calculatorDispatch } = useCalculator();

  return (
    <CardForm className="flex flex-col p-6">
      <h4 className=" text-xl w-full" style={{ marginBottom: 5 }}>
        Ile wciąż żyjących dzieci miał zmarły?
      </h4>
      <p style={{ marginBottom: 20 }} className="w-full">
        Jeśli dziecko zmarłego nie żyje, lecz pozostawiło żyjące potomstwo (np.
        swoje dzieci), dolicz to potomstwo w miejsce zmarłego dziecka.
      </p>
      <Slider
        initialValue={calculatorState.children}
        value={calculatorState.children}
        intent="primary"
        labelPrecision={0}
        labelStepSize={1}
        max={15}
        min={calculatorState.relation !== 4 ? 0 : 1}
        onChange={(value) =>
          calculatorDispatch({ type: "setChildren", value: value })
        }
      />
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />

      <h4 className=" text-xl w-full" style={{ marginBottom: 5 }}>
        Ile wciąż żyjącego rodzeństwa miał zmarły?
      </h4>
      <p style={{ marginBottom: 20 }} className="w-full">
        Jeśli któreś z rodzeństwa zmarłego nie żyje, lecz pozostawiło żyjące
        potomstwo (np. swoje dzieci), dolicz to potomstwo w miejsce zmarłego
        rodzeństwa spadkodawcy.
      </p>
      <Slider
        initialValue={calculatorState.kin}
        value={calculatorState.kin}
        intent="primary"
        labelPrecision={0}
        labelStepSize={1}
        max={15}
        min={calculatorState.relation !== 2 ? 0 : 1}
        onChange={(value) =>
          calculatorDispatch({ type: "setKin", value: value })
        }
      />

      {[5, 6].includes(calculatorState.relation) ? (
        <>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <h4 className=" text-xl" style={{ marginBottom: 5 }}>
            Ile wciąż żyjących bądź nieżyjących, lecz z żyjącym potomstwem braci
            lub sióstr masz Ty?
          </h4>
          <p style={{ marginBottom: 20 }}>
            Jeśli brat lub siostra nie żyje, lecz ma swoje potomstwo (dzieci,
            wnuki), które nadal żyje uwzględnij je.
          </p>
          <Slider
            initialValue={calculatorState.userKin}
            value={calculatorState.userKin}
            intent="primary"
            labelPrecision={0}
            labelStepSize={1}
            max={15}
            min={calculatorState.relation !== 2 ? 0 : 1}
            onChange={(value) =>
              calculatorDispatch({ type: "setUserKin", value: value })
            }
          />
        </>
      ) : null}
    </CardForm>
  );
};

export default RelativesForm;
