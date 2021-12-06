import { Button, Card } from "@blueprintjs/core";
import styled from "@emotion/styled";
import Link from "next/link";
import { useWindowSize } from "../hooks/windowSize";

export const getServerSideProps = ({ query }) => {
  return { props: query };
};
export default function Zaplacono(props) {
  const { width } = useWindowSize();
  return (
    <>
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
              Dziękujemy za skorzystanie z naszych usług!
            </h1>
            <p className="text-white text-xs text-right">
              zakupiono: <b>{determineName({ docId: props.id })}</b>
            </p>
          </div>
        </HeaderText>
        <img src="logo.svg" className="mr-4 ml-4" alt="Logo firmy Trustree." />
      </Header>
      <Card className="mt-8 flex">
        <div className="flex-col flex">
          <h1 className="font-bold">Twoja płatność powiodła się.</h1>
          <p>Niedługo otrzymasz pismo na swój adres e-mail.</p>
        </div>
        <div className="flex-1 ml-4 bg-gray-100"></div>
      </Card>
      <Link href="/">
        <Button icon="caret-left" intent="primary" className="mt-8 p-4 w-full">
          STRONA GŁÓWNA
        </Button>
      </Link>
    </>
  );
}

const Header = styled.div`
  padding: 30px;
  @media (max-width: 1000px) {
    padding: 20px;
  }
`;
const HeaderText = styled.div``;

export const determineName = ({ docId }) => {
  if (typeof docId == "string") docId = parseInt(docId);

  switch (docId) {
    case 0:
      return "oświadczenie o odrzuceniu spadku";
    case 1:
      return "oświadczenie o przyjęciu spadku";
    case 2:
      return "pozew o zachowek";
    case 3:
      return "wniosek o ustalenie działu spadku";
    case 4:
      return "wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia ustawowego";
    case 5:
      return "wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia testamentowego";
  }
};
