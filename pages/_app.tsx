import "@blueprintjs/core/lib/css/blueprint.css";
import React from "react";
import "tailwindcss/tailwind.css";
import Header from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import "../globals.css";
import { AuthProvider } from "../components/firebase/firebaseAuth";
import styled from "@emotion/styled";
import { Icon } from "@blueprintjs/core";
import { SocialIcon } from "react-social-icons";
import { useOnClickOutside } from "../hooks/onClickOutside";
import { useWindowSize } from "../hooks/windowSize";

const navContext = React.createContext<any>({});
export const useNav = () => React.useContext(navContext);

export default function App({ Component, pageProps }) {
  const [navExtended, setNavExtended] = React.useState(false);
  const navContextValue = { navExtended, setNavExtended };
  const navRef = React.useRef<HTMLDivElement>(null);
  const windowWidth = useWindowSize().width;

  useOnClickOutside(navRef, () => setNavExtended(false));
  React.useEffect(() => setNavExtended(false), [windowWidth]);

  return (
    <navContext.Provider value={navContextValue}>
      <AuthProvider>
        <TopHeader
          className="fixed flex justify-center text-center"
          style={{
            padding: 2,
            alignItems: "center",
            zIndex: 100,
            color: "white",

            left: 0,
            right: 0,
            top: 0,
          }}
        >
          Potrzebujesz pomocy? Przeczytaj posty na naszym blogu!
        </TopHeader>
        <NavigationBar>
          <Icon icon="menu" size={30} onClick={() => setNavExtended(true)} />
          <div className="flex items-center ">
            <img
              src="logo-light.svg"
              style={{
                height: 60,
                paddingRight: 5,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <div className="flex flex-col justify-center h-full">
              <h1
                className="text-xl font-bold"
                style={{ marginTop: 7, lineHeight: 0.8 }}
              >
                Trustree
              </h1>
              <a style={{ fontSize: 10, marginLeft: 3, color: "var(--grey)" }}>
                Strona główna
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SocialIcon
              network="facebook"
              style={{
                height: 30,
                width: 30,
                background: "var(--border-color)",
                borderRadius: 5,
                padding: 3,
              }}
              bgColor="rgba(0, 0, 0, 0)"
              fgColor="rgba(0, 0, 0, 1)"
            />
            <SocialIcon
              network="instagram"
              style={{
                height: 30,
                width: 30,
                marginTop: 5,
                background: "var(--border-color)",
                borderRadius: 5,
                padding: 3,
              }}
              bgColor="rgba(0, 0, 0, 0)"
              fgColor="rgba(0, 0, 0, 1)"
            />
          </div>
        </NavigationBar>
        <Wrapper className="flex h-full" style={{ overflowY: "hidden" }}>
          <Navigation
            ref={navRef}
            shown={navExtended}
            className="flex flex-col justify-start h-full fixed"
          >
            <Header />

            <Nav />
            <div
              className="flex justify-between items-center"
              style={{ paddingBottom: 40 }}
            >
              <p className="text-xs text-gray-600 m-6 ">Trustree © 2021</p>
            </div>
          </Navigation>

          <Body
            className="p-10"
            style={{
              height: "100%",
              overflowY: "scroll",
              background: "var(--layout-bg)",
              flex: 1,
            }}
          >
            <Component {...pageProps} />
          </Body>
        </Wrapper>
      </AuthProvider>
    </navContext.Provider>
  );
}

interface Shown {
  shown: boolean;
}

const Navigation = styled.div<Shown>`
  border-right: 1px solid var(--border-color);
  width: 300px;
  min-width: 300px;
  padding-left: 5%;
  overflow-y: scroll;
  overflow-x: hidden;

  box-sizing: content-box;
  z-index: 2000;

  @media (max-width: 800px) {
    transition: width 500ms ease-in-out, padding-left 500ms ease-in-out;
    top: 35px;
    white-space: nowrap;
    min-width: 0px;
    ${(props) =>
      !props.shown
        ? `
    width: 0px;
    padding-left: 0;`
        : `
        width: 300px;
      `}
  }
  background: #fff;
`;

const NavigationBar = styled.div`
  @media (min-width: 800px) {
    display: none;
  }
  background: white;
  z-index: 20;
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  position: fixed;
  margin-top: 35px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  margin-left: calc(300px + 5%);
  @media (max-width: 800px) {
    padding-top: 30px;
    margin: 0;
    padding: 2%;
  }
`;

const Wrapper = styled.div`
  margin-top: 44px;
  @media (max-width: 800px) {
    margin-top: 115px;
  }
`;

const TopHeader = styled.div`
  height: 40px;
  background: mediumseagreen;
  @media (max-width: 800px) {
    height: 35px;
    font-size: 90%;
  }
  &:hover {
    background: seagreen;
    cursor: pointer;
  }
`;
