import React from "react";
import { toCanvas } from "html-to-image";

import jsPDF from "jspdf";
import dynamic from "next/dynamic";
import { Button, Card } from "@blueprintjs/core";
import ColorfulIcon from "./layout/ColorfulIcon";

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
  printWindow.document.write(`<html><style>@page { size: auto;  margin: 0mm; }
</style>${html}</html>`);
  printWindow.document.close();

  printWindow.print();
  printWindow.document.getElementsByTagName("html")[0].style.opacity = "0";

  printWindow.close();
}

function Odbierz({ html, filename }: { html: string; filename: string }) {
  const cardRef = React.useRef<HTMLDivElement>();
  const [file, setFile] = React.useState(null);

  return (
    <>
      <Card className="mb-6">
        <h1 className="text-4xl mb-4 w-full">
          <ColorfulIcon icon="document-share" size={30} color="" /> Odbierz
          swoje pismo
        </h1>
        <p>
          Kliknij przycisk <b>DRUKUJ</b> poniżej, aby wydrukować pismo, lub
          zapisać je w formacie PDF. Możesz powrócić do tego linka, kiedy
          będziesz mieć ochotę, ale pamiętaj, aby nikomu go nie udostępniać!
        </p>
      </Card>
      <Button onClick={() => print(html)} className="w-full" intent="success">
        DRUKUJ
      </Button>
    </>
  );
}

export default Odbierz;
