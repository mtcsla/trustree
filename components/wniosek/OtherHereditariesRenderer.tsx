import { Button, Callout, Divider } from "@blueprintjs/core";
import React from "react";

export const OtherHereditariesRenderer = ({ otherHereditaries, setValue }) => {
  function spliceAt(index) {
    const newOtherHereditaries = [...otherHereditaries];
    newOtherHereditaries.splice(index, 1);
    setValue(newOtherHereditaries);
  }

  if (!otherHereditaries.length) {
    return null;
  } else
    return (
      <>
        <h4 className="text-2xl font-bold mt-4 w-full">Dodani spadkobiercy</h4>
        <p className="text-xs mb-4 w-full">Sprawdź, czy dane są poprawne.</p>

        <div className="w-full flex flex-col text-sm ">
          {otherHereditaries.map((hereditary) => (
            <div className="mb-6 flex flex-col pt-5 pb-5">
              <h4 className="text-xl font-bold w-full">
                DANE SPADKOBIERCY #{otherHereditaries.indexOf(hereditary) + 1}
              </h4>
              <Divider />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">imię i nazwisko:</p>
                  <p>{hereditary.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">udział w spadku:</p>
                  <p className="text-right">{hereditary.share}</p>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">adres:</p>
                  <p>{hereditary.address}</p>
                </div>
              </div>

              <div className="flex justify-between mb-4 mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">forma przyjęcia spadku:</p>
                  <p>
                    {hereditary.forma == 0
                      ? "przyjęcie proste"
                      : "przyjęcie z dobrodziejstwem inwentarza"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    kim był zmarły dla tego spadkobiercy?
                  </p>
                  <p className="text-right">
                    {getRelation(hereditary.relation)}
                  </p>
                </div>
              </div>

              <h4 className="text-xl font-bold uppercase">
                ODPIS SKRÓCONY AKTU{" "}
                {hereditary.actType == 0 || hereditary.relation == 1
                  ? "małżeństwa"
                  : "urodzenia"}{" "}
                {hereditary.relation == 3 ? "zmarłego" : ""}
              </h4>
              <Divider />

              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">nazwa urzędu stanu cywilnego:</p>
                  <p>{hereditary.actUscName}</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    numer odpisu skróconego aktu:
                  </p>
                  <p className="text-right">{hereditary.actNumber}</p>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">
                    data{" "}
                    {hereditary.actType == 0 || hereditary.relation == 1
                      ? "zawarcia małżeństwa"
                      : "urodzenia"}
                    :
                  </p>
                  <p>
                    {new Date(hereditary.actDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <Button
                intent="danger"
                fill
                className="mt-4 mb-0"
                icon="trash"
                onClick={() => {
                  spliceAt(otherHereditaries.indexOf(hereditary));
                }}
              >
                USUŃ
              </Button>
            </div>
          ))}
        </div>
      </>
    );
};

export function getRelation(relation) {
  if (typeof relation !== "number") relation = parseInt(relation);

  switch (relation) {
    case 1:
      return "małżonkiem";
    case 2:
      return "rodzeństwem";
    case 3:
      return "dzieckiem";
    case 4:
      return "rodzicem";
    case 5:
      return "dziadkiem/babcią";
    case 6:
      return "wujkiem/ciotką";
    default:
      return "małżonkiem";
  }
}
