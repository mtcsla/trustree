import { Icon } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { SocialIcon } from "react-social-icons";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../components/firebase/firebaseAuth";
import Header from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import "../globals.css";
import Head from "next/head";
import { useOnClickOutside } from "../hooks/onClickOutside";
import { useWindowSize } from "../hooks/windowSize";
import Link from "next/link";

const navContext = React.createContext<any>({});
export const useNav = () => React.useContext(navContext);

export default function App({ Component, pageProps }) {
  const [navExtended, setNavExtended] = React.useState(false);
  const navContextValue = { navExtended, setNavExtended };
  const navRef = React.useRef<HTMLDivElement>(null);
  const windowWidth = useWindowSize().width;

  const router = useRouter();

  useOnClickOutside(navRef, () => setNavExtended(false));

  React.useEffect(() => setNavExtended(false), [windowWidth]);
  React.useEffect(() => setNavExtended(false), [router.pathname]);

  return (
    <navContext.Provider value={navContextValue}>
      <AuthProvider>
        <Head>
          <title>Trustree | serwis z pismami sądowymi</title>
        </Head>
        <Link href="/blog">
          <TopHeader
            className="fixed flex justify-center text-center p-2"
            style={{
              alignItems: "center",
              zIndex: 100,
              color: "white",
              left: 0,
              right: 0,
              top: 0,
            }}
          >
            <p style={{ fontSize: windowWidth > 800 ? 14 : 10 }}>
              Potrzebujesz pomocy? Przeczytaj posty na naszym blogu!
            </p>
          </TopHeader>
        </Link>
        <NavigationBar>
          <Icon icon="menu" size={30} onClick={() => setNavExtended(true)} />
          <div className="flex items-center ">
            <img
              src="/logo-light.svg"
              style={{
                height: 60,
                paddingRight: 5,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <div className="flex flex-col justify-center h-full">
              <h1
                className="text-4xl "
                style={{ marginTop: 7, lineHeight: 0.8 }}
              >
                Trustree
              </h1>
              <a style={{ fontSize: 10 }} className="text-gray-500 text-xs">
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
              href="https://www.facebook.com/Trustree.fb"
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
              href="https://www.facebook.com/Trustree.fb"
              bgColor="rgba(0, 0, 0, 0)"
              fgColor="rgba(0, 0, 0, 1)"
            />
          </div>
        </NavigationBar>
        <Wrapper className="flex h-full" style={{ overflowY: "visible" }}>
          <Navigation
            ref={navRef}
            shown={navExtended}
            className="flex flex-col justify-start h-full fixed select-none"
          >
            <Header />

            <Nav />
            <div
              className="flex justify-between items-center"
              style={{ paddingBottom: 40 }}
            >
              <p className="flex text-xs items-center text-gray-600 m-6 ">
                Trustree © 2021
              </p>
            </div>
          </Navigation>

          <Body
            pathname={router.pathname}
            className={router.pathname != "/" && "p-10"}
            style={{
              height: "100%",
              overflowY: "visible",
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
  z-index: 10;

  @media (max-width: 800px) {
    transition: width 200ms ease-in-out, padding-left 200ms ease-in-out;
    top: 35px;
    white-space: nowrap;

    min-width: 0px;
    ${(props) =>
      !props.shown
        ? `
    border: none;
    width: 0px;
    padding-left: 0;`
        : `
        width: 300px;
      `}
  }

  background: #fff;
`;

const MainPageNav = styled.div<Shown>`
  border-right: 1px solid var(--border-color);
  width: 300px;
  min-width: 300px;
  top: 70px;
  @media (min-width: 800px) {
    top: 90px;
  }
  height: calc(100vh - 70px);
  @media (min-width: 800px) {
    height: calc(100vh - 90px);
  }
  overflow-y: scroll;
  overflow-x: hidden;

  box-sizing: content-box;
  z-index: 10;

  transition: width 200ms ease-in-out, padding-left 200ms ease-in-out;

  white-space: nowrap !important;
  min-width: 0px;
  ${(props) =>
    !props.shown
      ? `
      border-right: none;
    width: 0px;
    padding-left: 0;`
      : `
        width: 300px;
      `}

  background: #fff;
`;

const NavigationBar = styled.div`
  @media (min-width: 800px) {
    display: none;
  }
  border-bottom: 1px solid var(--border-color);
  background: white;
  z-index: 5;
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

interface Pathname {
  pathname?: string;
}
const Body = styled.div<Pathname>`
  margin-left: calc(300px + 5%);
  @media (max-width: 800px) {
    margin: 0;
    padding: ${({ pathname }) => (pathname === "/" ? 0 : "25px")};
  }
`;

const Wrapper = styled.div`
  margin-top: 40px;
  @media (max-width: 800px) {
    margin-top: 115px;
  }
`;

const TopHeader = styled.div`
  height: 40px;
  box-sizing: border-box;

  background: var(--medium-sea-green);
  @media (max-width: 800px) {
    height: 35px;
    font-size: 90%;
  }
  &:hover {
    background: var(--sea-green);
    cursor: pointer;
  }
`;
