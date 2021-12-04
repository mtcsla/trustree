import { Button } from "@blueprintjs/core";
import Link from "next/link";

export default function Steps({ href }) {
  return (
    <>
      <div className="flex flex-col mt-4 mb-2">
        <div
          className="flex flex-col text-white  p-4 rounded-lg mb-2"
          style={{ background: "var(--medium-sea-green)" }}
        >
          <h3 className="text-white rounded-lg">
            Wykonaj pismo w trzech prostych krokach.
          </h3>
          <p>oto one:</p>
        </div>
        <div className="flex items-stretch flex-wrap">
          <ol className=" ml-6 m-3 list-decimal">
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
          <Link passHref href={href}>
            <a className="flex flex-1">
              <Button
                className="flex-1 p-4 h-full"
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
