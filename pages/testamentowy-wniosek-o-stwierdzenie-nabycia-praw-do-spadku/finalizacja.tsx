import { Button, Callout, Divider, Icon } from "@blueprintjs/core";
import React from "react";
import {
  getRelation,
  OtherHereditariesRenderer,
} from "../../components/wniosek/OtherHereditariesRenderer";
import { CardForm } from "../kalkulator";
import { useRouter } from "next/dist/client/router";
import ColorfulIcon from "../../components/layout/ColorfulIcon";
import PaymentForm from "../../components/stripe/PaymentForm";

export async function getServerSideProps({ query }) {
  try {
    query.otherHereditaries = JSON.parse(query.otherHereditaries);

    return {
      props: {
        data: query,
      },
    };
  } catch {
    return {
      props: {
        data: null,
      },
    };
  }
}

export default function Finalizacja({ data }) {
  const router = useRouter();
  React.useEffect(() => {
    if (!data) {
      router.push("/ustawowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku");
    }
  }, []);
  return data ? (
    <>
      <h1 className="text-3xl ">
        Upewnij się, że wprowadzone dane są poprawne.
      </h1>
      <p className="text-sm">
        Wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia
        testamentowego
      </p>
      <Callout intent="primary" className="mt-6">
        Wykonanie tego pisma kosztuje:
        <ul className="list-disc list-inside">
          <li>
            <b>61,50zł</b>, jeśli jesteś jedynym spadkobiercą
          </li>
          <li>
            <b>123,00zł</b>, jeśli jest więcej spadkobierców
          </li>
        </ul>
      </Callout>
      <CardForm>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="122, 182, 100"
            icon={"document"}
            style={{ marginRight: 7 }}
          />{" "}
          Twoje dane
        </h2>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div>
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="envelope" className="mr-2" size={12} /> Adres e-mail:{" "}
            </div>
            <span className="w-full text-base">{data.email}</span>
          </div>

          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              Imię i nazwisko <Icon icon="person" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">{data.name}</span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="office" className="mr-2" size={12} /> Adres:{" "}
            </div>
            <span className="w-full text-base">
              {data.street + ", " + data.postal + " " + data.city}
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              Udział w spadku{" "}
              <Icon icon="pie-chart" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.share || "całość"}
            </span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="people" className="mr-2" size={12} />
              Kim był zmarły wobec Ciebie?
            </div>
            <span className="w-full text-base">
              {getRelation(data.relation)}
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              Twoja płeć <Icon icon="one-to-many" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.gender == 0 ? "mężczyzna" : "kobieta"}
            </span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="document" className="mr-2" size={12} /> Forma
              przyjęcia spadku:
            </div>
            <span className="w-full text-base">
              {data.forma == 0
                ? "przyjęcie proste"
                : "przyjęcie z dobrodziejstwem inwentarza"}
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              dowód pokrewieństwa
              <Icon icon="document-share" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.actType == 0
                ? "odpis skrócony aktu małżeństwa"
                : "odpis skrócony aktu urodzenia"}
            </span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="w-full uppercase text-xs flex items-center">
          <Icon icon="numerical" className="mr-2" size={12} /> numer pesel:
        </div>
        <span className="w-full text-base">{data.pesel}</span>
        <h3 className="w-full flex items-center mt-6">
          <ColorfulIcon
            icon={"document"}
            color="21,37,200"
            size={14}
            style={{ marginRight: 10 }}
          />
          Dane {data.relation == 3 ? "" : "twojego "} skróconego odpisu aktu{" "}
          {data.actType == 0 || data.relation == 1 ? "małżeństwa" : "urodzenia"}{" "}
          {data.relation == 3 ? "zmarłego" : ""}
        </h3>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="office" className="mr-2" size={12} /> nazwa urzędu stanu
            cywilnego:{" "}
          </p>
          <span>{data.actUscName}</span>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="numerical" className="mr-2" size={12} /> numer odpisu
            skróconego aktu:
          </p>
          <span>{data.actNumber}</span>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="calendar" className="mr-2" size={12} /> data{" "}
            {data.actType == 0 || data.relation == 1
              ? "zawarcia małżeństwa"
              : "urodzenia"}
            :
          </p>
          <span>{new Date(data.actDate).toLocaleDateString("pl-PL")}</span>
        </div>
      </CardForm>

      <Callout intent="warning" className="mt-8">
        Jeśli wypełniłeś formularz wadliwymi danymi i zakupisz pismo, nie będzie
        możliwości jego edycji!
      </Callout>
      <CardForm>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="182, 122, 220"
            icon={"person"}
            style={{ marginRight: 7 }}
          />{" "}
          Dane zmarłego
        </h2>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div>
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="person" className="mr-2" size={12} /> Imię i nazwisko:{" "}
            </div>
            <span className="w-full text-base">{data.deadName}</span>
          </div>

          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              ostatni adres: <Icon icon="envelope" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.deadAddress}
            </span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div>
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="calendar" className="mr-2" size={12} /> data śmierci:{" "}
            </div>
            <span className="w-full text-base">
              {new Date(data.deadDate).toLocaleDateString("pl-PL")}
            </span>
          </div>

          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              miejscowość śmierci:{" "}
              <Icon icon="office" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">{data.deadCity}</span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div>
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="one-to-many" className="mr-2" size={12} /> płeć:{" "}
            </div>
            <span className="w-full text-base">
              {data.deadGender == 0 ? "mężczyzna" : "kobieta"}
            </span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <h3 className="w-full flex items-center mt-6">
          <ColorfulIcon
            icon={"document"}
            color="150,12,70"
            size={14}
            style={{ marginRight: 10 }}
          />
          Dane skróconego odpisu aktu zgonu zmarłego
        </h3>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="office" className="mr-2" size={12} /> nazwa urzędu stanu
            cywilnego:{" "}
          </p>
          <span>{data.deadActUscName}</span>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="numerical" className="mr-2" size={12} /> numer odpisu
            skróconego aktu:
          </p>
          <span>{data.deadActNumber}</span>
        </div>
      </CardForm>
      {data.share && data.otherHereditaries.length ? (
        <CardForm>
          <h2 className="flex items-center w-full  text-2xl mb-0">
            <ColorfulIcon
              size={18}
              color="12, 122, 220"
              icon={"people"}
              style={{ marginRight: 7 }}
            />{" "}
            Inni spadkobiercy
          </h2>
          <OtherHereditariesRenderer
            otherHereditaries={data.otherHereditaries}
            setValue={() => {}}
            readonly
          />
        </CardForm>
      ) : null}
      <CardForm>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="69, 122, 15"
            icon={"take-action"}
            style={{ marginRight: 7 }}
          />{" "}
          Dane sądu
        </h2>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="office" className="mr-2" size={12} /> nazwa sądu:
          </p>
          <span>{data.courtName}</span>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="envelope" className="mr-2" size={12} /> adres sądu:
          </p>
          <span>{data.courtAddress}</span>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex flex-col w-full">
          <p className="flex items-center uppercase text-xs">
            <Icon icon="numerical" className="mr-2" size={12} /> numer wydziału
            cywilnego sądu:
          </p>
          <span>{data.courtNumber}</span>
        </div>
      </CardForm>
      <CardForm className="mb-10" style={{ minHeight: 0 }}>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="256, 122, 15"
            icon={"edit"}
            style={{ marginRight: 7 }}
          />{" "}
          Testament
        </h2>
        <Divider className="w-full mt-4 mb-4" />

        <div className="flex justify-between w-full">
          <div>
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="calendar" className="mr-2" size={12} /> data spisania:{" "}
            </div>
            <span className="w-full text-base">
              {new Date(data.testamentDate).toLocaleDateString("pl-PL")}
            </span>
          </div>

          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              potwierdzony notarialnie?{" "}
              <Icon icon="envelope" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.testamentNotarial == "true" ? "tak" : "nie"}
            </span>
          </div>
        </div>
        {data.testamentNotarial == "true" ? (
          <>
            <Divider className="w-full mt-4 mb-4" />
            <h3 className="w-full flex items-center mt-6">
              <ColorfulIcon
                icon={"document"}
                color="21,37,200"
                size={14}
                style={{ marginRight: 10 }}
              />
              Dane aktu notarialnego testamentu
            </h3>
            <Divider className="w-full mt-4 mb-4" />

            <div className="flex flex-col w-full">
              <p className="flex items-center uppercase text-xs">
                <Icon icon="person" className="mr-2" size={12} /> imię i
                nazwisko notariusza:
              </p>
              <span>{data.testamentNotarialName}</span>
            </div>
            <Divider className="w-full mt-4 mb-4" />
            <div className="flex flex-col w-full">
              <p className="flex items-center uppercase text-xs">
                <Icon icon="office" className="mr-2" size={12} /> miejscowośc
                kancelarii:
              </p>
              <span>{data.testamentNotarialCity}</span>
            </div>
            <Divider className="w-full mt-4 mb-4" />
            <div className="flex flex-col w-full">
              <p className="flex items-center uppercase text-xs">
                <Icon icon="book" className="mr-2" size={12} /> repozytorium
                aktu:
              </p>
              <span>{data.testamentNotarialRepository}</span>
            </div>
            <Divider className="w-full mt-4 mb-4" />
            <div className="flex flex-col w-full">
              <p className="flex items-center uppercase text-xs">
                <Icon icon="numerical" className="mr-2" size={12} /> numer aktu:
              </p>
              <span>{data.testamentNotarialNumber}</span>
            </div>
          </>
        ) : null}
      </CardForm>
      <PaymentForm
        metadata={Object.assign({ docId: 5 }, data)}
        title="Wykonanie pisma"
        subtitle="Wniosek o stwierdzenie nabycia praw do spadku"
        price={data.otherHereditaries.length ? "123,00" : "61,50"}
      />
    </>
  ) : null;
}
