import { Callout, HTMLSelect } from "@blueprintjs/core";
import styled from "@emotion/styled";
import React from "react";
import { CardForm, useCalculator } from "../../pages/kalkulator/index";

const RelationForm = () => {
  const { calculatorState, calculatorDispatch } = useCalculator();

  return (
    <CardForm style={{ marginTop: 30 }} className="flex">
      <Span className="flex flex-col justify-center m-3">
        <h3 className="font-bold">Kim był dla Ciebie zmarły?</h3>
        <p style={{ marginBottom: 10, width: 200 }}>
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
      </Span>
      <FamilyImage className="p-3 rounded-b">
        <div
          className="rounded p-3"
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            backgroundImage: "url(/family.jpg)",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "50% 30%",
          }}
        >
          <a
            className="text-xs text-white"
            style={{ fontSize: 8 }}
            href="https://www.vecteezy.com/free-vector/family"
          >
            Family Vectors by Vecteezy
          </a>
        </div>
      </FamilyImage>
    </CardForm>
  );
};

export default RelationForm;

export const FamilyImage = styled(Callout)`
  flex: 1;
  margin: 10px;
  min-height: 250px;

  @media (max-width: 800px) {
  }
`;

const Span = styled.span`
  @media (max-width: 800px) {
    width: 100%;
  }
`;
