import { getMonth } from "./functions/polish-months";
function html(strings, ...tags) {
  let str = strings[0];
  for (let i = 0; i < tags.length; i++) {
    str += tags[i] + strings[i + 1];
  }
  return str;
}

export const hereditaryRefusalDeclaration_pl = (metadata: any) => {
  const date = new Date();

  return html`
    <html>
      <body
        style="color: black; font-family: Times New Roman, sans-serif; margin: 3rem"
      >
        <p style="text-align: right; width: 100%">
          ${metadata.hereditary.city}, ${date.getDate()}
          ${getMonth(date.getMonth())} ${date.getFullYear()}<br /><br />
          Sąd Rejonowy<br /><br />
          Wnioskodawca: ${metadata.hereditary.name},<br />
          zamieszkały pod adresem ul. ${metadata.hereditary.street},
          ${metadata.hereditary.postal} ${metadata.hereditary.city}<br /><br />
          Uczestnicy postępowania:
          ${metadata.hereditaries
            ? `${(() => {
                let hereditaries = "";
                metadata.hereditaries.map((hereditary) => {
                  hereditaries +=
                    hereditary.name +
                    ",<br>zamieszkały pod adresem " +
                    hereditary.address +
                    "<br>";
                });
                return hereditaries;
              })()}`
            : ""}
        </p>
        <br /><br />
        <h3 style="text-align: center;">OŚWIADCZENIE O ODRZUCENIU SPADKU</h3>
        <p>
          <br />
          Niniejszym odrzucam spadek, który pozostawił mi
          ${metadata.testator.name}, zmarły w miejscowości
          ${metadata.testator.deathAddress} w dniu
          ${metadata.testator.deathDate}, ostatnio zamieszkały w miejscowości
          ${metadata.testator.address}. <br /><br />
          Spadek odrzucam, będąc powołany do dziedziczenia po zmarłym na
          podstawie ustawy.
          ${metadata.hereditaries && metadata.hereditaries !== []
            ? `Do grona spadkobierców, poza składającym to oświadczenie, wchodzą również: ${(() => {
                let hereditaries = metadata.hereditaries.map((hereditary) => {
                  return hereditary.name;
                });
                return hereditaries.join(", ");
              })()}.
`
            : "Poza składającym oświadczenie nie ma żadnych innych spadkobierców."}<br /><br />
          Według wiedzy składającego to oświadczenie, zmarły
          ${metadata.testator.name} nie pozostawił po sobie żadnego
          testamentu.<br /><br />
        </p>
        <p style="text-align: right;">
          Podpis<br />
          ${metadata.hereditary.name}
        </p>
      </body>
    </html>
  `;
};
