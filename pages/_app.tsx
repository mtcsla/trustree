import { Button, Card, Dialog, FormGroup, Icon, InputGroup, Portal, Spinner, TextArea, Callout } from '@blueprintjs/core';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/table/lib/css/table.css";
import styled from "@emotion/styled";
import { addDoc, collection } from "firebase/firestore";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import React from "react";
import {
  AiFillFacebook as Facebook, AiFillInstagram as Instagram
} from "react-icons/ai";
import "tailwindcss/tailwind.css";
import * as yup from 'yup';
import { db } from "../components/firebase/firebase";
import { AuthProvider } from "../components/firebase/firebaseAuth";
import Header from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import "../globals.css";
import { useOnClickOutside } from '../hooks/onClickOutside';
import { useWindowSize } from "../hooks/windowSize";
import useEffect from 'react';




const navContext = React.createContext<any>({});
export const useNav = () => React.useContext(navContext);

export default function App({ Component, pageProps }) {
  const [helpOpen, setHelpOpen] = React.useState(false);
  const [navExtended, setNavExtended] = React.useState(false);
  const [sent, setSent] = React.useState(false);


  const navContextValue = { navExtended, setNavExtended };
  const navRef = React.useRef<HTMLDivElement>(null);
  const windowWidth = useWindowSize().width;
  const router = useRouter();


  const { width } = useWindowSize();



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
        <Dialog isOpen={helpOpen} className="pb-0 m-2 z-50">
          <div className="w-full h-full p-4">
            <Ask {...{ setHelpOpen, sent, setSent }} />
          </div>
        </Dialog>

        <Portal>
          {width > 600 ? <Card elevation={4} className="fixed bottom-0 m-4 right-0 flex items-center bg-white p-3 rounded-lg">
            <div className="flex flex-col justify-center mr-4">
              <h5>Masz problem lub nie wiesz, co zrobić?</h5>
              <p className="text-xs text-right">Zadaj nam pytanie!</p>

            </div>
            <Question {...{ setHelpOpen, helpOpen, size: 30 }} />
          </Card>
            : <div className="fixed bottom-0 m-4 right-0 flex flex-col items-end ">
              <span className="mt-1 p-2 bg-white border rounded-md flex items-center">
                <h5 className="mr-2 font-semibold uppercase">Zadaj nam pytanie</h5>

                <Question {...{ setHelpOpen, size: 20, helpOpen }} />
              </span>
            </div>
          }
        </Portal>

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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-403721190" />
        <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: ` 
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-403721190');
          `
        }
        } />

        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W54J8X5"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>

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

const Question = ({ setHelpOpen, helpOpen, size }: { setHelpOpen: React.Dispatch<boolean>, size?: number, helpOpen: boolean }) => {
  return <div onClick={() => setHelpOpen(!helpOpen)} style={{ background: "var(--newGrad1)" }} className="cursor-pointer flex items-center justify-center p-1 rounded-full">
    <Icon icon="help" size={size || 42} color="white" />
  </div>
}

const Ask = ({ setHelpOpen, sent, setSent }) => {

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (sent)
      setTimeout(() => setHelpOpen(false), 2000);
  }, [])

  const schema = yup.object().shape({
    email: yup.string().email("To pole musi zawierać Twój adres e-mail.").required("To pole jest wymagane."),
    message: yup.string().required("To pole jest wymagane."),
  });

  const uploadQuestion = async (values) => {
    setLoading(true);
    await addDoc(collection(db, "questions"), { ...values, date: new Date() });
    setLoading(false);

    setSent(true);
    setTimeout(() => setHelpOpen(false), 2000);
  }

  return <div className="w-full flex flex-col">
    <div className="flex justify-between items-center">
      <div className="flex-col">
        <h3>Zadaj nam pytanie.</h3>
        <p className="text-xs">Postaramy się odpowiedzieć w ciągu 24 godzin wiadomością na twój adres e-mail.</p>
      </div>
      <img src="logo.svg" style={{ width: 50, marginLeft: 20 }} />
    </div>


    {sent ? <Callout intent="success" className='mt-4'><h3>Wysłano!</h3></Callout> :
      <Formik initialValues={{
        email: "",
        message: "",
      }} onSubmit={(values) => { uploadQuestion(values) }} validationSchema={schema} validateOnChange>
        {({ errors, touched, submitForm }) =>
          <>
            <FormGroup className="mt-3" label={
              <span className="flex items-center text-base">
                <Icon icon="envelope" className="mr-1 ml-1" size={14} /> twój adres e-mail:
              </span>
            }>
              <Field as={InputGroup} placeholder="np. jan.kowalski@mail.com" name="email" intent={touched.email && errors.email ? "danger" : "none"} className="mb-1" />
              <ErrorMessage name="email">{(message) => <p style={{ color: "var(--error-red)" }} className="text-sm">{message}</p>}</ErrorMessage>
            </FormGroup>
            <FormGroup className="mt-1" label={
              <span className="flex items-center text-base">
                <Icon icon="help" className="mr-1 ml-1" size={11} /> treść pytania:
              </span>
            }>
              <Field as={TextArea} name="message" className="w-full mb-1" style={{ minHeight: 150 }} />
              <ErrorMessage name="message">{(message) => <p className="text-sm" style={{ color: "var(--error-red)" }}>{message}</p>}</ErrorMessage>
            </FormGroup>
            <div className="flex w-full">
              <Button className="flex-1" icon="small-cross" intent="danger" onClick={() => setHelpOpen(false)}>ANULUJ</Button>
              <Button className="flex-1 ml-2" intent="success" disabled={loading} onClick={() => submitForm()}> {!loading ? "WYŚLIJ" : <Spinner size={15} />}</Button>
            </div>
          </>
        }

      </Formik>
    }
  </div>
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
