import Odbierz from "../components/Odbierz";
import dynamic from "next/dynamic";

const drukuj = () => {
  return <Odbierz {...JSON.parse(sessionStorage.getItem("document"))} />;
};
export default dynamic(Promise.resolve(drukuj), { ssr: false });
