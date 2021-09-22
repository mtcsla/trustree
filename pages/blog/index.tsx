import styled from "@emotion/styled";
import { db } from "../../components/firebase/firebase";
import {
  collection,
  query,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
} from "@firebase/firestore";
import React from "react";
import Link from "next/link";
import {
  Button,
  Icon,
  Overlay,
  Spinner,
  FormGroup,
  InputGroup,
  Toaster,
} from "@blueprintjs/core";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../components/firebase/firebaseAuth";
import { Classes, Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { doc, setDoc, where } from "firebase/firestore";
import { Divider } from "@blueprintjs/core";

export const fetchBlogArticles = async (setState, role) => {
  const collectionRef = collection(db, "/blog/");
  const q = ["editor", "admin"].includes(role)
    ? query(collectionRef)
    : query(collectionRef, where("visible", "==", true));

  const docsData = [];
  const docs = await getDocs(q);

  docs.forEach((doc) => docsData.push({ ...doc.data(), id: doc.id }));

  setState(docsData);
};

const formatString = (name) => {
  var s = name;
  var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=?\-_`~()]/g, "");
  var finalString = punctuationless.replace(/\s{2,}/g, " ");
  finalString = finalString.replaceAll(" ", "-").toLowerCase();
  finalString = finalString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return finalString;
};

const loadingReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      state[action.value] = !state[action.value];
      break;
    case "set":
      state = action.value;
      break;
  }

  return [...state];
};

const Blog = () => {
  const [name, setName] = React.useState("");
  const [clicked, setClicked] = React.useState(false);

  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [userRole, setUserRole] = React.useState("");

  const toaster = React.useRef<Toaster>();
  const [loading, loadingDispatch] = React.useReducer(loadingReducer, []);
  const { getUserRole, currentUser } = useAuth();

  const router = useRouter();
  React.useEffect(() => {
    getUserRole()
      .then((role) => {
        setUserRole(role);
      })
      .catch((err) => {
        setUserRole("user");
      });
  }, [currentUser]);

  React.useEffect(() => {
    if (userRole)
      fetchBlogArticles(setBlogs, userRole).then(() =>
        loadingDispatch({
          type: "set",
          value: new Array(blogs.length).fill(false),
        })
      );
  }, [userRole]);
  const createArticle = (name) => {
    setDoc(doc(db, "blog", formatString(name)), {
      author: currentUser.displayName,
      title: name,
      content: "",
      visible: false,
      coverUri: "",
      date: new Date(),
      id: formatString(name),
    })
      .then(() => {
        router.push("/blog/edit-article?article=" + formatString(name));
      })
      .catch(() => {
        toaster.current.show({
          intent: "danger",
          message: "Wystąpił błąd przy tworzeniu artykułu.",
        });
      });
  };
  return (
    <BlogListDiv>
      {" "}
      <Toaster position="top-right" ref={toaster} className="z-50 mt-10" />{" "}
      <div className="flex-col flex-1 h-full m-2">
        {" "}
        <h1 className="text-4xl font-bold" style={{ marginBottom: 5 }}>
          {" "}
          Nasz blog{" "}
        </h1>{" "}
        <p>Dowiedz się więcej na temat swojej sprawy.</p>{" "}
        {blogs.length ? (
          <BlogList
            {...{ blogs, loading, loadingDispatch, role: userRole, setBlogs }}
          />
        ) : (
          <div
            style={{ height: "100%" }}
            className="h-full flex items-center justify-center mt-2"
          >
            <Spinner size={200} className="m-auto mt-10" />
          </div>
        )}
      </div>
      {userRole === "editor" || userRole === "admin" ? (
        <>
          <FormGroup label="tytuł nowego artykułu:" className="mt-6">
            <InputGroup
              value={name}
              onChange={(e) => setName(e.target.value)}
              intent={!name && clicked ? "danger" : "none"}
            />
            <p className="text-xs text-gray-400">
              nie będzie możliwości jego zmiany
            </p>
            {!name && clicked ? (
              <p className="text-sm text-red-500">Wprowadź nazwę artykułu!</p>
            ) : null}
          </FormGroup>
          <Button
            rightIcon="edit"
            className="w-full"
            intent="success"
            onClick={() => {
              setClicked(true);
              if (name) createArticle(name);
            }}
          >
            UTWÓRZ POST
          </Button>
        </>
      ) : null}
    </BlogListDiv>
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

export const BlogList = ({
  blogs,
  loading,
  loadingDispatch,
  role,
  setBlogs,
}: {
  blogs: any[];
  role?: string;
  loading?: boolean[];
  loadingDispatch?: (action: any) => any;
  setBlogs?: React.Dispatch<any>;
}) => {
  const router = useRouter();
  return (
    <div className=" flex-1 flex flex-col items-center">
      {blogs.map((article) => {
        return (
          <a
            className="w-full"
            href={`/blog/${article.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="w-full">
              <BlogArticle>
                <div className="flex w-full h-full">
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
                  {["editor", "admin"].includes(role) ? (
                    <div
                      className="flex flex-col h-full"
                      style={{ width: 70 }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Tooltip2
                        className="flex-1 m-1"
                        content={"Edytuj artykuł."}
                      >
                        <Link
                          passHref
                          href={`/blog/edit-article?article=${article.id}`}
                        >
                          <a>
                            <Button
                              outlined
                              className="w-full h-full"
                              intent="primary"
                            >
                              <Icon icon="edit" size={22} />
                            </Button>
                          </a>
                        </Link>
                      </Tooltip2>
                      <Tooltip2
                        className="flex-1 m-1"
                        content={`${
                          article.visible ? "Włącz" : "Wyłącz"
                        } ukrycie artykułu.`}
                      >
                        <Button
                          outlined
                          className="w-full h-full"
                          intent="success"
                          onClick={() => {
                            toggleVisibility(article, blogs, setBlogs, () => {
                              loadingDispatch({
                                type: "toggle",
                                value: blogs.indexOf(article),
                              });
                            });
                          }}
                        >
                          {loading[blogs.indexOf(article)] ? (
                            <Spinner size={22} />
                          ) : (
                            <Icon
                              icon={article.visible ? "eye-on" : "eye-off"}
                              size={22}
                            />
                          )}
                        </Button>
                      </Tooltip2>
                      <Popover2
                        captureDismiss
                        content={
                          <div className="p-3">
                            Czy na pewno chcesz usunąć ten artykuł?
                            <div className="flex mt-1">
                              <Button
                                intent="success"
                                className={Classes.POPOVER2_DISMISS}
                                style={{ flex: 1, marginRight: 10 }}
                                onClick={() => {
                                  deleteDoc(doc(db, "blog", article.id)).then(
                                    () => {
                                      const newBlogs = [...blogs];
                                      newBlogs.splice(
                                        newBlogs.indexOf(article),
                                        1
                                      );
                                      setBlogs(newBlogs);
                                    }
                                  );
                                }}
                              >
                                TAK
                              </Button>
                              <Button
                                intent="danger"
                                className={Classes.POPOVER2_DISMISS}
                                style={{ flex: 1, marginLeft: 10 }}
                              >
                                NIE
                              </Button>
                            </div>
                          </div>
                        }
                        position="bottom"
                        className="flex-1 m-1"
                      >
                        <Button
                          outlined
                          intent="danger"
                          className="w-full h-full"
                        >
                          <Icon icon="trash" size={22} />
                        </Button>
                      </Popover2>
                    </div>
                  ) : null}
                </div>
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
          </a>
        );
      })}
    </div>
  );
};

const toggleVisibility = async (
  article: any,
  blogs,
  setBlogs,
  toggleLoading
) => {
  toggleLoading();
  const newBlogs = [...blogs];

  console.log(newBlogs[newBlogs.indexOf(article)]);

  article.visible = !article.visible;
  newBlogs[newBlogs.indexOf(article)] = article;

  console.log(newBlogs[newBlogs.indexOf(article)]);

  await updateDoc(doc(collection(db, "blog"), article.id), article);

  setBlogs(newBlogs);
  toggleLoading();
};

const BlogListDiv = styled.div`
  width: 70%;
  min-width: 450px;

  @media (max-width: 800px) {
    width: 100%;
    min-width: 0px;
    padding: 0px;
  }
`;
