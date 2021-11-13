import { Button, Card } from "@blueprintjs/core";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { useWindowSize } from "../../hooks/windowSize";
import { Stepper } from "../testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku";

export default function index() {
  const { width } = useWindowSize();

  return (
    <div className="flex flex-col w-full h-full">
      <Stepper
        nOfSteps={3}
        currentStep={1}
        message={"zdobądź niezbędne informacje"}
      />
      <Header
        className="w-full flex text-left flex-wrap-reverse justify-center rounded-lg"
        style={{
          background: "var(--sea-green)",
          overflowX: "clip",
        }}
      >
        <HeaderText
          className="flex flex-col p-0 text-left ml-4 mr-4 justify-center"
          style={{
            background: "var(--sea-green)",
          }}
        >
          <div className="flex flex-col">
            <h1 className={`text-white mt-2  text-${width > 1000 ? 4 : 3}xl`}>
              Oświadczenie o odrzuceniu spadku
            </h1>
            <p className="text-white text-xs text-right">wykonaj pismo</p>
          </div>
        </HeaderText>
        <img src="logo.svg" alt="Logo firmy Trustree." className="ml-4 mr-4" />
      </Header>
      <div className=" w-full bg-gray-200 mt-6 rounded-lg p-6">
        <h2 className="text-3xl">Dowiedz się więcej.</h2>
        <p>
          Oświadczenie o odrzuceniu spadku - pismo, które uratuje Cię przed
          odpowiedzialnością za długi spadkowe. Według{" "}
          <a
            className="text-blue-500"
            href="https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/kodeks-cywilny-16785996/art-1015"
          >
            art. 1015 § 1 kc
          </a>
          , takie oświadczenie należy złożyć w ciągu 6 miesięcy od momentu, gdy
          spadkobierca dowiedział się o powołaniu do spadku. Takie oświadczenie
          można złożyć przed sądem rejonowym właściwym dla Twojego miejsca
          zamieszkania, przed notariuszem lub w toku postępowania o nabycie
          spadku. W przypadku niezłożenia oświadczenia w podanym terminie,
          spadkobierca przyjmuje spadek z dobrodziejstwem inwentarza.
        </p>
      </div>
      <Card className="w-full mt-6 flex flex-wrap-reverse">
        <div className="flex flex-col m-3">
          <h1>Zanim przejdziesz dalej,</h1>
          <p>przygotuj:</p>
          <ol className="list-disc ml-3">
            <li className="mt-2">
              <b>odpis skrócony aktu zgonu spadkodawcy</b>
            </li>
          </ol>
        </div>
        <div
          className="w-full flex-1 flex flex-col-reverse"
          style={{
            backgroundImage: "url(family.jpg)",
            minHeight: 100,
            minWidth: 100,
            padding: 0,
            margin: 0,
            backgroundPosition: "20% 25%",
            backgroundSize: "cover",
          }}
        >
          <a
            href="https://www.vecteezy.com/free-vector/family"
            className="text-white self-end text-xs"
          >
            Family Vectors by Vecteezy
          </a>
        </div>
      </Card>
      <Link passHref href="/oswiadczenie-o-odrzuceniu-spadku/form">
        <Button
          rightIcon="caret-right"
          intent="primary"
          className="w-full mt-6"
        >
          KONTYNUUJ
        </Button>
      </Link>
    </div>
  );
}
const HeaderText = styled.div``;
const Header = styled.div`
  padding: 30px;
  @media (max-width: 1000px) {
    padding: 20px;
  }
`;
