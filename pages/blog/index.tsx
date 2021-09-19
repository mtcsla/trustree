import styled from "@emotion/styled";
import { db } from "../../components/firebase/firebase";
import { collection, query, getDocs } from "@firebase/firestore";
import React from "react";
import Link from "next/link";
import { Icon, Spinner } from "@blueprintjs/core";
import { useRouter } from "next/dist/client/router";

export const fetchBlogArticles = async (setState) => {
  const collectionRef = collection(db, "/blog/");
  const q = query(collectionRef /*, where("visible", "==", true)*/);

  const docsData = [];
  const docs = await getDocs(q);

  docs.forEach((doc) => docsData.push({ ...doc.data(), id: doc.id }));

  setState(docsData.sort(() => 0.5 - Math.random()));
};

const Blog = () => {
  const [blogs, setBlogs] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchBlogArticles(setBlogs);
  }, []);

  return (
    <>
      {blogs.length ? (
        <div className="flex-col flex-1 m-2">
          <h1 className="text-4xl font-bold" style={{ marginBottom: 5 }}>
            Blog
          </h1>
          <p>Dowiedz się więcej na temat swojej sprawy.</p>
          <BlogList {...{ blogs }} />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <Spinner size={200} />
        </div>
      )}
    </>
  );
};

const BlogArticle = styled.div`
  width: 100%;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
  height: 250px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: stretch;
`;

export default Blog;

export const BlogList = ({ blogs }) => {
  const router = useRouter();
  return (
    <BlogListDiv
      pathname={router.pathname}
      className=" flex-1 flex flex-col items-center"
    >
      {blogs.map((article) => {
        return (
          <Link href={`/blog/${article.id}`}>
            <div className="w-full">
              <BlogArticle>
                <div
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${article.coverUri})`,
                    backgroundColor: "var(--grey)",
                    backgroundPosition: "50% 50%",
                    width: "100%",
                    borderRadius: 10,
                  }}
                  className="h-full"
                />
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h2 style={{ marginTop: 5 }} className="text-xl font-bold">
                      {article.title}
                    </h2>
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="calendar" style={{ marginRight: 5 }} />{" "}
                    <h4>{article.date.toDate().toLocaleDateString("en-GB")}</h4>
                  </div>
                </div>
              </BlogArticle>
            </div>
          </Link>
        );
      })}
    </BlogListDiv>
  );
};

const BlogListDiv = styled.div<Pathname>`
  ${(props) =>
    props.pathname === "/blog" &&
    `width: 70%;
min - width: 450px;`}

  @media (max-width: 800px) {
    width: 100%;
    min-width: 0px;
    padding: 0px;
  }
`;

interface Pathname {
  pathname: string;
}
