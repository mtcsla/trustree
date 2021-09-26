import { Button, Spinner } from "@blueprintjs/core";
import styled from "@emotion/styled";
import React from "react";
import { FamilyImage } from "../../components/calculator/Relation";
import { CardForm } from "../kalkulator/index";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export const getServerSideProps = async ({ query }) => {
  try {
    let { is18, workable, value, grantsValue, writeValue, share } = query;

    is18 = parseInt(is18);
    workable = parseInt(workable);
    value = parseInt(value);

    if (grantsValue) grantsValue = parseInt(grantsValue);
    if (writeValue) writeValue = parseInt(writeValue);

    const [numerator, denominator] = share.split("/");
    share = parseInt(numerator) / parseInt(denominator);

    if (!is18 || !workable) {
      share = (2 * share) / 3;
    } else share = share / 2;

    if (grantsValue) value = value + grantsValue;
    if (writeValue) value = value - writeValue;

    return {
      props: {
        result: value * share,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

export default function Rezultat({ result }) {
  const router = useRouter();

  React.useEffect(() => {
    if (!result) router.push("/kalkulator-zachowku");
    else sessionStorage.removeItem("calculatorZachowekState");
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">
        Obliczyliśmy kwotę zachowku, o który możesz się ubiegać
      </h1>
      <p>Ta usługa jest darmowa.</p>
      <CardForm className="flex" style={{ minWidth: 200 }}>
        <Content className="flex flex-col m-2">
          <h4 className="font-bold">Twój należny zachowek:</h4>
          <h1 className="text-4xl p-10 border font-thin m-auto w-full text-center">
            {result ? `${result.toFixed(2)}zł` : <Spinner />}
          </h1>
          <p className="text-center">
            Przysługuje Ci{" "}
            {result ? `${result.toFixed(2)}zł` : <Spinner size={5} />} zachowku.
          </p>
        </Content>
        <FamilyImage className="p-3 rounded-b">
          <div
            className="rounded p-3"
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              backgroundImage: "url(/fortune.jpg)",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "50% 40%",
            }}
          >
            <a
              className="text-xs text-white"
              style={{ fontSize: 8 }}
              href="https://www.vecteezy.com/free-vector/cartoon"
            >
              Cartoon Vectors by Vecteezy
            </a>
          </div>
        </FamilyImage>
      </CardForm>
      <Link href="/kalkulator-zachowku">
        <a>
          <Button icon="caret-left" className="w-full mt-10" intent="success">
            WRÓĆ
          </Button>
        </a>
      </Link>
    </>
  );
}

const Content = styled.div`
  @media (max-width: 800px) {
    width: 100%;
  }
`;
