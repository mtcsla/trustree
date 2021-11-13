import styled from "@emotion/styled";
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
              zakupiono: <b>{props.name}</b>
            </p>
          </div>
        </HeaderText>
        <img src="logo.svg" className="mr-4 ml-4" alt="Logo firmy Trustree." />
      </Header>
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
