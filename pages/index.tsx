import { useWindowSize } from "../hooks/windowSize";
import { useNav } from "./_app";
import { Callout, Card, Icon, Button, Toast } from "@blueprintjs/core";
import ColorfulIcon from "../components/layout/ColorfulIcon";
import React from "react";

import styled from "@emotion/styled";
import Link from "next/link";
export default function index() {
  const { width } = useWindowSize();

  return (
    <>
      <div
        className="w-full flex p-0 text-left  justify-between"
        style={{
          background: "var(--sea-green)",
          overflowX: "clip",
        }}
      >
        <HeaderText
          className="flex flex-col p-10 text-left justify-between"
          style={{
            background: "var(--sea-green)",
          }}
        >
          <Logo src="logo-light.svg"></Logo>
          <div className="flex flex-col">
            <h1
              className={`text-white mt-2  text-${
                width < 800 ? 4 : width > 1000 ? (width > 1200 ? 5 : 4) : ""
              }xl`}
            >
              Wygeneruj pisma niezbędne w swoim postępowaniu spadkowym
            </h1>
            <p className="text-white text-lg mt-4">
              ...a także oblicz swój udział i zachowek
            </p>
          </div>
          <div className="flex flex-col mt-4">
            <p
              className={`text-${width > 1300 ? "base" : "xs"} text-white ${
                width > 800 ? width < 900 && "hidden" : ""
              } bg-white bg-opacity-20 p-2 rounded`}
            >
              Firma powstała przy wsparciu Google for Start-ups, Microsoft
              Polska oraz Apptension w ramach programu Akceleracyjnego
              TeenCrunch
            </p>
          </div>
        </HeaderText>
        <Suited src="/people.png" style={{ background: "var(--sea-green)" }} />
      </div>
      <div className="w-full flex flex-col items-center p-10 pb-2 text-center">
        <h1 className="w-full">
          <Icon
            className="inline-block mr-2"
            icon={"applications"}
            size={width > 800 ? 35 : 30}
          />
          Co oferujemy?
        </h1>
        <p className="text-sm">
          Udzielamy zarówno płatnych, jak i bezpłatnych usług.
        </p>
      </div>
      <div
        className="flex flex-wrap justify-center mb-4"
        style={{ width: "85%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Generation className="mt-4 p-4 mb-4 text-center rounded-lg text-white">
          <Icon
            className="inline-block mr-2"
            icon={"edit"}
            size={width > 800 ? 35 : 30}
            color={"white"}
          />
          GENERACJA PISM
        </Generation>
        <Item>
          <Icon
            icon="book"
            size={20}
            style={{ padding: 7 }}
            className="bg-blue-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Pozew o zachowek</h3>
            <p className="text-sm">
              Szybko wygeneruj dokładny pozew o zachowek i uratuj swoją
              należność po zmarłym.
            </p>
            <Link href="/pozew-o-zachowek" passHref>
              <a className="flex justify-start">
                <h4 className="bg-blue-100 p-1 rounded flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item>
        <Item>
          <Icon
            icon="add-location"
            size={20}
            style={{ padding: 7 }}
            className="bg-purple-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Oświadczenie o przyjęciu spadku</h3>
            <p className="text-sm">
              Natychmiastowo wygeneruj oświadczenie o przyjęciu spadku.
            </p>
            <Link href="/oswiadczenie-o-przyjeciu-spadku" passHref>
              <a className="flex justify-start">
                <h4 className="bg-blue-100 p-1 rounded flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item>
        <Item>
          <Icon
            icon="changes"
            size={20}
            style={{ padding: 7 }}
            className="bg-red-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Oświadczenie o odrzuceniu spadku</h3>
            <p className="text-sm">
              Natychmiastowo wygeneruj oświadczenie o odrzuceniu spadku.
            </p>
            <Link href="/oswiadczenie-o-odrzuceniu-spadku" passHref>
              <a className="flex justify-start">
                <h4 className="bg-blue-100 p-1 rounded flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item>

        <Item>
          <Icon
            icon="edit"
            size={20}
            style={{ padding: 7 }}
            className="bg-green-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">
              Wniosek o stwierdzenie nabycia praw do spadku
            </h3>
            <p className="text-xs text-gray-400">wg dziedziczenia ustawowego</p>
            <p className="text-sm">
              Wygeneruj wniosek o stwierdzenie nabycia praw do spadku, jeśli
              twój spadkodawca nie zostawił testamentu.
            </p>
            <Link
              href="/ustawowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku"
              passHref
            >
              <a className="flex justify-start">
                <h4 className="bg-blue-100 p-1 rounded flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item>
        <Item>
          <Icon
            icon="align-center"
            size={20}
            style={{ padding: 7 }}
            className="bg-yellow-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">
              Wniosek o stwierdzenie nabycia praw do spadku
            </h3>
            <p className="text-xs text-gray-400">
              wg dziedziczenia testamentowego
            </p>
            <p className="text-sm">
              Wygeneruj wniosek o stwierdzenie nabycia praw do spadku, jeśli
              twój spadkodawca zostawił testament.
            </p>
            <Link
              href="/testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku"
              passHref
            >
              <a className="flex justify-start">
                <h4 className="bg-blue-100 p-1 rounded flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item>

        <Item>
          <Icon
            icon="widget-button"
            size={20}
            style={{ padding: 7 }}
            className="bg-gray-600  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Wniosek o ustalenie działu spadku</h3>
            <p className="text-sm">
              Utwórz wniosek o ustalenie działu spadku, który pozwoli podzielić
              majątek między spadkobierców.
            </p>

            <p className="flex justify-start">
              <h4 className="bg-gray-300 p-1 rounded flex items-center text-sm mt-2 text-gray-500 cursor-not-allowed">
                JUŻ NIEDŁUGO
                <Icon className="inline-block ml-1" icon="lock" size={9} />
              </h4>
            </p>
          </div>
        </Item>
      </div>
      <div
        className="flex flex-wrap justify-center mb-4"
        style={{ width: "85%", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="w-full flex justify-center flex-col items-center">
          <Generation className="mt-4 p-4 mb-2 text-center rounded-lg text-white">
            <Icon
              className="inline-block mr-2"
              icon={"calculator"}
              size={width > 800 ? 35 : 30}
              color={"white"}
            />
            KALKULATORY
            <br />
          </Generation>
          <span
            className="text-base mb-2"
            style={{ color: "var(--sea-green)" }}
          >
            BEZPŁATNE
          </span>
        </div>
        <Item2>
          <Icon
            icon="many-to-many"
            size={20}
            style={{ padding: 7 }}
            className="bg-yellow-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Kalkulator zachowku</h3>
            <p className="text-sm">
              Dowiedz się, jaka kwota zachowku należy ci się, jeśli spadkodawca
              pominął Cię w testamencie.
            </p>
            <Link href="/kalkulator-zachowku" passHref>
              <a className="flex justify-start">
                <h4 className="bg-blue-100 p-1 rounded flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item2>
        <Item2>
          <Icon
            icon="calculator"
            size={20}
            style={{ padding: 7 }}
            className="bg-purple-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Kalkulator udziału w spadku</h3>
            <p className="text-sm">
              Dowiedz się, jaka część spadku w ułamku zwykłym przypada Ci, jeśli
              spadkodawca nie pozostawił testamentu.
            </p>
            <Link href="/kalkulator" passHref>
              <a className="flex justify-start">
                <h4 className="bg-blue-100 p-1 rounded flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item2>
      </div>
      <div className="w-full bg-white border-t border-b flex flex-col items-center p-10">
        <div className="w-full flex flex-col items-center  pb-2 text-center">
          <h1 className="w-full">
            <Icon
              className="inline-block mr-2"
              icon={"annotation"}
              size={width > 800 ? 35 : 30}
            />
            Dlaczego my?
          </h1>
          <p className="text-sm">Poznaj nasze zalety.</p>
          <div
            className="flex flex-wrap justify-center mb-4 text-left mt-4"
            style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Item3>
              <Icon
                icon="fast-forward"
                size={20}
                style={{ padding: 7 }}
                className="bg-red-400  rounded-md"
                color={"white"}
              />
              <div className="ml-4 pr-4 flex flex-col">
                <h3 className=" mb-1">Szybkość</h3>
                <p className="text-sm">
                  Wszystkie nasze usługi są natychmiastowe. Nie musisz się
                  martwić o to, kiedy otrzymasz pismo.
                </p>
              </div>
            </Item3>
            <Item3>
              <Icon
                icon="dollar"
                size={20}
                style={{ padding: 7 }}
                className="bg-green-400  rounded-md"
                color={"white"}
              />
              <div className="ml-4 pr-4 flex flex-col">
                <h3 className=" mb-1">Niska cena</h3>
                <p className="text-sm">
                  Nasze usługi są o wiele tańsze od wizyty u prawnika, a czasem
                  nawet darmowe.
                </p>
              </div>
            </Item3>
            <Item3>
              <Icon
                icon="book"
                size={20}
                style={{ padding: 7 }}
                className="bg-blue-400  rounded-md"
                color={"white"}
              />
              <div className="ml-4 pr-4 flex flex-col">
                <h3 className=" mb-1">Zdalność</h3>
                <p className="text-sm">
                  Wygeneruj pisma w dowolnym momencie bez wychodzenia z domu.
                </p>
              </div>
            </Item3>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center text-center p-0">
        <h1 className="w-full"></h1>
        <div
          className="flex flex-wrap justify-center mb-10 text-left"
          style={{ width: "85%", marginLeft: "auto", marginRight: "auto" }}
        >
          <Generation className="mt-8 p-4 mb-2 text-center rounded-lg text-white">
            <Icon
              className="inline-block mr-2"
              icon={"people"}
              size={width > 800 ? 35 : 30}
            />
            Nasi partnerzy
          </Generation>
          <Div className="flex justify-between items-center">
            <Item2 className="flex-1 h-full" style={{ marginLeft: 0 }}>
              <div className="flex p-4 h-full flex-col  justify-center items-center">
                <h1 className="w-full mb-1">Współpracujemy z prawnikami.</h1>
                <p className="text-sm">
                  Wszystkie nasze wzory pism oraz usługi są weryfikowane przez
                  prawników przed udostępnieniem ich naszym klientom.
                  Współpracujemy z{" "}
                  <b>kancelarią radcy prawnego Piotr Wojtowicz w Gdyni.</b>
                </p>
              </div>
            </Item2>
            <Radca className="h-full flex flex-col justify-center">
              <Mecenas
                src="mecenas.png"
                style={{
                  borderRadius: 10,
                }}
              />
              <p className="text-xs text-right italic mt-1">
                r.pr. Piotr Wojtowicz
              </p>
            </Radca>
          </Div>
        </div>
      </div>

      <div className="w-full p-3 flex flex-col bg-white border-t">
        <h4 className="w-full text-lg  text-center">
          <Icon
            className="inline-block mr-2 ml-2"
            icon={"envelope"}
            size={width > 800 ? 20 : 18}
          />
          mail@trustree.pl
        </h4>
      </div>
    </>
  );
}
const HeaderText = styled.div``;
const Suited = styled.img`
  height: 400px;
  min-height: 400px;
  align-self: end;
  padding: 20px;
  @media (max-width: 600px) {
    display: none;
  }
`;
const Mecenas = styled.img`
  width: 200px;

  @media (max-width: 1000px) {
    width: 150px;
  }
  @media (max-width: 600px) {
  }
`;
const Div = styled.div`
  width: 85%;
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 85%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 25%;
  @media (max-width: 1200px) {
    width: 40%;
  }
  margin-bottom: 30px;
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 40%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }

  margin: 2%;
`;
const Item2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 40%;
  margin-bottom: 30px;
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 40%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }

  margin: 2%;
`;
const Item3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 75%;
  margin-bottom: 30px;

  @media (max-width: 1000px) {
    width: 100%;
  }

  margin: 2%;
`;
const Logo = styled.img`
  height: 100px;
  @media (min-width: 600px) {
    display: none;
  }
`;
const Generation = styled.h1`
  width: 85%;
  background: var(--medium-sea-green);
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 85%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Radca = styled.div`
  @media (max-width: 450px) {
    align-self: flex-end;
    height: auto;
    margin-bottom: 20px;
    padding-right: 10px;
  }
`;

const Paragraph = ({ children, ...props }) => <p {...props}>{children}</p>;
