import { Divider, Icon } from "@blueprintjs/core";
import styled from "@emotion/styled";

import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import { db } from "../../components/firebase/firebase";
import { useWindowSize } from "../../hooks/windowSize";
import { BlogList } from "./index";

export const getServerSideProps = async (context) => {
  const { firestore } = require("../api/lib/firebase-admin");

  const { article } = context.params;

  const doc = await firestore.collection("blog").doc(article).get();

  const blogpost = { ...doc.data(), id: doc.id };

  blogpost.date = blogpost.date.toDate().toLocaleDateString("pl-PL");

  return {
    props: { article: blogpost },
  };
};

export const fetchNrandomBlogArticles = async (setState, n, article) => {
  const collectionRef = collection(db, "/blog/");
  const q = query(collectionRef, where("visible", "==", true));

  let docsData = [];
  const docs = await getDocs(q);

  docs.forEach((doc) => docsData.push({ ...doc.data(), id: doc.id }));

  for (const doc of docsData) {
    if (doc.id === article.id) {
      docsData.splice(docsData.indexOf(doc), 1);
    }
  }

  docsData = docsData.sort(() => 0.5 - Math.random());
  docsData = docsData.slice(0, n);

  setState(docsData);
};

const Article = ({ article }) => {
  const windowWidth = useWindowSize().width;
  const { title, author, coverUri, contents, date } = article;
  const [blogs, setBlogs] = React.useState([]);
  React.useEffect(() => {
    fetchNrandomBlogArticles(setBlogs, 4, article);
  }, [article]);

  return (
    <MarkdownSpan>
      <div
        style={{
          backgroundColor: "var(--grey)",
          backgroundImage: `url(${coverUri})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          borderRadius: 10,
          height: 250,
        }}
      />

      <div className="flex flex-col">
        <h1
          className={`${windowWidth > 800 ? "text-4xl" : "text-2xl"} `}
          style={{ marginTop: 10 }}
        >
          {title}
        </h1>
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 10 }}
        >
          <p>{author}</p>
          <p className="flex items-center">
            <Icon icon="calendar" className="m-2" />
            {date}
          </p>
        </div>
      </div>
      <span id="article">
        <Editor>
          <RichMarkdownEditor
            readOnly
            value={contents}
            //@ts-ignore
            theme={{
              background: "var(--layout-bg)",
            }}
          />
        </Editor>
      </span>
      <Divider />
      <h1
        className={`${windowWidth > 800 ? "text-4xl" : "text-2xl"} `}
        style={{ marginTop: 20 }}
      >
        Sprawdź także inne artykuły:
      </h1>
      <BlogList blogs={blogs} />
    </MarkdownSpan>
  );
};

export default Article;
const Editor = styled.div`
  background: transparent !important;
  width: 70%;
  min-width: 400px;
  @media (max-width: 800px) {
    width: 100%;
    min-width: 0;
  }
`;
const MarkdownSpan = styled.div`
  padding: 30px;
  width: 100%;
  min-width: 0px;

  @media (max-width: 800px) {
    padding: 0px;
  }
`;
