import Link from "next/link";
import React from "react";
import {
  AiFillInstagram as Instagram,
  AiFillFacebook as Facebook,
} from "react-icons/ai";
import { useWindowSize } from "../../hooks/windowSize";
import { Button, Icon } from "@blueprintjs/core";
import { useNav } from "../../pages/_app";
import styled from "@emotion/styled";

const Header = ({ noX }: { noX?: boolean }) => {
  const windowWidth = useWindowSize().width;
  const { navExtended, setNavExtended } = useNav();

  return (
    <HeaderDiv
      className="flex p-4 w-full"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      {navExtended && !noX ? (
        <Button className="fixed left-15" onClick={() => setNavExtended(false)}>
          <Icon icon="cross" />
        </Button>
      ) : null}
      <Link href="/">
        <img
          alt="Logo firmy Trustree."
          className="cursor-pointer"
          src="/logo-light.svg"
          style={{
            width: 100,
            minWidth: 100,
          }}
        />
      </Link>
      <Link href="/">
        <div className="flex flex-col text-left justify-center p-2 cursor-pointer">
          <LogoText
            className={windowWidth > 800 ? "text-5xl" : "text-7xl"}
            style={{ letterSpacing: 1 }}
          >
            Trustree
          </LogoText>
        </div>
      </Link>{" "}
    </HeaderDiv>
  );
};

export default Header;

const LogoText = styled.h1``;

const SocialMedia = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;
const HeaderDiv = styled.div`
  justify-items: space-between;
  @media (max-width: 800px) {
    justify-items: start;
  }
`;
