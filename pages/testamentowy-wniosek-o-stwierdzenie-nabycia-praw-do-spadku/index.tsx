import { Button, Card } from "@blueprintjs/core";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { useWindowSize } from "../../hooks/windowSize";

export default function index() {
  const { width } = useWindowSize();

  return (
    <div className="flex flex-col w-full h-full">
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
            <p className="text-white text-xs text-right">wykonaj pismo</p>
            <h1 className={`text-white mt-2  text-${width > 1000 ? 4 : 3}xl`}>
              Wniosek o stwierdzenie nabycia praw do spadku
            </h1>
            <p className="text-white text-base mt-4">
              wg dziedziczenia testamentowego
            </p>
          </div>
        </HeaderText>
        <img src="logo.svg" className="mr-4 ml-4" alt="Logo firmy Trustree." />
      </Header>
      <div className=" w-full bg-gray-200 mt-6 rounded-lg p-6">
        <h2 className="text-3xl">Dowiedz się więcej.</h2>
        <p>
          Wniosek o stwierdzenie nabycia spadku - to podstawowe pismo, które
          trzeba złożyć w sądzie w przypadku powołania do{" "}
          <a
            href="https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/kodeks-cywilny-16785996/art-931"
            className="text-blue-500"
          >
            dziedziczenia na podstawie ustawy
          </a>
          , czyli w trybie tzw. dziedziczenia ustawowego lub na podstawie
          testamentu (sporządzonego w formie pisemnej lub ustnej). Dzięki
          naszemu kalkulatorowi udziału w spadku oraz precyzyjnych pytań
          przygotowanych na mnogość danych sytuacji, utworzymy automatycznie
          dokument niezbędny, w razie gdybyś pragnął/pragnęła przyjąć spadek w
          formie prostej bądź z dobrodziejstwem inwentarza.
        </p>
      </div>
      <Card className="w-full mt-6 flex flex-wrap-reverse">
        <div className="flex flex-col m-3">
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
          </ol>
        </div>
        <div
          className="w-full flex-1 flex flex-col-reverse"
          style={{
            backgroundImage: "url(people2.svg)",
            minHeight: 250,
            minWidth: 100,
            padding: 0,
            margin: 0,
            backgroundPosition: "50% 30%",
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
      <Link
        passHref
        href="/testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku/form"
      >
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
const Header = styled.div`
  padding: 30px;
  @media (max-width: 1000px) {
    padding: 20px;
  }
`;
const HeaderText = styled.div``;
