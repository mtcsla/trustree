import React from "react";
import { toCanvas } from "html-to-image";

import jsPDF from "jspdf";
import dynamic from "next/dynamic";
import { Button, Card, Callout } from "@blueprintjs/core";
import ColorfulIcon from "./layout/ColorfulIcon";
import { useWindowSize } from "../hooks/windowSize";
import { html } from "../pages/api/payment-session-deliver";

function print(html: string) {
  const printWindow = window.open("", "", "");
  print;
  printWindow.document.write(`<html>
    <head>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap");
        * {
          font-family: "EB Garamond", serif !important;
          color: black !important;
          opacity: 1 !important;
          text-opacity: 1 !important;
        }
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>`);
  printWindow.document.close();
  printWindow.print();
  setTimeout(() => printWindow.close(), 100);
}

function Odbierz({
  html,
  filename,
  name,
  docId,
}: {
  html: string;
  filename: string;
  name: string;
  docId: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>();
  const [file, setFile] = React.useState(null);

  const { width } = useWindowSize();

  return (
    <>
      <Card className="mb-6">
        <h1 className="text-4xl w-full mb-0">
          <ColorfulIcon
            icon="document-share"
            size={width > 800 ? 30 : 20}
            color=""
          />{" "}
          Odbierz swoje pismo
        </h1>
        <p className="text-xs mb-6">{name}</p>
        <p>
          Kliknij przycisk <b>DRUKUJ</b> poniżej, aby wydrukować pismo, lub
          zapisać je w formacie PDF. Możesz powrócić do tego linka, kiedy
          będziesz mieć ochotę, ale pamiętaj, aby <b>nikomu</b> go nie
          udostępniać!
        </p>
        <div
          className="w-full h-72 mt-4 rounded-lg flex justify-end align-end"
          style={{
            backgroundImage: "url('/printer.svg')",
            backgroundSize: "cover",
            backgroundPosition: "20% 20%",
          }}
        >
          <a
            href="https://www.vecteezy.com/free-vector/printer"
            className="text-white"
          >
            Printer Vectors by Vecteezy
          </a>
        </div>
      </Card>
      <Callout intent="success">
        Składając pismo, dołącz do niego wymienione w nim załączniki. Pamiętaj,
        aby podpisać się w wyznaczonym miejscu!
      </Callout>
      <Button onClick={() => print(html)} className="w-full" intent="primary">
        DRUKUJ
      </Button>
    </>
  );
}

export default Odbierz;
