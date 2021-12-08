import { Callout } from "@blueprintjs/core";

const YoullGetMail = () => {
  return (
    <Callout intent="primary" icon="envelope" className="w-full mb-6">
      Po zakupieniu pisma otrzymasz je w wiadomości, którą wyślemy na{" "}
      <b>adres e-mail</b>, który podałeś w formularzu.
    </Callout>
  );
};

export default YoullGetMail;
