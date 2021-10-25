import { Button, Callout, Divider } from "@blueprintjs/core";
import React from "react";
import ColorfulIcon from "../layout/ColorfulIcon";

export const ImmovablesRenderer = ({
  immovables,
  setValue,
  readonly,
}: {
  immovables: any[];
  setValue: any;
  readonly?: boolean;
}) => {
  function spliceAt(index) {
    const newImmovables = [...immovables];
    newImmovables.splice(index, 1);
    setValue(newImmovables);
  }

  if (!immovables.length) {
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
            Dodane nieruchomości
          </h4>
        ) : null}
        <p className="text-xs w-full">Sprawdź, czy dane są poprawne.</p>

        <div className="w-full flex flex-col text-sm ">
          {immovables.map((immovable) => (
            <div className="flex flex-col pt-5 pb-5">
              <Divider />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">adres:</p>
                  <span className="text-base">{immovable.address}</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">wartość nieruchomości:</p>
                  <span className="text-right text-base">
                    {immovable.propertyValue}zł
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">numer księgi wieczystej:</p>
                  <span className="text-base">{immovable.courtName}</span>
                </div>
                <div className="flex flex-col text-right">
                  <p className="text-xs">sąd prowadzący księgę:</p>
                  <span className="text-base">{immovable.courtName}</span>
                </div>
              </div>

              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">udział spadkodawcy w nieruchomości:</p>
                  <span className="text-base">
                    {!immovable.deadShare ? "całość" : immovable.deadShare}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-right">
                    twój udział w nieruchomości:
                  </p>
                  <span className="text-right text-base">
                    {!immovable.share ? "brak" : immovable.share}
                  </span>
                </div>
              </div>
              <Divider />

              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">rodzaj nieruchomości:</p>
                  <span className="text-base">
                    {getPropertyType(immovable)}
                  </span>
                </div>
                {[1, 3].includes(immovable.propertyType) ? (
                  <div className="flex flex-col">
                    <p className="text-xs text-right">rodzaj budynku:</p>
                    <span className="text-right text-base">
                      {getBuildingType(immovable)}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">powierzchnia gruntu:</p>
                  <span className="text-base">
                    {immovable.fieldSurfaceArea} m<sup>2</sup>
                  </span>
                </div>
                {[1, 3, 4].includes(immovable.propertyType) ? (
                  <div className="flex flex-col">
                    <p className="text-xs text-right">
                      powierzchnia{" "}
                      {immovable.propertyType == 4 ? "lokalu" : "budynku"}:{" "}
                    </p>
                    <span className="text-right text-base">
                      {immovable.buildingSurfaceArea} m<sup>2</sup>
                    </span>
                  </div>
                ) : null}
              </div>

              {!readonly ? (
                <Button
                  intent="danger"
                  fill
                  className="mt-4 mb-0"
                  icon="trash"
                  onClick={() => {
                    spliceAt(immovables.indexOf(immovable));
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
const getPropertyType = ({ propertyType }) => {
  switch (propertyType) {
    case 1:
      return "gruntowa zabudowana";
    case 2:
      return "gruntowa niezabudowana";
    case 3:
      return "budynkowa";
    case 4:
      return "lokalowa (lokal mieszkalny)";
    case 5:
      return "rolna";
  }
};

const getBuildingType = ({ buildingType }) => {
  switch (buildingType) {
    case 1:
      return "dom jednorodzinny";
    case 2:
      return "dom zabliźniaczony";
    case 3:
      return "dom letniskowy";
  }
};
