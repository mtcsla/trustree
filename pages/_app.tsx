import { Icon } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/table/lib/css/table.css";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  AiFillFacebook as Facebook, AiFillInstagram as Instagram
} from "react-icons/ai";
import "tailwindcss/tailwind.css";
import Script from "next/script";
import { AuthProvider } from "../components/firebase/firebaseAuth";
import Header from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import "../globals.css";
import { useOnClickOutside } from "../hooks/onClickOutside";
import { useWindowSize } from "../hooks/windowSize";



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
          <title>Trustree | szybkie i tanie usługi spadkowe</title>
          <meta
            name="description"
            content="Jesteśmy platformą umożliwiającą łatwe i
             tanie rozwiązanie sprawy spadkowej dzięki pełnej automatyzacji dokumentów 
             zweryfikowanej przez prawników."
          />
        </Head>

        <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W54J8X5');
            `
        }
        } />
        <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: ` 
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-403721190');
          `
        }
        } />

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W54J8X5"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>

        <NavigationBar>
          <Icon icon="menu" size={30} onClick={() => setNavExtended(true)} />
          <div className="flex items-center ">
            <Link href="/" passHref>
              <a>
                <img
                  alt="Logo firmy Trustree."
                  src="/logo-light.svg"
                  style={{
                    height: 60,
                    paddingRight: 5,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </a>
            </Link>
            <Link href="/" passHref>
              <a style={{ textDecoration: "none" }}>
                <div className="flex flex-col justify-center h-full">
                  <h1 className="text-4xl">Trustree</h1>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center mt-1">
              <a href="https://www.facebook.com/Trustree.fb">
                <Facebook size={30} color="#666" />
              </a>
              <a href="https://www.instagram.com/trustree.ig/" className="flex">
                <Instagram size={30} color="#666" />
              </a>
            </div>
          </div>
        </NavigationBar>
        <Wrapper className="flex h-full" style={{ overflowY: "visible" }}>
          <Navigation
            ref={navRef}
            id="scroll"
            shown={navExtended}
            className="flex flex-col justify-start h-full fixed select-none"
          >
            <Header />

            <Nav />
            <div
              className="flex justify-between items-center"
              style={{ paddingBottom: 10 }}
            >
              <p className="flex text-xs items-center text-gray-600 ml-6 mt-1 ">
                Trustree © 2021
              </p>
            </div>
          </Navigation>

          <Body
            pathname={router.pathname}
            className={router.pathname != "/" && "p-10"}
            id={router.pathname == "/" ? "front-page" : ""}
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
  overflow-y: auto;
  overflow-x: hidden;

  box-sizing: content-box;
  z-index: 10;
  height: 100vh;
  bottom: 0px;

  @media (max-width: 800px) {
    transition: width 200ms ease-in-out, padding-left 200ms ease-in-out;
    top: 0px;
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
  @media (max-width: 800px) {
    margin-top: 80px;
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
