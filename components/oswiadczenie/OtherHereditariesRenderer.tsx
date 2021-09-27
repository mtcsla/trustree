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
          <h4 className="flex items-center text-2xl font-bold mt-4 w-full">
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
              <h4 className="flex items-center text-xl font-bold w-full">
                DANE SPADKOBIERCY #{otherHereditaries.indexOf(hereditary) + 1}
              </h4>
              <Divider />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">imię i nazwisko:</p>
                  <h3 className="text-base">{hereditary.name}</h3>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">adres:</p>
                  <h3 className="text-base">{hereditary.address}</h3>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    kim był zmarły dla tego spadkobiercy?
                  </p>
                  <h3 className="text-right text-base">
                    {getRelation(hereditary.relation)}
                  </h3>
                </div>
              </div>

              {!readonly ? (
                <Button
                  intent="danger"
                  fill
                  className="mt-6 mb-0"
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
