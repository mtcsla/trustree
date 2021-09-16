import Link from "next/link";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { useWindowSize } from "../../hooks/windowSize";
import { Button, Icon } from "@blueprintjs/core";
import { useNav } from "../../pages/_app";

const Header = () => {
  const windowWidth = useWindowSize().width;
  const { navExtended, setNavExtended } = useNav();

  return (
    <div
      className="flex p-4 w-full"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      {navExtended ? (
        <Button className="fixed left-15" onClick={() => setNavExtended(false)}>
          <Icon icon="cross" />
        </Button>
      ) : null}
      <img
        src="/logo-light.svg"
        style={{
          width: 100,
          minWidth: 100,
          paddingRight: 5,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <div className="flex flex-col justify-center" style={{ marginRight: 10 }}>
        <h1 className="font-bold text-2xl m-0">Trustree</h1>
        <Link href="/">
          <p className="text-xs text-gray-500 m-0 no-underline cursor-pointer">
            Strona główna
          </p>
        </Link>
      </div>
      <div className="flex flex-col justify-center m-1">
        <SocialIcon
          network="facebook"
          style={{
            height: 28,
            width: 28,
            background: "var(--border-color)",
            borderRadius: 5,
            padding: 3,
          }}
          bgColor="rgba(0, 0, 0, 0)"
          fgColor="rgba(0, 0, 0, 1)"
        />
        <SocialIcon
          network="instagram"
          style={{
            height: 28,
            width: 28,
            marginTop: 5,
            background: "var(--border-color)",
            borderRadius: 5,
            padding: 3,
          }}
          bgColor="rgba(0, 0, 0, 0)"
          fgColor="rgba(0, 0, 0, 1)"
        />
      </div>
    </div>
  );
};

export default Header;
