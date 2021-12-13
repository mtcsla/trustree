import { Icon } from "@blueprintjs/core";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { useWindowSize } from "../hooks/windowSize";
export default function index() {
  const { width } = useWindowSize();

  const getFontSize = (width: number) => {
    if (width < 600) {
      return 4;
    }
    return 5;
  };

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
          className="flex flex-col p-10 pb-0 w-full text-left justify-center items-center"
          style={{
            background: "var(--sea-green)",
            border: "none",
          }}
        >
          <Logo src="logo-light.svg"></Logo>
          <div
            className="flex flex-col items-center"
            style={{ width: "85%", border: "none" }}
          >
            <h1
              className={`text-white mt-2 text-center text-${getFontSize(
                width
              )}xl`}
            >
              Rozwiąż swoją sprawę spadkową w
              <br />
              <b className="gradtext">pół godziny</b>.
            </h1>
            <p className="text-white text-lg mt-4 mb-8">
              Wygeneruj pismo dla swojego postępowania spadkowego, bądź oblicz,
              ile Ci się należy.
            </p>
            <img src="wniosek.png" style={{ width: "60%", backgroundColor: "white", padding: 40 }} />
          </div>
        </HeaderText>
        {/*<Suited src="/stock3.png" style={{ background: "var(--sea-green)" }} />*/}
      </div>
      <div className="w-full flex flex-col items-center p-10 pb-2 text-center">
        <h1 className="w-full">
          <Icon
            className="inline-block mr-2"
            icon={"applications"}
            size={width > 800 ? 37 : 32}
          />
          Co oferujemy?
        </h1>
        <p className="text-center">
          Zapoznaj się z naszym szerokim asortymentem usług.
        </p>
      </div>
      <div
        className="flex flex-wrap justify-center mb-4"
        style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="w-full flex justify-center flex-col items-center">
          <Generation className="mt-4 p-4 mb-2 text-center rounded-lg">
            <Icon
              className="inline-block mr-2 align-middle"
              icon={"calculator"}
              size={width > 800 ? 35 : 30}
            />
            KALKULATORY
            <br />
          </Generation>
          <span
            className="text-base mb-2 text-center"
            style={{ color: "var(--sea-green)" }}
          >
            SKORZYSTAJ Z NASZYCH <b>BEZPŁATNYCH</b> KALKULATORÓW
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
      <div
        className="flex flex-wrap justify-center mb-4"
        style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
      >
        <span
          className="text-base mb-2 uppercase text-center"
          style={{ color: "var(--sea-green)", maxWidth: "85%" }}
        >
          Sprawdziłeś, ile należy Ci się w spadku? Skorzystaj z naszych{" "}
          <b>tanich</b> usług i wykonaj swoje pismo w pół godziny
        </span>
        <Generation className="mt-4 p-4 mb-4 text-center rounded-lg">
          <Icon
            className="inline-block mr-2"
            icon={"edit"}
            size={width > 800 ? 38 : 33}
          />
          GENERACJA PISM
        </Generation>
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
            <p className="text-xs text-gray-400 mb-2">
              wg dziedziczenia ustawowego
            </p>
            <p className="text-sm">
              Wygeneruj wniosek o stwierdzenie nabycia praw do spadku, jeśli
              Twój spadkodawca nie zostawił testamentu.
            </p>
            <span className="mt-1 mb-1 text-base" style={{ fontWeight: 500 }}>
              już od <b>61,50zł</b>
            </span>
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
            <p className="text-xs text-gray-400 mb-2">
              wg dziedziczenia testamentowego
            </p>
            <p className="text-sm">
              Wygeneruj wniosek o stwierdzenie nabycia praw do spadku, jeśli
              Twój spadkodawca zostawił testament.
            </p>
            <span className="mt-1 mb-1 text-base" style={{ fontWeight: 500 }}>
              już od <b>61,50zł</b>
            </span>
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
            <span className="mt-1 mb-1 text-base" style={{ fontWeight: 500 }}>
              w cenie <b>369,00zł</b>
            </span>
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
            <span className="mt-1 mb-1 text-base" style={{ fontWeight: 500 }}>
              w cenie <b>24,60zł</b>
            </span>
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
            <span className="mt-1 mb-1 text-base" style={{ fontWeight: 500 }}>
              w cenie <b>24,60zł</b>
            </span>
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
                icon="dollar"
                size={20}
                style={{ padding: 7 }}
                className="bg-green-400  rounded-md"
                color={"white"}
              />
              <div className="ml-4 pr-4 flex flex-col">
                <h3 className=" mb-1">Niska cena</h3>
                <p className="text-sm">
                  Zaoszczędź swoje pieniądze: nasze usługi są parokrotnie tańsze
                  od wizyt w kancelarii. Możesz za darmo wygenerować swój udział
                  w spadku, i za niewielką cenę natychmiastowo wygenerować
                  niezbędną umowę.
                </p>
              </div>
            </Item3>
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
                  Zaoszczędź swój czas: wygeneruj niezbędne pismo w pół godziny.
                  Przystępnie wypełnij niezbędne dane i otrzymaj swoje pismo
                  natychmiastowo.
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
                  Zaoszczędź sobie trudu: nasza usługa dostępna jest z dowolnego
                  miejsca na świecie. Przygotuj tylko dokumenty, które akurat są
                  potrzebne; utworzeniem pisma zajmiemy się my.
                </p>
              </div>
            </Item3>
          </div>
        </div>
      </div>
      <div className="p-10 flex justify-between flex-wrap-reverse items-center">
        <iframe
          className="ml-auto mr-auto"
          width={width < 800 ? "240" : "400"}
          height={width < 800 ? "150" : "250"}
          src="https://www.youtube.com/embed/SsiAoF-VYy4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div
          className="flex flex-col pl-10 pr-10 flex-1"
          style={{ minWidth: 240 }}
        >
          <h1 className="text-center text-5xl mb-4 mt-6">
            Bardzo <b className="gradtext">prosty</b> proces
          </h1>
          <p className="mb-6">
            Wykonanie pisma w Trustree nie wymaga żadnej znajomości prawa. Po
            prostu wypełnij formularz, który ci udostępniamy, a my wykonamy za
            Ciebie pismo. Obejrzyj film, aby dowiedzieć się więcej.
          </p>
        </div>
      </div>
      <div
        className="w-full flex flex-col items-center text-center text-white p-0"
        style={{ background: "var(--medium-sea-green)" }}
      >
        <h1 className="w-full"></h1>
        <div className="flex flex-wrap justify-center text-left w-full pl-10 pr-10 pt-10">
          {/*<Generation
            className="mt-8 p-4 mb-2 text-center rounded-lg text-black"
            style={{ background: "var(--layout-bg)" }}
          >
            <Icon
              className="inline-block mr-2"
              icon={"people"}
              size={width > 800 ? 35 : 30}
            />
            Nasi partnerzy
          </Generation>
          */}
          {width < 1000 ? (
            <h1 className="w-full mb-1 text-4xl">
              Oferujemy Ci usługi najwyższej jakości.
            </h1>
          ) : null}

          <Div className="flex justify-between items-center mb-4 mt-4">
            <Item2 className="flex-1 h-full w-full" style={{ marginLeft: 0 }}>
              <div className="flex pr-4 h-full flex-col flex-1 justify-center items-center">
                {width >= 1000 ? (
                  <h1 className="w-full mb-1 text-4xl">
                    Oferujemy Ci usługi najwyższej jakości.
                  </h1>
                ) : null}
                <p className={"text-sm"}>
                  Wszystkie nasze wzory pism oraz usługi są weryfikowane przez
                  prawników przed udostępnieniem ich naszym klientom.
                  Współpracujemy już z dwoma kancelariami prawnymi, które
                  zapewnią najwyższą jakość Twojego pisma.
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
              <MecenasText className="text-xs text-right italic mt-1 w-full">
                r.pr. Piotr Wojtowicz
              </MecenasText>
            </Radca>
          </Div>

          <div className="flex flex-col w-full">
            <p
              className={`text-${width > 1300 ? "base" : "xs"
                } text-white  w-full bg-white bg-opacity-20 p-4 rounded-t`}
            >
              Usługa powstała w ramach programu akceleracyjnego TeenCrunch,
              dzięki warsztatowemu wsparciu Google for Start-ups, Microsoft
              Polska oraz Apptension.
            </p>
          </div>
        </div>
      </div>

      {/*<div
      className="w-full p-1 flex justify-around items-center flex-wrap text-white"
        style={{ background: "var(--sea-green)" }}
      >
        <a
          className="text-sm  text-center ml-2 mr-2"
          href="https://facebook.com/Trustree.fb"
        >
          <Facebook
            className="inline-block mr-1 ml-1"
            size={width > 800 ? 18 : 15}
          />
          Facebook
        </a>
        <p className="text-sm  text-center ml-2 mr-2">
          <Icon
            className="inline-block mr-1 ml-1"
            icon={"envelope"}
            size={width > 800 ? 18 : 15}
          />
          mail@trustree.pl
        </p>
        <a
          href="https://www.instagram.com/trustree.ig/"
          className="text-sm  text-center ml-2 mr-2"
        >
          <Instagram
            className="inline-block mr-1 ml-1"
            size={width > 800 ? 18 : 15}
          />
          Instagram
        </a>
          </div>*/}
    </>
  );
}
const HeaderText = styled.div``;

const Mecenas = styled.img`
  width: 200px;

  @media (max-width: 1000px) {
    width: 150px;
  }
  @media (max-width: 600px) {
    width: 60px;
  }
`;
const MecenasText = styled.p`
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
const Div = styled.div`
  width: 100%;
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

const Video = styled.video`
  @media (max-width: 1200px) {
    width: 100% !important;
  }
  transform: translateY(1px);
  border: none;
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
  height: 150px;
  @media (max-width: 800px) {
    height: 100px;
  }
}
`;
const Generation = styled.h1`
  width: 85%;
  color: white !important;
  background: var(--medium-sea-green-opacity);
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
