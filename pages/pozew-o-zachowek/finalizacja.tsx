import { Button, Callout, Divider, Icon } from "@blueprintjs/core";
import React from "react";
import {
  getRelation,
  OtherHereditariesRenderer,
} from "../../components/pozew-o-zachowek/OtherHereditariesRenderer";
import { CardForm } from "../kalkulator";
import { useRouter } from "next/dist/client/router";
import ColorfulIcon from "../../components/layout/ColorfulIcon";
import PaymentForm from "../../components/stripe/PaymentForm";
import { ImmovablesRenderer } from "../../components/pozew-o-zachowek/ImmovablesRenderer";
import { MovablesRenderer } from "../../components/pozew-o-zachowek/MovablesRenderer";
import { GrantsRenderer } from "../../components/pozew-o-zachowek/GrantsRenderer";
import { Stepper } from "../testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku";
import YoullGetMail from "../../components/YoullGetMail";

export async function getServerSideProps({ query }) {
  try {
    query.otherHereditaries = JSON.parse(query.otherHereditaries);
    query.immovables = JSON.parse(query.immovables);
    query.movables = JSON.parse(query.movables);
    query.grants = JSON.parse(query.grants);

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
      router.push("/pozew-o-zachowek");
    }
  }, []);
  return data ? (
    <>
      <Stepper
        nOfSteps={3}
        currentStep={3}
        message={"zweryfikuj dane i kup pismo"}
      />
      <YoullGetMail />
      <h1 className="text-3xl ">
        Upewnij się, że wprowadzone dane są poprawne.
      </h1>
      <p className="text-sm">
        Wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia
        testamentowego
      </p>

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
              <Icon icon="document" className="mr-2" size={12} /> CZY PODJĘTO
              PRÓBĘ MEDIACJI?
            </div>
            <span className="w-full text-base">
              {data.mediation == 0 ? "nie" : "tak"}
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              czy zgłoszono zarzut nieważności testamentu?
              <Icon icon="document-share" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.invalid == 0 ? "nie" : "tak"}
            </span>
          </div>
        </div>

        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="numerical" className="mr-2" size={12} /> numer pesel:
            </div>
            <span className="w-full text-base">{data.pesel}</span>{" "}
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
      <CardForm style={{ minWidth: 0 }}>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="122, 182, 100"
            icon={"take-action"}
            style={{ marginRight: 7 }}
          />{" "}
          Decyzja sądu
        </h2>
        <Divider className="w-full mt-4 mb-4" />

        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <div className="w-full uppercase text-xs flex items-center">
              <Icon icon="home" className="mr-2" size={12} /> nazwa sądu:
            </div>
            <span className="w-full text-base">{data.rulingCourtName}</span>{" "}
          </div>
          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              numer wydziału cywilnego:
              <Icon icon="document-share" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.rulingCourtNumber}
            </span>
          </div>
        </div>

        <Divider className="w-full mt-4 mb-4" />
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full">
            <p className="flex items-center uppercase text-xs">
              <Icon icon="calendar" className="mr-2" size={12} /> data wydania
              postanowienia:
            </p>
            <span>{new Date(data.rulingDate).toLocaleDateString("pl-PL")}</span>
          </div>

          <div className="flex flex-col pl-2">
            <div className="w-full uppercase text-xs flex items-center text-right justify-end">
              czy istnieje klauzula wykonalności?
              <Icon icon="document" className="ml-2" size={12} />
            </div>
            <span className="w-full text-base text-right">
              {data.rulingClosure == 0 ? "nie" : "tak"}
            </span>
          </div>
        </div>
        {data.rulingClosure == 1 ? (
          <>
            <Divider className="w-full mt-4 mb-4" />

            <div className="flex justify-between w-full">
              <div className="flex flex-col w-full">
                <p className="flex items-center uppercase text-xs">
                  <Icon icon="calendar" className="mr-2" size={12} /> data
                  wydania klauzuli:
                </p>
                <span>
                  {new Date(data.rulingClosureDate).toLocaleDateString("pl-PL")}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </CardForm>

      <Callout intent="warning" className="mt-8">
        Po zakupieniu pisma, nie będziesz mieć opcji zmiany danych w formularzu.
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

      <CardForm style={{ minHeight: 0 }}>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="12, 122, 220"
            icon={"people"}
            style={{ marginRight: 7 }}
          />{" "}
          Spadkobiercy testamentowi
        </h2>
        {data.otherHereditaries.length ? (
          <OtherHereditariesRenderer
            otherHereditaries={data.otherHereditaries}
            setValue={() => {}}
            readonly
          />
        ) : (
          <h1 className="w-full">BRAK</h1>
        )}
      </CardForm>
      <CardForm style={{ minHeight: 0 }}>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="12, 122, 220"
            icon={"home"}
            style={{ marginRight: 7 }}
          />{" "}
          Nieruchomości spadkodawcy
        </h2>
        {data.immovables.length ? (
          <ImmovablesRenderer
            immovables={data.immovables}
            setValue={() => {}}
            readonly
          />
        ) : (
          <h1 className="w-full">BRAK</h1>
        )}
      </CardForm>
      <CardForm style={{ minHeight: 0 }}>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="12, 122, 220"
            icon={"known-vehicle"}
            style={{ marginRight: 7 }}
          />{" "}
          Ruchomości spadkodawcy
        </h2>
        {data.movables.length ? (
          <MovablesRenderer
            movables={data.movables}
            setValue={() => {}}
            readonly
          />
        ) : (
          <h1 className="w-full">BRAK</h1>
        )}
      </CardForm>
      <CardForm style={{ minHeight: 0 }}>
        <h2 className="flex items-center w-full  text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="12, 122, 220"
            icon={"bank-account"}
            style={{ marginRight: 7 }}
          />{" "}
          Darowizny darowane pozwanym przez spadkodawcę
        </h2>
        {data.grants.length ? (
          <GrantsRenderer grants={data.grants} setValue={() => {}} readonly />
        ) : (
          <h1 className="w-full">BRAK</h1>
        )}
      </CardForm>

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
        </div>
      </CardForm>
      <Callout intent="primary" className="mt-6">
        Wykonanie tego pisma kosztuje <b>369,00zł</b>.
      </Callout>
      <PaymentForm
        metadata={Object.assign({ docId: 2 }, data)}
        title="Wykonanie pisma"
        subtitle="Pozew o zachowek"
        price={"369,00"}
      />
    </>
  ) : null;
}
