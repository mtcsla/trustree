import { Button, Callout, Divider } from "@blueprintjs/core";
import React from "react";
import ColorfulIcon from "../layout/ColorfulIcon";

export const OtherHereditariesRenderer = ({
  otherHereditaries,
  setValue,
  readonly,
}: {
  otherHereditaries: any[];
  setValue: any;
  readonly?: boolean;
}) => {
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
        {!readonly ? (
          <h4 className="flex items-center text-2xl  mt-4 w-full">
            <ColorfulIcon
              size={18}
              style={{ marginRight: 7 }}
              color="165, 42, 42"
              icon="document"
            />
            Dodani spadkobiercy
          </h4>
        ) : null}
        <p className="text-xs  w-full">Sprawdź, czy dane są poprawne.</p>

        <div className="w-full flex flex-col text-sm ">
          {otherHereditaries.map((hereditary) => (
            <div className="mb-6 flex flex-col pt-5 pb-5">
              <Divider />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">imię i nazwisko:</p>
                  <span className="text-base">{hereditary.name}</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">udział w spadku:</p>
                  <span className="text-right text-base">
                    {hereditary.share}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">adres:</p>
                  <span className="text-base">{hereditary.address}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">forma przyjęcia spadku:</p>
                  <span className="text-base">
                    {hereditary.forma == 0
                      ? "przyjęcie proste"
                      : "przyjęcie z dobrodziejstwem inwentarza"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    kim był zmarły dla tego spadkobiercy?
                  </p>
                  <span className="text-right text-base">
                    {getRelation(hereditary.relation)}
                  </span>
                </div>
              </div>

              <h4 className="text-sm  uppercase">
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
                  <span className="text-base">{hereditary.actUscName}</span>
                </div>

                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    numer odpisu skróconego aktu:
                  </p>
                  <span className="text-right text-base">
                    {hereditary.actNumber}
                  </span>
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
                  <span className="text-base">
                    {new Date(hereditary.actDate).toLocaleDateString("pl-PL")}
                  </span>
                </div>
              </div>
              {!readonly ? (
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
              ) : null}
            </div>
          ))}
        </div>
      </>
    );
};

export function getRelation(relation) {
  if (typeof relation !== "number") relation = parseInt(relation);

  switch (relation) {
    case 0:
      return "niespokrewnionym";
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
