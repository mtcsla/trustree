import { Button, Callout, Card, Spinner } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { Fraction } from "fractional";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import Cookie from "universal-cookie";
import { CardForm } from ".";
import { FamilyImage } from "../../components/calculator/Relation";
import { Stepper } from "../testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku";

const cookies = new Cookie();

const HereditarySpouse = ({ children, parents, kin }) => {
  if (children == 0) {
    if (parents == 0) {
      if (kin == 0) return new Fraction(1, 1);
      return new Fraction(1, 2);
    }
    return new Fraction(1);
  }
  if (children <= 3) return new Fraction(1, 1).divide(children + 1);
  return new Fraction(1, 4);
};

const HereditaryChild = ({ children, spouse }) => {
  if (spouse == 0) return new Fraction(1, 1).divide(children);
  if (children <= 3) return new Fraction(1, 1).divide(children + 1);
  return new Fraction(3, 4).divide(children);
};

const HereditaryKin = ({ kin, parents, children, spouse }) => {
  if (children > 0) return new Fraction(0, 1);
  if (parents == 2) return new Fraction(0, 1);
  if (spouse == 1)
    return parents == 0
      ? new Fraction(1, 2).divide(kin)
      : new Fraction(1, 4).divide(kin);
  return parents == 0
    ? new Fraction(1, 1).divide(kin)
    : new Fraction(1, 2).divide(kin);
};

const HereditaryParent = ({ children, spouse, parents, kin }) => {
  if (children > 0) return new Fraction(0, 1);
  if (!spouse)
    if (parents == 1) {
      if (kin == 0) return new Fraction(1, 1);
      else return new Fraction(1, 2);
    } else return new Fraction(1, 2);
  if (spouse) {
    if (parents == 1) {
      if (kin == 0) return new Fraction(1, 2);
      else return new Fraction(1, 4);
    } else return new Fraction(1, 4);
  }
};

const HereditaryGrandchild = ({ parentAlive, userKin, children, spouse }) => {
  if (parentAlive == 1) return new Fraction(0, 1);
  return HereditaryChild({ children, spouse }).divide(userKin + 1);
};

const HereditaryEnkel = ({
  kin,
  parents,
  children,
  spouse,
  parentAlive,
  userKin,
}) => {
  if (parentAlive == 1) return new Fraction(0, 1);
  return HereditaryKin({ kin, parents, children, spouse }).divide(userKin + 1);
};

export const getServerSideProps = async (context) => {
  const data = context.query;
  const { relation } = data;

  console.log({ data });

  for (const i in data) {
    if (data[i] == "null") data[i] = null;
    else data[i] = parseInt(data[i]);
  }

  try {
    let rezultat: any[] = [
      data.spouse || data.relation == 1
        ? HereditarySpouse(data)
        : new Fraction(0, 1),

      parseInt(data.kin) > 0 || data.relation == 2
        ? HereditaryKin(data)
        : new Fraction(0, 1),

      parseInt(data.parents) > 0 || data.relation == 3
        ? HereditaryParent(data)
        : new Fraction(0, 1),

      parseInt(data.children) > 0 || data.relation == 4
        ? HereditaryChild(data)
        : new Fraction(0, 1),

      parseInt(data.children) > 0 || data.relation == 4 || data.relation == 5
        ? HereditaryGrandchild(data)
        : new Fraction(0, 1),

      parseInt(data.kin) > 0 || data.relation == 2 || data.relation == 6
        ? HereditaryEnkel(data)
        : new Fraction(0, 1),
    ];

    for (const item in rezultat) {
      rezultat[item] = rezultat[item].toString();
    }

    console.log(context.query, rezultat);

    return {
      props: {
        rezultat,
        relation,
      },
    };
  } catch (err) {
    return {
      props: {
        rezultat: null,
        relation: null,
      },
    };
  }
};

export default function Rezultat({ rezultat, relation }) {
  const router = useRouter();

  React.useEffect(() => {
    if (!rezultat) router.push("/kalkulator");
    else sessionStorage.removeItem("calculatorState");
  }, []);

  return (
    <>
      <Stepper nOfSteps={2} currentStep={2} message={"sprawdź rezultat"} />

      <h1 className="text-4xl ">
        Obliczyliśmy udziały twoje oraz innych krewnych zmarłego.
      </h1>
      <p>Ta usługa nic nie kosztuje.</p>
      <ShareWrapper className="flex">
        <ShareDeclaration
          className="flex flex-col justify-evenly text-center mr-5"
          style={{ minWidth: 200 }}
        >
          <h2 className="">Twój udział:</h2>
          {rezultat ? (
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
          {rezultat ? (
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

      <h1 className="text-2xl  mt-10">Udziały innych krewnych:</h1>
      <OthersTable
        style={{ minHeight: 200 }}
        className={`w-full mt-4 ${
          rezultat ? "" : "flex"
        } border min-w-0 bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped`}
      >
        {rezultat ? (
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
                    ? "całość podzielona na liczbę rodzeństwa"
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
                    ? "całość podzielona na liczbę rodzeństwa"
                    : rezultat[1] + " podzielona na liczbę rodzeństwa"}
                </td>
              </tr>
            </tbody>
          </>
        ) : (
          <Spinner className="m-auto" />
        )}
      </OthersTable>
      <Link href="/kalkulator" passHref>
        <a>
          <Button className="w-full mt-10" intent="success" icon="caret-left">
            WRÓĆ
          </Button>
        </a>
      </Link>
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
