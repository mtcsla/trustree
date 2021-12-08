import md5 from "md5";
import { html } from "../../payment-session-deliver";

export function getMailTemplate({ email, id, origin }: any) {
  return html`
    <html>
      <body
        style="width: 100%; margin: 0px; height: 100%; background: transparent"
      >
        <table
          style="width: 100%; margin: 0px;"
          cellspacing="0"
          cellpadding="0"
        >
          <tbody style="width: 100%">
            <tr>
              <td style="width: 100%; height: 40px; background: #001529" />
            </tr>
            <tr>
              <td
                style="
              width: 100%;
              height: 100px;
              border-bottom: 1px solid #e6e6e6;
              text-align: center;
            "
              >
                <div style="display: inline-block; height: 80px">
                  <img
                    src="cid:logo"
                    style="height: 80px; width:274px; display: inline-block"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
              width: 100%;
              height: calc(100% - 180px);
              padding: 20px;
              background: #f7fafd;
            "
              >
                <h1
                  style="
                width: 100%;
                text-align: center;
                margin-top: 0;
                font-family: Trebuchet MS, sans-serif;
              "
                >
                  Wykonaliśmy Twoje pismo.
                </h1>
                <p
                  style="
                text-align: center;
                font-family: 'Verdana', sans-serif;
                font-size: 14px;
              "
                >
                  Kliknij
                  <a
                    style="text-decoration: none"
                    href="${origin}/odbierz?id=${id}&col=${md5(email)}"
                    >tutaj</a
                  >
                  aby przejść do strony, na której możesz pobrać lub wydrukować
                  swój dokument.
                </p>
                <div
                  style="width: calc(100% - 40px); border-top: 1px solid #e6e6e6"
                />
              </td>
            </tr>
            <tr>
              <td style="background: #f7fafd; text-align: center;">
                <p
                  style="display: inline-block; font-size: 12px; width: calc(100% - 40px); margin-bottom: 20px; text-align: center; font-family: 'Verdana', sans-serif;"
                >
                  Pamiętaj, aby nie udostępniać tego linka, ani nie przekazywać
                  tego maila <b>NIKOMU</b>. Administracja serwisu Trustree nigdy
                  nie poprosi Cię o żadną z tych rzeczy.
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="
              width: 100%;
              margin-top: 20px;
              padding: 5px;
              box-sizing: border-box;
              max-height: 25px;
              background:	#001529;
              color: white;
            "
              >
                <p
                  style="
                width: 100%;
                padding: 0px;
                margin: 0px;
                text-align: center;
                font-family: Verdana, sans-serif;
                font-size: 12px;
              "
                >
                  Trustree © 2021
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
}
