import {
  Button,
  Icon,
  Divider,
  Spinner,
  Toaster,
  Position,
} from "@blueprintjs/core";

import React from "react";
import { useRouter } from "next/dist/client/router";

export default function PaymentForm({ title, subtitle, metadata, price }) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const toaster = React.useRef<Toaster>();

  const onSubmit = () => {
    setSubmitting(true);
    fetch("/api/buy-document-intent", {
      body: JSON.stringify(
        Object.assign({ returnUrl: router.pathname }, metadata)
      ),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      redirect: "follow",
    })
      //@ts-ignore
      .then(async (data) => {
        const url = (await data.json()).url;
        console.log(url);

        router.push(url);
      })
      .catch((err) => {
        console.log(err);
        setError("Wystąpił błąd.");
        setSubmitting(false);
      });
  };

  React.useEffect(() => {
    if (metadata.canceled) {
      toaster.current.show({
        message: "Płatność została anulowana.",
        intent: "danger",
      });
    }
  }, []);

  return (
    <form>
      <Toaster
        position={Position.TOP_RIGHT}
        ref={toaster}
        className="z-50 mt-10"
      />
      <section className="rounded border">
        <div className="w-full h-full flex">
          <div className="h-full flex p-5 rounded-tl bg-gray-200">
            <Icon icon={"edit"} size={50} className="m-auto" />
          </div>
          <div className="w-full h-full p-3 flex flex-col">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <div className="flex p-4 flex-col items-center justify-end">
            <Divider className="w-full" />
            <h5>{price}zł</h5>
          </div>
        </div>
        <Button
          rightIcon={submitting ? null : "caret-right"}
          onClick={submitting ? null : onSubmit}
          outlined={submitting}
          disabled={submitting}
          intent="primary"
        >
          {submitting ? <Spinner size={16} /> : "ZAPŁAĆ"}
        </Button>
      </section>
      {error ? <p className="text-red-500">{error}</p> : null}

      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}
