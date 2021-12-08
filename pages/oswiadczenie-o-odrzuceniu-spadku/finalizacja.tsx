import { Button, Callout, Divider, Icon } from "@blueprintjs/core";
import React from "react";
import {
  getRelation,
  OtherHereditariesRenderer,
} from "../../components/oswiadczenie/OtherHereditariesRenderer";
import { CardForm } from "../kalkulator";
import { useRouter } from "next/dist/client/router";
import ColorfulIcon from "../../components/layout/ColorfulIcon";
import PaymentForm from "../../components/stripe/PaymentForm";
import { Stepper } from "../testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku";
import YoullGetMail from "../../components/YoullGetMail";

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
      router.push("/oswiadczenie-o-odrzuceniu-spadku");
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
      <h1 className="text-3xl font-bold">
        Upewnij się, że wprowadzone dane są poprawne.
      </h1>
      <p className="text-sm">Oświadczenie o odrzuceniu spadku</p>
      <CardForm className="flex items-start " style={{ minHeight: 0 }}>
        <h2 className="flex items-center w-full font-bold text-2xl mb-0">
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
          <div className="flex flex-col pl-2 items-end">
            <div className="w-full uppercase text-xs text-right flex flex-row-reverse items-center">
              <Icon icon="people" className="ml-2" size={12} />
              Kim był zmarły wobec Ciebie?
            </div>
            <span className="w-full text-base text-right">
              {getRelation(data.relation)}
            </span>
          </div>
        </div>
        <Divider className="w-full mt-4 mb-4" />
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <div>
              <div className="w-full uppercase text-xs flex items-center">
                <Icon icon="one-to-many" className="mr-2" size={12} /> płeć:{" "}
              </div>
              <span className="w-full text-base">
                {data.deadGender == 0 ? "mężczyzna" : "kobieta"}
              </span>
            </div>
          </div>
        </div>
      </CardForm>
      <Callout intent="warning" className="mt-8">
        Po zakupieniu pisma, nie będziesz mieć opcji zmiany danych w formularzu.
      </Callout>
      <CardForm>
        <h2 className="flex items-center w-full font-bold text-2xl mb-0">
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
        <Divider className="w-full mt-4 mb-4" />

        <h3 className="w-full flex items-center mt-6">
          <ColorfulIcon
            icon={"document"}
            color="220,150,70"
            size={14}
            style={{ marginRight: 10 }}
          />
          Dane testamentu
        </h3>
        <Divider className="w-full mt-4 mb-4" />

        {data.testament == 1 ? (
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="w-full uppercase text-xs flex items-center">
                <Icon icon="calendar" className="mr-2" size={12} /> data
                spisania:{" "}
              </div>
              <span className="w-full text-base">
                {new Date(data.testamentDate).toLocaleDateString("pl-PL")}
              </span>
            </div>
          </div>
        ) : null}
      </CardForm>
      <CardForm className="flex items-start " style={{ minHeight: 0 }}>
        <h2 className="flex items-center w-full font-bold text-2xl mb-0">
          <ColorfulIcon
            size={18}
            color="12, 122, 220"
            icon={"people"}
            style={{ marginRight: 7 }}
          />{" "}
          Inni spadkobiercy
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
      <CardForm className="mb-10">
        <h2 className="flex items-center w-full font-bold text-2xl mb-0">
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
      </CardForm>{" "}
      <Callout intent="primary" className="mt-6">
        Wykonanie tego pisma kosztuje <b>24,60zł</b>.
      </Callout>
      <PaymentForm
        title="Wykonanie pisma"
        subtitle="Oświadczenie o odrzuceniu spadku"
        price={"24,60"}
        metadata={Object.assign({ docId: 0 }, data)}
      />
    </>
  ) : null;
}
