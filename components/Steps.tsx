import { Button } from "@blueprintjs/core";
import Link from "next/link";

export default function Steps({ href }) {
  return (
    <>
      <div className="flex flex-col mt-4">
        <h3
          style={{ background: "var(--medium-sea-green)" }}
          className="text-white p-3 mb-2 rounded-lg"
        >
          WYKONAJ PISMO W TRZECH KROKACH
        </h3>
        <div className="flex items-stretch flex-wrap">
          <ol className=" ml-6 list-decimal">
            <li className="mt-1 mb-1">
              <b>Wypełnij formularz.</b>
            </li>
            <li className="mt-1 mb-1">
              <b>Zweryfikuj dane i zapłać.</b>
            </li>
            <li className="mt-1 mb-1">
              <b>Otrzymaj pismo na adres e-mail.</b>
            </li>
          </ol>
          <Link passHref href="/oswiadczenie-o-przyjeciu-spadku/form">
            <a className="flex flex-1">
              <Button
                className="flex-1 ml-3 mt-1 mb-1"
                style={{ minWidth: 230 }}
                intent="primary"
                rightIcon="caret-right"
              >
                <h1>PRZEJDŹ DALEJ</h1>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
