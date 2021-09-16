import {
  Button,
  ButtonGroup,
  Divider,
  Radio,
  RadioGroup,
} from "@blueprintjs/core";
import React from "react";
import { useWindowSize } from "../../hooks/windowSize";
import { useCalculator } from "../../pages/kalkulator/index";

const FamilyForm = () => {
  const windowWidth = useWindowSize().width;
  const { calculatorState, calculatorDispatch } = useCalculator();

  return (
    <div className="flex flex-col" style={{ marginTop: 30, marginLeft: 5 }}>
      <h4 style={{ marginBottom: 10 }}>Ilu rodziców zmarłego wciąż żyje?</h4>
      <RadioGroup
        inline={windowWidth > 800}
        selectedValue={calculatorState.parents}
        onChange={(e) => {
          calculatorDispatch({
            type: "setParents",
            value: parseInt(e.currentTarget.value),
          });
        }}
      >
        {calculatorState.relation !== 3 ? <Radio value={0}>żaden</Radio> : null}
        <Radio value={1}>jeden</Radio>
        <Radio value={2}>obydwoje</Radio>
      </RadioGroup>

      {calculatorState.relation !== 1 ? (
        <>
          <Divider className="mt-7" style={{ marginLeft: -5 }} />
          <h4 style={{ marginBottom: 10, marginTop: 20 }}>
            Czy małżonek zmarłego wciąż żyje?
          </h4>

          <RadioGroup
            inline={windowWidth > 800}
            selectedValue={calculatorState.spouse}
            onChange={(e) => {
              calculatorDispatch({
                type: "setSpouse",
                value: parseInt(e.currentTarget.value),
              });
            }}
          >
            <Radio value={1}>tak</Radio>
            <Radio value={0}>nie</Radio>
          </RadioGroup>
        </>
      ) : null}
    </div>
  );
};
export default FamilyForm;
