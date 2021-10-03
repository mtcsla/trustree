import styled from "@emotion/styled";
import { Icon } from "@blueprintjs/core";
import { useNav } from "./_app";
export default function index() {
  const { setNavExtended } = useNav();
  return (
    <Body>
      <Header>
        <Nav className="rounded">
          <Icon
            icon="menu"
            color="white"
            size={30}
            onClick={() => setNavExtended(true)}
          />
        </Nav>
        <span
          style={{ background: "var(--sea-green)" }}
          className="p-3 rounded flex flex-col"
        >
          <div className="flex items-center">
            <Logo src="/logo-light.svg" />
            <h1 className="text-white text-6xl ml-2">Trustree</h1>
          </div>
          <p className="mt-4 text-white text-lg">
            Wygeneruj pisma niezbędne w swojej sprawie spadkowej.
          </p>
        </span>
      </Header>
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--layout-bg);
  display: flex;
  flex-direction: column;
`;
const Nav = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 30px;
  background: var(--sea-green);
`;
const Logo = styled.img`
  @media (max-width: 600px) {
    width: 70px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  padding: 35px;
  padding-top: 0px;

  width: 100%;
  background-color: var(--medium-sea-green);
  @media (max-width: 600px) {
    padding: 20px;
    padding-top: 0px;
  }
`;
