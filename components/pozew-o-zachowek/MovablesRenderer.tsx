import { Button, Callout, Divider } from "@blueprintjs/core";
import React from "react";
import ColorfulIcon from "../layout/ColorfulIcon";

export const MovablesRenderer = ({
  movables,
  setValue,
  readonly,
}: {
  movables: any[];
  setValue: any;
  readonly?: boolean;
}) => {
  function spliceAt(index) {
    const newMovables = [...movables];
    newMovables.splice(index, 1);
    setValue(newMovables);
  }

  if (!movables.length) {
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
            Dodane ruchomości
          </h4>
        ) : null}
        <p className="text-xs w-full">Sprawdź, czy dane są poprawne.</p>

        <div className="w-full flex flex-col text-sm ">
          {movables.map((movable) => (
            <div className="flex flex-col pt-5 pb-5">
              <Divider />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">rodzaj ruchomości:</p>
                  <span className="text-base">
                    {movable.type == 1 ? "pojazd" : "przedmiot wartościowy"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">wartość ruchomości:</p>
                  <span className="text-right text-base">
                    {movable.value}zł
                  </span>
                </div>
              </div>
              {movable.type == 1 ? (
                <>
                  {" "}
                  <div className="flex justify-between mt-3">
                    <div className="flex flex-col">
                      <p className="text-xs">rodzaj pojazdu:</p>
                      <span className="text-base">
                        {getVehicleType(movable)}
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <p className="text-xs">marka pojazdu:</p>
                      <span className="text-base">{movable.vehicleBrand}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="flex flex-col">
                      <p className="text-xs">model pojazdu:</p>
                      <span className="text-base">{movable.vehicleModel}</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs text-right">numer rejestracji:</p>
                      <span className="text-right text-base">
                        {movable.vehicleRegistration}
                      </span>
                    </div>
                  </div>{" "}
                </>
              ) : (
                <div className="flex justify-between mt-3">
                  <div className="flex flex-col">
                    <p className="text-xs">nazwa przedmiotu:</p>
                    <span className="text-base">{movable.itemName}</span>
                  </div>
                </div>
              )}

              {!readonly ? (
                <Button
                  intent="danger"
                  fill
                  className="mt-4 mb-0"
                  icon="trash"
                  onClick={() => {
                    spliceAt(movables.indexOf(movable));
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

const getVehicleType = ({ type }) => {
  switch (type) {
    case 1:
      return "samochód osobowy";
    case 2:
      return "samochód ciężarowy";
    case 3:
      return "motocykl";
  }
};
