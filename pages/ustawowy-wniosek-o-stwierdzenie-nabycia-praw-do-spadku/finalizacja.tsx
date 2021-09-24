import { Button, Callout, Divider, Icon } from "@blueprintjs/core";
import React from "react";
import { getRelation } from "../../components/wniosek/OtherHereditariesRenderer";
import { CardForm } from "../kalkulator";
import { useRouter } from "next/dist/client/router";

export async function getServerSideProps({ query }) {
  try {
    let { data } = query;
    data = JSON.parse(data);

    console.log(data);
    return {
      props: {
        data,
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
  return (
    <>
      <h1 className="text-4xl font-bold">
        Wniosek o stwierdzenie nabycia praw do spadku
      </h1>
      <p className="text-sm">Upewnij się, że wprowadzone dane są poprawne.</p>
      <CardForm>
        <span className="w-full font-bold text-2xl mb-0">Twoje dane</span>
        <Divider className="w-full mt-4 mb-4" />
        <div className="w-full uppercase text-xs flex items-center">
          <Icon icon="envelope" className="mr-2" size={12} /> Adres e-mail:{" "}
        </div>
        <span className="w-full text-base">{data.email}</span> {/*dupa*/}
        <Divider className="w-full mt-4 mb-4" />
        <div className="w-full uppercase text-xs flex items-center">
          <Icon icon="person" className="mr-2" size={12} /> Imię i nazwisko:{" "}
        </div>
        <span className="w-full text-base">{data.name}</span>
        <Divider className="w-full mt-4 mb-4" />
        <div className="w-full uppercase text-xs flex items-center">
          <Icon icon="office" className="mr-2" size={12} /> Adres:{" "}
        </div>
        <span className="w-full text-base">
          {data.street + ", " + data.postal + " " + data.city}
        </span>
        <Divider className="w-full mt-4 mb-4" />
        <div className="w-full uppercase text-xs flex items-center">
          <Icon icon="pie-chart" className="mr-2" size={12} /> Udział w spadku:{" "}
        </div>
        <span className="w-full text-base">{data.share}</span>
        <Divider className="w-full mt-4 mb-4" />
        <div className="w-full uppercase text-xs flex items-center">
          <Icon icon="pie-chart" className="mr-2" size={12} /> Kim był zmarły
          wobec Ciebie?
        </div>
        <span className="w-full text-base">{getRelation(data.relation)}</span>
      </CardForm>
      <Callout intent="warning" className="mt-8">
        Jeśli wypełniłeś formularz wadliwymi danymi i zakupisz pismo, nie będzie
        możliwości jego edycji!
      </Callout>
      <CardForm />
      <Button intent="success" className="mt-8" rightIcon="caret-right" fill>
        PRZEJDŹ DO PŁATNOŚCI
      </Button>
    </>
  );
}
