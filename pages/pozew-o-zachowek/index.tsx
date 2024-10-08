import { Button, Card } from "@blueprintjs/core";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import Steps from "../../components/Steps";
import YouTube from "../../components/YouTube";
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
          <div className="flex flex-col justify-center">
            <h1 className={`text-white mt-2  text-${width > 1000 ? 4 : 3}xl`}>
              Pozew o zachowek
            </h1>
            <p className="text-white text-xs text-right">wykonaj pismo</p>
          </div>
        </HeaderText>
        <img src="logo.svg" className="mr-4 ml-4" alt="Logo firmy Trustree." />
      </Header>
      <div className=" w-full bg-gray-200 mt-6 rounded-lg p-6">
        <h2 className="text-3xl">Dowiedz się więcej.</h2>
        <p>
          Jeżeli jako potomek (zstępny), małżonek lub rodzic spadkodawcy
          pominięto Cię w testamencie, możesz się ubiegać o zachowek, czyli o
          połowę lub dwie trzecie części spadku, która by Ci przysługiwała na
          podstawie{" "}
          <a
            href="https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/kodeks-cywilny-16785996/art-991"
            className="text-blue-500"
          >
            dziedziczenia ustawowego
          </a>
          . W tym celu w oparciu o analizę różnych spraw z tytułu zachowku,
          przygotujemy dla Ciebie szczegółowy pozew, wraz z dowodzeniem
          elementów składających się na majątek spadkowy, który zabezpieczy
          Twoje prawo do zachowku.
        </p>
      </div>
      <Link href="/kalkulator-zachowku" passHref>
        <a>
          <Button className="mt-6 w-full">OBLICZ ZACHOWEK</Button>
        </a>
      </Link>
      <Card className={`w-full mt-6 flex justify-between ${width < 1000 ? "flex-wrap-reverse" : ""} `}>
        <div className="flex flex-col m-3 min-w-0">
          <h1>Zanim przejdziesz dalej,</h1>
          <p>przygotuj:</p>
          <ol className="list-disc ml-3">
            <li className="mt-2">
              <b>swój odpis skrócony swojego aktu urodzenia bądź małżeństwa</b>
              <p className="text-xs">
                jeśli jesteś małżonkiem zmarłego, przygotuj odpis skrócony aktu
                małżeństwa
              </p>
            </li>
            <li className="mt-2">
              <b>
                odpis skrócony swojego aktu urodzenia bądź małżeństwa zmarłego
              </b>
              <p className="text-xs">
                tylko jeśli jesteś rodzicem zmarłego, bądź jeden ze
                spadkobierców jest rodzicem
              </p>
            </li>
            <li className="mt-2">
              <b>odpis skrócony aktu zgonu spadkodawcy</b>
            </li>
            <li className="mt-2">
              <b>
                odpisy skrócone aktów małżeństwa/urodzenia każdego ze
                spadkobierców
              </b>
            </li>
            <li className="mt-2">
              <b>numery ksiąg wieczystych i adresy nieruchomości po zmarłym</b>
            </li>
            <li className="mt-2">
              <b>numery rejestracyjne pojazdów zmarłego</b>
            </li>
          </ol>
        </div>
        <YouTube url="https://www.youtube.com/embed/SsiAoF-VYy4" style={{
          width: width >= 1200 ? "40%" : "100%",
          height: width >= 1200 ? "100%" : 250,
          marginBottom: 40,
        }} />
      </Card>
      <Steps href="/pozew-o-zachowek/form" />
    </div>
  );
}
const Header = styled.div`
  padding: 30px;
  @media (max-width: 1000px) {
    padding: 20px;
  }
`;
const HeaderText = styled.div``;
