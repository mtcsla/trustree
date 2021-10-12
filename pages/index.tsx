import { useWindowSize } from "../hooks/windowSize";
import { useNav } from "./_app";
import { Callout, Card, Icon, Button, Toast } from "@blueprintjs/core";
import ColorfulIcon from "../components/layout/ColorfulIcon";
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
export default function index() {
  const windowWidth = useWindowSize().width;
  const { setNavExtended, navExtended } = useNav();

  const { width } = useWindowSize();

  return (
    <>
      <div
        className="w-full flex flex-col items-center p-10 text-center"
        style={{ background: "var(--sea-green)" }}
      >
        <img src="/logo-light.svg" />
        <h1 className="text-white mt-2">
          Wygeneruj pisma niezbędne w swoim postępowaniu spadkowym
        </h1>
        <p className="text-white">...a także oblicz swój udział i zachowek</p>
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
        <p>Udzielamy zarówno płatnych, jak i bezpłatnych usług.</p>
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
            <p>
              Szybko wygeneruj dokładny pozew o zachowek i uratuj swoją
              należność po zmarłym.
            </p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
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
            <p>Natychmiastowo wygeneruj oświadczenie o przyjęciu spadku.</p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
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
            <p>Natychmiastowo wygeneruj oświadczenie o odrzuceniu spadku.</p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
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
            <p>
              Wygeneruj wniosek o stwierdzenie nabycia praw do spadku, jeśli
              twój spadkodawca nie zostawił testamentu.
            </p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
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
            <p>
              Wygeneruj wniosek o stwierdzenie nabycia praw do spadku, jeśli
              twój spadkodawca zostawił testament.
            </p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
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
            <p>
              Utwórz wniosek o ustalenie działu spadku, który pozwoli podzielić
              majątek między spadkobierców.
            </p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
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
            icon="book"
            size={20}
            style={{ padding: 7 }}
            className="bg-blue-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Kalkulator zachowku</h3>
            <p>
              Dowiedz się, jaka kwota zachowku należy ci się, jeśli spadkodawca
              pominął Cię w testamencie.
            </p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
                  SPRAWDŹ 
                  <Icon className="inline-block" icon="caret-right" />
                </h4>
              </a>
            </Link>
          </div>
        </Item2>
        <Item2>
          <Icon
            icon="add-location"
            size={20}
            style={{ padding: 7 }}
            className="bg-purple-400  rounded-md"
            color={"white"}
          />
          <div className="ml-4 pr-4 flex flex-col">
            <h3 className=" mb-1">Kalkulator udziału w spadku</h3>
            <p>
              Dowiedz się, jaka część spadku w ułamku zwykłym przypada Ci, jeśli
              spadkodawca nie pozostawił testamentu.
            </p>
            <Link href="/" passHref>
              <a>
                <h4 className="flex items-center text-sm mt-2 text-blue-500 cursor-pointer">
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
          <p>Poznaj nasze zalety.</p>
          <div
            className="flex flex-wrap justify-center mb-4 text-left mt-4"
            style={{ width: "85%", marginLeft: "auto", marginRight: "auto" }}
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
                <p>
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
                className="bg-blue-400  rounded-md"
                color={"white"}
              />
              <div className="ml-4 pr-4 flex flex-col">
                <h3 className=" mb-1">Niska cena</h3>
                <p>
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
                <p>
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
            <Item2
              className="flex-1 border  h-full bg-white"
              style={{ marginLeft: 0 }}
            >
              <div className="flex p-4 h-full flex-col justify-center">
                <h1 className=" mb-1">Współpracujemy z prawnikami.</h1>
                <p>
                  Wszystkie nasze wzory pism oraz usługi są weryfikowane przez
                  prawników przed udostępnieniem ich naszym klientom.
                  Współpracujemy z{" "}
                  <b>kancelarią radcy prawnego Piotr Wojtowicz w Gdyni.</b>
                </p>
              </div>
            </Item2>

            <Mecenas
              src="mecenas.jpg"
              style={{
                borderRadius: 10,
                alignSelf: "start",
                backgroundColor: "white",
              }}
            />
          </Div>
        </div>
      </div>

      <div
        className="w-full p-3 flex flex-col"
        style={{ background: "var(--sea-green)" }}
      >
        <p className="w-full text-lg text-white text-center">
          <Icon
            className="inline-block mr-2"
            icon={"envelope"}
            size={width > 800 ? 20 : 18}
          />
          mail@trustree.pl
        </p>
      </div>
    </>
  );
}

const Mecenas = styled.img`
  width: 200px;
  @media (max-width: 1000px) {
    width: 150px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    display: none;
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

const Paragraph = ({ children, ...props }) => <p {...props}>{children}</p>;
