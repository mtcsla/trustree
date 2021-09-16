import { Callout, Card } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Cookie from "universal-cookie";
import { CardForm } from ".";

const cookies = new Cookie();

export default function Rezultat() {
  const [rezultat] = React.useState(
    (cookies.get("calculatorResult") &&
      cookies.get("calculatorResult").result) ||
      {}
  );
  const router = useRouter();

  const { relation } = cookies.get("calculatorResult") || {};

  React.useEffect(() => {
    if (Object.keys(rezultat).length === 0 || !rezultat)
      router.push("/kalkulator");
  }, [rezultat]);

  React.useEffect(() => {
    document.cookie = "calculatorState=;path=/kalkulator";
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">
        Obliczyliśmy udziały twoje oraz innych krewnych zmarłego.
      </h1>
      <p>Ta usługa nic nie kosztuje.</p>
      <CardForm className="flex">
        <div
          className="flex flex-col justify-evenly text-center mr-5"
          style={{ minWidth: 200 }}
        >
          <h2 className="font-bold">Twój udział:</h2>
          <Card className=" m-auto">
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
          <p>
            {!rezultat[relation - 1] ? "Nie p" : "P"}rzysługuje Ci{" "}
            {rezultat[relation - 1] == 1
              ? "całość"
              : !rezultat[relation - 1]
              ? "żadna część"
              : rezultat[relation - 1]}{" "}
            majątku zmarłego.
          </p>
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

      <h1 className="text-2xl font-bold mt-10">Udziały innych krewnych:</h1>
      <table className="w-full mt-4 border bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
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
              tylko jeśli jego/jej matka/ojciec będący dzieckiem zmarłego nie
              żyje
            </td>
            <td>
              {!rezultat[4]
                ? "brak"
                : rezultat[4] == 1
                ? "całość"
                : rezultat[4] + " podzielona na liczbę rodzeństwa"}
            </td>
          </tr>
          <tr>
            <td>siostrzeniec / siostrzenica</td>
            <td>
              tylko jeśli jego/jej matka/ojciec będący dzieckiem zmarłego nie
              żyje
            </td>
            <td>
              {!rezultat[5]
                ? "brak"
                : rezultat[5] == 1
                ? "całość"
                : rezultat[5] + " podzielona na liczbę rodzeństwa"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
const FamilyImage = styled(Callout)`
  @media (max-width: 800px) {
    display: none;
  }
`;

/*<option value={1}>małżonkiem</option>
<option value={2}>rodzeństwem</option>
<option value={3}>dzieckiem</option>
<option value={4}>rodzicem</option>
<option value={5}>dziadkiem/babcią</option>
<option value={6}>wujkiem/ciotką</option>*/
