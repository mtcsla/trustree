import { Icon } from "@blueprintjs/core";
import { useWindowSize } from "../hooks/windowSize";
import { useNav } from "./_app";
export default function index() {
  const windowWidth = useWindowSize().width;
  const { setNavExtended, navExtended } = useNav();

  return <></>;
}
