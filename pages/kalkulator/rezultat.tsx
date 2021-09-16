import React from "react";
import Cookie from "universal-cookie";
import { useRouter } from "next/dist/client/router";
import { CardForm } from ".";

import { toVulgar, toDecimal } from "vulgar-fractions";
import styled from "@emotion/styled";
import { Callout, Card } from "@blueprintjs/core";

const cookies = new Cookie();

export default function Rezultat() {
  const [rezultat] = React.useState(
    cookies.get("calculatorResult").result || {}
  );
  const router = useRouter();

  React.useEffect(() => {
    if (Object.keys(rezultat).length === 0 || !rezultat)
      router.push("/kalkulator");

    console.log(rezultat);
  }, [rezultat]);

  React.useEffect(() => {
    document.cookie = "calculatorState=;";
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">
        Obliczyliśmy udziały twoje oraz krewnych zmarłego.
      </h1>
      <p>Ta usługa nic nie kosztuje.</p>
      <CardForm className="flex">
        <div
          className="flex flex-col justify-evenly text-center mr-5"
          style={{ minWidth: 200 }}
        >
          <h2 className="font-bold">Twój udział:</h2>
          <Card className=" m-auto">
            <h1 className="text-6xl font-thin">{rezultat[0]}</h1>
          </Card>
          <p>Przysługuje Ci {rezultat[0]} majątku zmarłego.</p>
        </div>
        <FamilyImage className="p-3 rounded-b">
          <div
            className="rounded p-3"
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              backgroundImage: "url(/fortune.jpg)",
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "50% 40%",
            }}
          >
            <a
              className="text-xs text-white"
              href="https://www.vecteezy.com/free-vector/cartoon"
              style={{ fontSize: 8 }}
            >
              Cartoon Vectors by Vecteezy
            </a>
          </div>
        </FamilyImage>
      </CardForm>
    </>
  );
}
const FamilyImage = styled(Callout)`
  @media (max-width: 800px) {
    display: none;
  }
`;
