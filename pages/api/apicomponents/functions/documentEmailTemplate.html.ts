import { html } from "../../payment-intent-succeeded";
import * as md5 from "md5";

export const getTemplate = (email, id, name, testing?: boolean) => {
  return html` <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,600;0,70;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");

          h1,
          h2,
          h3,
          h4,
          h5 {
            white-space: normal;
            font-family: "Montserrat", sans-serif;
            font-weight: 500 !important;
          }
          @media (min-width: 600px) {
            .ant-card {
              padding: 20px;
            }
          }

          main,
          section {
            min-height: auto !important;
          }
          :root {
            --grey-deep: rgb(88, 88, 88);
            --grey: rgb(143, 143, 143);
            --grey0: #f5f5f5;
            --grey1: #eeeeee;
            --grey2: #f5f5f5;
            --grey3: #eeecec;
            --grey4: #ffffff;
            --grey5: #e6e6e6;
            --grey6: #e0f4ff;
            --grey7: #91caff;
            --grey8: #636363;
            --layout-bg: #f0f2f5;
            --error-red: #f84267;
            --dark: rgb(0, 21, 41);
            --dark2: rgb(0, 18, 34);
            --dark3: rgb(8, 30, 51);

            --white1: #f7e4ff;
            --newGrad1: linear-gradient(
              135deg,
              rgba(233, 94, 0, 1) 0%,
              rgba(245, 142, 20, 1) 20%,
              rgba(255, 179, 35, 1) 41%,
              rgba(255, 200, 70, 1) 77%,
              rgba(249, 212, 65, 1) 100%
            );

            --newGrad1: linear-gradient(
              135deg,
              rgba(71, 73, 215, 1) 0%,
              rgba(107, 127, 218, 1) 12%,
              rgb(80, 139, 233) 31%,
              rgba(108, 214, 252, 1) 72%,
              rgba(127, 215, 235, 1) 100%
            );
            --blue: #1890ff;
            --blue1: rgb(0, 112, 218);
            --blue2: #0d4477;
            --blue3: #88c5ff;
            --blue4: rgb(0, 106, 206);
            --blue5: rgb(6, 70, 129);

            --font1: "Lato", sans-serif;
            --font2: "Open Sans", sans-serif;
            --font3: "Montserrat", sans-serif;
          }
          * {
            box-sizing: border-box;
          }
          p {
            font-family: "Lato", sans-serif;
            font-size: 13px;
          }
          html,
          body,
          #__next {
            font-size: 16px;
            padding: 0;
            margin: 0;
            font-family: "Lato", sans-serif;
            color: rgb(59, 59, 59);
            background: var(--layout-bg);
            display: flex;
            flex-direction: column;
            align-items: stretch;
            height: 100%;
            width: 100%;
            font-weight: 300;
          }
          h4 {
            font-size: 15px;
          }
          .header {
            width: 100%;
            height: 90px;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--dark);
          }

          .body {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
          }
          .mainbody {
            padding: 30px;
            display: flex;
            color: whitesmoke;
            text-align: center;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
            background: var(--dark2);
          }
          .mainbody-inset {
            display: flex;
            flex-direction: column;

            align-items: center;
          }
          .content {
            flex: 1;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
          }
          .footer {
            width: 100%;
            background: var(--dark);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sider {
            height: 100%;
            width: 40%;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: space-evenly;
            background: var(--dark3);
            padding: 30px;
          }
          .content-main {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 30px;
            align-items: center;
            justify-content: center;
            width: 60%;
          }
          .icon {
            margin-left: 30px;
            margin-right: 30px;
            height: 70px;
          }
          .sider-inset {
            background: var(--dark2);
            padding: 30px;
            width: 100%;
            color: whitesmoke;
            margin: 20px;
          }
          .button {
            background: var(--blue);
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: whitesmoke;
            width: 90%;
            height: 100px;
            text-align: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }
          @media (max-width: 800px) {
            .sider-inset {
              padding: 15px;
              margin: 10px;
            }
          }
          @media (max-width: 600px) {
            .sider {
              width: 100%;
              height: auto;
            }
            .content-main {
              width: 100%;
              height: auto;
            }
            .mainbody {
              flex-direction: column;
            }
            .sider-inset {
              padding: 30px;
              margin: 20px;
            }
          }
        </style>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div class="header">
          <img
            src="https://www.trustree.pl/img/banner-dark.svg"
            style="height: 100%;"
          />
        </div>
        <div class="body">
          <div class="mainbody">
            <img
              src="https://www.trustree.pl/img/logo.svg"
              alt=""
              class="icon"
            />
            <div class="mainbody-inset">
              <h4 style="margin-bottom: 0px;">
                Wykonaliśmy ${name}, zakupione przez Ciebie pismo.
              </h4>
              <p>Przejdź do strony, aby odebrać swój dokument.</p>
            </div>
          </div>
          <div class="content">
            <div class="content-main">
              <h4
                style="background: #fff; padding: 30px; max-width: 85%; text-align: center;"
              >
                Odbierz swoje pismo, ${name}, tutaj:
              </h4>
              <div class="button">
                <h2>
                  <a
                    href="${testing
                      ? "http://localhost:3000/"
                      : "https://trustree.pl/"}documents/${md5(
                      email
                    )}/owned/${id}"
                    >KLIKNIJ</a
                  >a>
                </h2>
              </div>
              <p style="text-align: center;">
                Kliknięcie w link przekieruje Cię do naszej strony, gdzie możesz
                pobrać swoje pismo. Pismo możesz pobrać wielokrotnie, zachowaj
                więc tego maila na wypadek, gdyby pismo było znowu potrzebne.
              </p>
            </div>
            <div class="sider">
              <div class="sider-inset">
                <h4 style="margin-bottom: 0px;">
                  Pamiętaj, aby nie udostępniać nikomu ani tego maila, ani linka
                  do pisma.
                </h4>
                <p>
                  Pismo zawiera poufne dane osobowe, które mogą okazać się
                  niebezpieczne w złych rękach.
                </p>
              </div>
              <div class="sider-inset">
                <h4 style="margin-bottom: 0px;">
                  Zachowaj tego maila - link do pisma jest wielorazowy.
                </h4>
                <p>
                  Możesz wrócić do pisma i pobrać je ponownie, kiedy tylko
                  najdzie cię ta ochota.
                </p>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Trustree © 2021</p>
          </div>
        </div>
      </body>
    </html>`;
};
