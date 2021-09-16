import { Callout, HTMLSelect } from "@blueprintjs/core";
import styled from "@emotion/styled";
import React from "react";
import { CardForm, useCalculator } from "../../pages/kalkulator/index";

const RelationForm = () => {
  const { calculatorState, calculatorDispatch } = useCalculator();

  return (
    <CardForm style={{ marginTop: 30 }} className="flex">
      <span
        className="flex flex-col justify-evenly"
        style={{ marginRight: 30 }}
      >
        <h3 className="font-bold">Kim był dla Ciebie zmarły?</h3>
        <p style={{ marginBottom: 10 }}>
          Wybierz pokrewieństwo zmarłego wobec Ciebie z listy.
        </p>
        <HTMLSelect
          value={calculatorState.relation}
          onChange={(e) =>
            calculatorDispatch({
              type: "setRelation",
              value: parseInt(e.target.value),
            })
          }
        >
          <option selected disabled>
            Wybierz pokrewieństwo
          </option>
          <option value={1}>małżonkiem</option>
          <option value={2}>rodzeństwem</option>
          <option value={3}>dzieckiem</option>
          <option value={4}>rodzicem</option>
          <option value={5}>dziadkiem/babcią</option>
          <option value={6}>wujkiem/ciotką</option>
        </HTMLSelect>
      </span>
      <FamilyImage className="p-3 rounded-b">
        <div
          className="rounded p-3"
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            backgroundImage: "url(/family.jpg)",
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "50% 30%",
          }}
        >
          <a
            className="text-xs text-white"
            href="https://www.vecteezy.com/free-vector/family"
            style={{ fontSize: 8 }}
          >
            Family Vectors by Vecteezy
          </a>
        </div>
      </FamilyImage>
    </CardForm>
  );
};

export default RelationForm;
const FamilyImage = styled(Callout)`
  @media (max-width: 800px) {
    display: none;
  }
`;
