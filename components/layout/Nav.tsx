import { Button, Collapse, Icon, IconName } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";
import styled from "@emotion/styled";
import { collection, getDocs, query } from "@firebase/firestore";
import { where } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { db } from "../firebase/firebase";
import { useAuth } from "../firebase/firebaseAuth";

export const Nav = () => {
  const { currentUser, signOut } = useAuth();
  const [active, setActive] = React.useState(-1);

  return (
    <>
      <LinkNavButton
        title="Nasz blog"
        iconLeft="book"
        iconRight="link"
        href="/blog"
      />
      {!currentUser ? (
        <LinkNavButton
          title="Zaloguj się"
          iconLeft="log-in"
          iconRight="key"
          href="/logowanie"
        />
      ) : (
        <Popover2
          captureDismiss
          placement="bottom"
          popoverClassName="fixed z-50"
          content={
            <div className="flex-col flex p-2">
              <p className="m-1 text-center text-sm">
                Na pewno chcesz się wylogować?
              </p>
              <div className="flex justify-around w-full">
                <Button
                  intent="success"
                  style={{ width: "45%" }}
                  onClick={() => signOut()}
                >
                  TAK
                </Button>
                <Button
                  className={Classes.POPOVER2_DISMISS}
                  intent="danger"
                  style={{ width: "45%" }}
                >
                  NIE
                </Button>
              </div>
            </div>
          }
        >
          <LinkNavButton
            title="Wyloguj się"
            iconLeft="log-out"
            iconRight="key"
            href=""
          />
        </Popover2>
      )}

      <div
        className="flex w-full flex-col items-stretch"
        style={{ marginLeft: 15 }}
      >
        <NavSegment
          onClick={() => setActive(active !== 0 ? 0 : -1)}
          activeNav={active}
          index={0}
          icon="edit"
          activeColor="255,127,80"
          label="PISMA"
          Contents={PismaNavList}
        />
        <NavSegment
          onClick={() => setActive(active !== 1 ? 1 : -1)}
          icon="new-link"
          activeNav={active}
          index={1}
          activeColor="106,90,205"
          label="KALKULATORY"
          Contents={CalculatorsNavList}
        />
        <NavSegment
          onClick={() => setActive(active !== 2 ? 2 : -1)}
          activeNav={active}
          index={2}
          activeColor="60,179,113"
          label="ARTYKUŁY"
          icon="bookmark"
          Contents={BlogNavList}
        />
      </div>
      <div className="p-2 flex flex-col mt-2"></div>
    </>
  );
};

/**

 * @param activeColor
 * set of rgb values separated by commas, e.g. "255,255,255"
 **/
const NavSegment = ({
  activeNav,
  index,
  label,
  onClick,
  icon,
  activeColor,
  Contents,
}: {
  Contents?: (...any: any) => JSX.Element;
  activeNav: number;
  onClick: () => any;
  index: number;
  label: string;
  icon: IconName;
  activeColor: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <>
      <span
        className="flex w-full items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ paddingTop: 10, cursor: "pointer" }}
        onClick={onClick}
      >
        <Icon
          icon={icon}
          style={{
            background:
              activeNav === index || hovered
                ? `rgb(${activeColor})`
                : `rgba(${activeColor}, 0.2)`,
            borderRadius: 10,
            marginLeft: 8,
            padding: 5,
          }}
          color={
            activeNav === index || hovered ? "white" : `rgb(${activeColor})`
          }
          size={17}
        />
        <h3
          className="text-sm m-2"
          style={{
            color:
              activeNav === index || hovered ? `rgb(${activeColor})` : "black",
          }}
        >
          {label}
        </h3>
      </span>
      <span style={{ marginLeft: 42 }}>
        {Contents ? (
          <Collapse keepChildrenMounted isOpen={activeNav === index}>
            {<Contents color={activeColor} />}
          </Collapse>
        ) : null}
      </span>
    </>
  );
};
export const LinkNavButton = ({
  iconLeft,
  title,
  iconRight,
  href,
  onClick,
}: {
  iconLeft: IconName;
  title: string;
  iconRight: IconName;
  href: string;
  onClick?: any;
}) => (
  <Link href={href}>
    <LinkButton
      onClick={onClick ? onClick : () => {}}
      className="w-full h-12 flex"
      style={{
        alignItems: "center",
        paddingLeft: 10,
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <Icon icon={iconLeft} size={16} className="m-3 p-2" color="grey" />
      <p className="text-sm text-gray-500 m-0">{title}</p>
      <div className="flex-grow" />
      <Icon
        icon={iconRight}
        size={14}
        style={{ marginRight: 20 }}
        color="grey"
      />
    </LinkButton>
  </Link>
);

const LinkButton = styled.span`
  &:hover {
    background: linear-gradient(
      90deg,
      transparent 15%,
      var(--border-color) 100%
    );
    cursor: pointer;
  }
`;

const PismaNavList = ({ active, color }) => {
  return (
    <>
      <ul
        style={{
          marginTop: 10,
          maxWidth: 150,
        }}
      >
        <Link
          href={"/ustawowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku"}
          passHref
        >
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem>
              <Label color={color}>
                Wniosek o stwierdzenie nabycia praw do spadku
              </Label>
              <SubLabel className=" text-gray-400">
                wg dziedziczenia ustawowego
              </SubLabel>
            </ListItem>
          </a>
        </Link>
        <Link
          href={"/testamentowy-wniosek-o-stwierdzenie-nabycia-praw-do-spadku"}
          passHref
        >
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem>
              <Label color={color}>
                Wniosek o stwierdzenie nabycia praw do spadku
              </Label>
              <SubLabel className=" text-gray-400">
                wg dziedziczenia testamentowego
              </SubLabel>
            </ListItem>
          </a>
        </Link>
        <Link href={"/pozew-o-zachowek"} passHref>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem>
              <Label color={color}>Pozew o zachowek</Label>
            </ListItem>
          </a>
        </Link>
        <Link href={"/oswiadczenie-o-odrzuceniu-spadku"} passHref>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem>
              <Label color={color}>Oświadczenie o odrzuceniu spadku</Label>
            </ListItem>
          </a>
        </Link>
        <Link href={"/oswiadczenie-o-przyjeciu-spadku"} passHref>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem>
              <Label color={color}>Oświadczenie o przyjeciu spadku</Label>
            </ListItem>
          </a>
        </Link>

        {/*<Link href={"/pozew-o-zachowek"} passHref>
          <a style={{ textDecoration: "none", color: "inherit" }}> 
            <ListItem>
              <Label color={color}>Wniosek o ustalenie działu spadku</Label>
            </ListItem>
          </a>
      </Link>*/}
      </ul>
    </>
  );
};

const BlogNavList = ({ active, color }) => {
  const [blogArticles, setBlogArticles] = React.useState([]);
  const { getUserRole } = useAuth();

  const fetchBlogArticles = async () => {
    const collectionRef = collection(db, "/blog/");
    let q;

    q = query(collectionRef, where("visible", "==", true));

    const docsData = [];
    const docs = await getDocs(q);

    //@ts-ignore
    docs.forEach((doc) => docsData.push({ ...doc.data(), id: doc.id }));
    setBlogArticles(docsData);
  };

  React.useEffect(() => {
    fetchBlogArticles();
  }, []);
  return (
    <ul
      style={{
        marginTop: 10,
        maxWidth: 150,
      }}
    >
      {blogArticles.map((article) => {
        return (
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href={`/blog/${article.id}`}
          >
            <ListItem>
              <Label color={color}>{article.title}</Label>
              <SubLabel className=" text-gray-400">{article.author}</SubLabel>
            </ListItem>
          </a>
        );
      })}
    </ul>
  );
};

const CalculatorsNavList = ({ active, color }) => {
  return (
    <>
      <ul
        style={{
          marginTop: 10,
          maxWidth: 150,
        }}
      >
        <Link href="/kalkulator" passHref>
          <a
            href="/kalkulator"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <Label color={color}>Kalkulator udziału w spadku</Label>
            </ListItem>
          </a>
        </Link>
        <Link href="/kalkulator-zachowku" passHref>
          <a
            href="/kalkulator-zachowku"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem>
              <Label color={color}>Kalkulator zachowku</Label>
            </ListItem>
          </a>
        </Link>
      </ul>
    </>
  );
};

const ListItem = styled.li`
  white-space: nowrap;
  margin-bottom: 15px;
`;
const Label = styled.p`
  font-size: 13px;
  &:hover {
    font-weight: bold;
    cursor: pointer;

    color: rgb(${(props) => props.color});
  }
  width: 200px !important;
  max-width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubLabel = styled.p`
  color: var(grey);
  line-height: 0.4;
  font-size: 11px;
  margin-bottom: 5px;
`;
