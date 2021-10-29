import React from "react";
import { toCanvas } from "html-to-image";

import jsPDF from "jspdf";
import dynamic from "next/dynamic";
import { Button, Card } from "@blueprintjs/core";
import ColorfulIcon from "./layout/ColorfulIcon";
import { useWindowSize } from "../hooks/windowSize";

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = `<html><style>@page { size: auto;  margin: 0mm; }
</style>${html}</html>`;
  return template.content.children[0];
}

function print(html: string) {
  const printWindow = window.open("", "", "");
  print;
  printWindow.document.write(`<html><style> 
</style>${html}</html>`);
  printWindow.document.close();

  printWindow.print();
  printWindow.document.getElementsByTagName("html")[0].style.opacity = "0";

  printWindow.close();
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
      <Button onClick={() => print(html)} className="w-full" intent="success">
        DRUKUJ
      </Button>
    </>
  );
}

export default Odbierz;
