import { Callout, Card, Spinner } from "@blueprintjs/core";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Cookie from "universal-cookie";
import { CardForm } from ".";
import { FamilyImage } from "../../components/calculator/Relation";

const cookies = new Cookie();

export default function Rezultat() {
  const [rezultat, setRezultat] = React.useState([]);
  const [relation, setRelation] = React.useState(1);

  const router = useRouter();

  React.useEffect(() => {
    const cookieState = cookies.get("calculatorState");

    if (Object.keys(cookieState).length === 0 || !cookieState) {
      router.push("/kalkulator");
      setRelation(cookieState.relation);
    } else {
      axios.post("/api/calculate-heritage", cookieState).then((res) => {
        setRezultat(res.data.result);
        document.cookie = "calculatorState=;";
      });
    }
  }, []);

  React.useEffect(() => {}, []);

  return (
    <>
      <h1 className="text-4xl font-bold">
        Obliczyliśmy udziały twoje oraz innych krewnych zmarłego.
      </h1>
      <p>Ta usługa nic nie kosztuje.</p>
      <ShareWrapper className="flex">
        <ShareDeclaration
          className="flex flex-col justify-evenly text-center mr-5"
          style={{ minWidth: 200 }}
        >
          <h2 className="font-bold">Twój udział:</h2>
          {rezultat.length ? (
            <Card className="w-full">
              <h1
                className={`${
                  rezultat[relation - 1] == 1 ? "text-4xl" : "text-6xl"
                } font-thin`}
              >
                {rezultat[relation - 1] == 1
                  ? "całość"
                  : !rezultat[relation - 1]
                  ? "brak"
                  : rezultat[relation - 1]}
              </h1>
            </Card>
          ) : (
            <Spinner />
          )}
          {rezultat.length ? (
            <p>
              {!rezultat[relation - 1] ? "Nie p" : "P"}rzysługuje Ci{" "}
              {rezultat[relation - 1] == 1
                ? "całość"
                : !rezultat[relation - 1]
                ? "żadna część"
                : rezultat[relation - 1]}{" "}
              majątku zmarłego.
            </p>
          ) : null}
        </ShareDeclaration>
        <FamilyImage className="p-3 rounded-b">
          <div
            className="rounded p-3"
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              backgroundImage: "url(/fortune.jpg)",
              minHeight: 200,
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
      </ShareWrapper>

      <h1 className="text-2xl font-bold mt-10">Udziały innych krewnych:</h1>
      <OthersTable
        style={{ minHeight: 200 }}
        className={`w-full mt-4 ${
          rezultat.length ? "" : "flex"
        } border min-w-0 bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped`}
      >
        {rezultat.length ? (
          <>
            <tr>
              <th>pokrewieństwo</th>
              <th style={{ width: "70%" }}></th>
              <th>udział</th>
            </tr>
            <tbody>
              <tr>
                <td>małżonek</td>
                <td></td>
                <td>
                  {!rezultat[0]
                    ? "brak"
                    : rezultat[0] == 1
                    ? "całość"
                    : rezultat[0]}
                </td>
              </tr>
              <tr>
                <td>brat / siostra</td>
                <td></td>
                <td>
                  {!rezultat[1]
                    ? "brak"
                    : rezultat[1] == 1
                    ? "całość"
                    : rezultat[1]}
                </td>
              </tr>
              <tr>
                <td>rodzic</td>
                <td></td>
                <td>
                  {!rezultat[2]
                    ? "brak"
                    : rezultat[2] == 1
                    ? "całość"
                    : rezultat[2]}
                </td>
              </tr>
              <tr>
                <td>dziecko</td>
                <td></td>
                <td>
                  {!rezultat[3]
                    ? "brak"
                    : rezultat[3] == 1
                    ? "całość"
                    : rezultat[3]}
                </td>
              </tr>
              <tr>
                <td>wnuk / wnuczka</td>
                <td>
                  tylko jeśli jego/jej matka/ojciec będący dzieckiem zmarłego
                  nie żyje
                </td>
                <td>
                  {!rezultat[3]
                    ? "brak"
                    : rezultat[3] == 1
                    ? "całość"
                    : rezultat[3] + " podzielona na liczbę rodzeństwa"}
                </td>
              </tr>
              <tr>
                <td>siostrzeniec / siostrzenica</td>
                <td>
                  tylko jeśli jego/jej matka/ojciec będący dzieckiem zmarłego
                  nie żyje
                </td>
                <td>
                  {!rezultat[1]
                    ? "brak"
                    : rezultat[1] == 1
                    ? "całość"
                    : rezultat[1] + " podzielona na liczbę rodzeństwa"}
                </td>
              </tr>
            </tbody>
          </>
        ) : (
          <Spinner className="m-auto" />
        )}
      </OthersTable>
    </>
  );
}

const ShareWrapper = styled(CardForm)`
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const ShareDeclaration = styled.div`
  @media (max-width: 800px) {
    align-items: start;
    width: 100%;
    min-height: 200px;
  }
`;

const OthersTable = styled.table`
  @media (max-width: 800px) {
    font-size: 12px !important;
  }
`;
