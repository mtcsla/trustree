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
  console.log({ metadata });
  const isTestatorMale = metadata.deadGender == 0;

  return html`

      <div
        style="color: black; font-family: 'Montserrat', sans-serif !important; margin: 3rem"
      >
        <p style="text-align: right; width: 100%">
          ${metadata.city}, ${date.getDate()} ${getMonth(date.getMonth())}
          ${date.getFullYear()}<br /><br />
          ${metadata.courtName}<br />
          ${metadata.courtNumber} Wydział Cywilny<br />
          ${metadata.courtAddress}<br /><br />
          Wnioskodawca: <br/>${metadata.name},<br />
          zamieszkały pod adresem ${metadata.street}, ${metadata.postal}
           ${metadata.city}<br /><br />
          ${
            metadata?.otherHereditaries.length
              ? "Uczestnicy postępowania:<br>"
              : ""
          }
          ${
            metadata?.otherHereditaries.length
              ? `${(() => {
                  let otherHereditaries = "";
                  metadata.otherHereditaries.map((hereditary) => {
                    otherHereditaries +=
                      hereditary.name +
                      ",<br>zamieszkały pod adresem " +
                      hereditary.address +
                      "<br>";
                  });
                  return otherHereditaries;
                })()}`
              : ""
          }
        </p>
        <br /><br />
        <h3 style="text-align: center;">OŚWIADCZENIE O ODRZUCENIU SPADKU</h3>
        <p>
          <br />
          Niniejszym odrzucam spadek, który pozostawił${
            isTestatorMale ? "" : "a"
          } mi ${metadata.deadName},
          zmarł${isTestatorMale ? "y" : "a"} w miejscowości ${
    metadata.deadCity
  } w dniu
          ${new Date(metadata.deadDate).toLocaleDateString(
            "pl-PL"
          )}, ostatnio zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
          ${metadata.deadAddress}. <br /><br />

          Dowód: 
            <ol>
              <li>
                odpis skrócony aktu zgonu spadkodawc${
                  isTestatorMale ? "y" : "zyni"
                } z ${metadata.deadActUscName} z dnia ${new Date(
    metadata.deadDate
  ).toLocaleDateString("pl-PL")}, nr ${metadata.deadActNumber},
              </li>
            </ol>
          <br><br>

          ${
            metadata?.otherHereditaries.length && metadata.testament != 1
              ? `Do grona spadkobierców, poza składającym to oświadczenie, wchodzą również: ${(() => {
                  let otherHereditaries = metadata.otherHereditaries.map(
                    (hereditary) => {
                      return `${hereditary.name}, ${getRelation(
                        hereditary.relation,
                        hereditary.gender
                      )} spadkodawcy`;
                    }
                  );
                  return otherHereditaries.join(", ") + ".<br>";
                })()}
`
              : ""
          }<br />
          Według wiedzy składającego to oświadczenie, zmarł${
            isTestatorMale ? "y" : "a"
          }
          ${metadata.deadName} ${
    metadata.testament != 1
      ? `nie pozostawił${
          isTestatorMale ? "" : "a"
        } po sobie żadnego testamentu.`
      : `pozostawił${isTestatorMale ? "" : "a"} po sobie testament.`
  }<br /><br />
        </p>
        <p style="text-align: right;">
          Podpis urzędowo poświadczony<br />
          <br>
        </p>
        <br/>
        <p style="text-align: left;">
        Załączniki:
      </p>
      <ol>
        <li>odpis skrócony aktu zgonu spadkodawc${
          isTestatorMale ? "y" : "zyni"
        }: ${metadata.deadName}</li>
       
      </ol>
      </div>

  `;
};

const getRelation = (relation, gender) => {
  const isMale = gender == 0;
  switch (relation) {
    case 1:
      return isMale ? "mąż" : "żona";
    case 2:
      return isMale ? "brat" : "siostra";
    case 3:
      return isMale ? "ojciec" : "matka";
    case 4:
      return isMale ? "syn" : "córka";
    case 5:
      return isMale ? "wnuk" : "wnuczka";
    case 6:
      return isMale ? "siostrzeniec" : "siostrzenica";
  }
};
