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
          className="flex flex-col p-0 text-left ml-4 mr-4 justify-between"
          style={{
            background: "var(--sea-green)",
          }}
        >
          <div className="flex flex-col">
            <p className="text-white text-xs text-right">wykonaj pismo</p>
            <h1 className={`text-white mt-2  text-${width > 1000 ? 4 : 3}xl`}>
              Oświadczenie o odrzuceniu spadku
            </h1>
            <p className="text-white text-base mt-4">
              zanim przejdziesz dalej...
            </p>
          </div>
        </HeaderText>
        <img src="logo.svg" className="ml-4 mr-4" />
      </Header>
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
      <div className="flex-1 w-full bg-gray-200 mt-6 rounded-lg"></div>
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
