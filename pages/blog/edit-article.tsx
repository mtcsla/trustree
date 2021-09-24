import {
  Button,
  Callout,
  FileInput,
  Icon,
  Spinner,
  Toaster,
} from "@blueprintjs/core";
import styled from "@emotion/styled";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, uploadBytes } from "@firebase/storage";
import { ref } from "firebase/storage";
import { useRouter } from "next/dist/client/router";
import React from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import { db, storage } from "../../components/firebase/firebase";
import { useWindowSize } from "../../hooks/windowSize";

const uploadImage = async (file: File) => {
  const result = await uploadBytes(
    ref(storage, "/images/blog/" + file.name),
    file
  );

  return getDownloadURL(result.ref);
};

const articleReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return Object.assign({}, action.value);
    case "setContents":
      state.contents = action.value;
      return Object.assign({}, state);
    case "setCoverUri":
      state.coverUri = action.value;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default function EditArticle() {
  const router = useRouter();
  const [article, articleDispatch] = React.useReducer(articleReducer, {
    title: "",
    contents: "",
    coverUri: "",
    author: "",
    date: new Date(),
    id: "",
    visible: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [coverLoading, setCoverLoading] = React.useState(false);

  const updateArticle = (value) => {
    const newArticle = Object.assign({}, article);
    newArticle.contents = value;

    setLoading(true);

    updateDoc(doc(db, "blog", article.id), newArticle)
      .then(() => {
        setLastSavedValue(Object.assign({}, article));
        setLoading(false);
      })
      .catch(() => {
        toaster.current.show({
          intent: "danger",
          message: "Wystąpił błąd.",
        });
      });
  };

  const [lastSavedValue, setLastSavedValue] = React.useState<any>({});

  const windowWidth = useWindowSize().width;

  React.useEffect(() => {
    if (router.isReady)
      getDoc(doc(db, `/blog/${router.query.article}`))
        .then((result) => {
          articleDispatch({ value: result.data(), type: "set" });
          setLastSavedValue(result.data());
        })
        .catch((err) => {
          toaster.current.show({
            message: "Wystąpił błąd.",
            intent: "danger",
          });
        });
  }, [router.isReady]);

  const toaster = React.useRef<Toaster>();

  return (
    <>
      <Toaster ref={toaster} position="top-right" className="mt-10" />
      {article.title ? (
        <MarkdownSpan>
          <Callout
            intent={
              article.contents === lastSavedValue.contents &&
              article.coverUri === lastSavedValue.coverUri
                ? "success"
                : "warning"
            }
            className="mb-6"
          >
            {article.contents === lastSavedValue.contents &&
            article.coverUri === lastSavedValue.coverUri
              ? "ZAPISANO"
              : "ZAPISZ SWOJĄ PRACĘ!"}
          </Callout>
          <div
            style={{
              backgroundColor: "var(--grey)",
              backgroundImage: `url(${article.coverUri})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              borderRadius: 10,
              height: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 20,
            }}
          >
            {coverLoading ? <Spinner className="m-auto" size={40} /> : null}
            <FileInput
              buttonText="Przeglądaj"
              text="Wybierz plik..."
              fill
              onInputChange={(e) => {
                const file = e.currentTarget.files[0];
                setCoverLoading(true);
                uploadImage(file)
                  .then((url) => {
                    articleDispatch({ value: url, type: "setCoverUri" });
                    setCoverLoading(false);
                  })
                  .catch((err) => {
                    toaster.current.show({
                      message: "Wystąpił błąd.",
                      intent: "danger",
                    });
                  });
              }}
            />
          </div>

          <div className="flex flex-col">
            <h1
              className={`${
                windowWidth > 800 ? "text-4xl" : "text-2xl"
              } font-bold`}
              style={{ marginTop: 10 }}
            >
              {article.title}
            </h1>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: 10 }}
            >
              <p>{article.author}</p>
              <p className="flex items-center">
                <Icon icon="calendar" className="m-2" />
                {article.date.toDate().toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <span id="article">
            <RichMarkdownEditor
              //@ts-ignore
              theme={{
                background: "var(--layout-bg)",
              }}
              onChange={(value) =>
                articleDispatch({ value: value() ?? "", type: "setContents" })
              }
              defaultValue={article.contents}
              uploadImage={async (file) => {
                return await uploadImage(file);
              }}
            />
          </span>
          <Button
            intent={!loading ? "success" : "primary"}
            className="w-full mt-6"
            outlined={loading}
            disabled={
              article.contents === lastSavedValue.contents &&
              article.coverUri === lastSavedValue.coverUri
            }
            onClick={() => {
              updateArticle(article.contents);
            }}
          >
            {loading ? <Spinner size={22} /> : "ZAPISZ"}
          </Button>
        </MarkdownSpan>
      ) : null}
    </>
  );
}

const MarkdownSpan = styled.div`
  width: 70%;
  padding: 30px;
  min-width: 450px;

  @media (max-width: 800px) {
    width: 100%;
    min-width: 0px;
    padding: 0px;
  }
`;
