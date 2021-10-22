import { Button, Callout, Divider } from "@blueprintjs/core";
import React from "react";
import ColorfulIcon from "../layout/ColorfulIcon";

export const GrantsRenderer = ({
  grants,
  setValue,
  readonly,
}: {
  grants: any[];
  setValue: any;
  readonly?: boolean;
}) => {
  function spliceAt(index) {
    const newGrants = [...grants];
    newGrants.splice(index, 1);
    setValue(newGrants);
  }

  if (!grants.length) {
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
            Dodane darowizny
          </h4>
        ) : null}
        <p className="text-xs w-full">Sprawdź, czy dane są poprawne.</p>

        <div className="w-full flex flex-col text-sm ">
          {grants.map((grant) => (
            <div className="flex flex-col pt-5 pb-5">
              <Divider />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-xs">kwota darowizny:</p>
                  <span className="text-base">{grant.value}zł</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs">miasto podpisania aktu darowizny:</p>
                  <span className="text-right text-base">{grant.city}</span>
                </div>
              </div>

              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <p className="text-xs">data podpisania aktu darowizny:</p>
                  <span className="text-base">
                    {new Date(grant.date).toLocaleDateString("pl-PL")}
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
                    spliceAt(grants.indexOf(grant));
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
