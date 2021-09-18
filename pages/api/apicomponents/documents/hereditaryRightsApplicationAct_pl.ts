import moment from "moment";
import { determineRelation } from "./hereditaryRightsApplicationTestament_pl";
import { getMonth } from "./functions/polish-months";

function html(strings, ...tags) {
  let str = strings[0];
  for (let i = 0; i < tags.length; i++) {
    str += tags[i] + strings[i + 1];
  }
  return str;
}

export const hereditaryRightsApplicationAct_pl = (metadata: any) => {
  const date = new Date();
  console.log(metadata);

  const isTestatorMale = metadata.testator.gender === "mężczyzna";
  const isHereditaryMale = metadata.hereditary.gender === "mężczyzna";

  let inventoryNames = [],
    noRestraintsNames = [],
    namesAndAddresses = "",
    namesRelationsAndParts =
      metadata.otherHereditaries.length > 0
        ? `${determineRelation(
            metadata.hereditary.relation,
            metadata.hereditary.gender
          )} ${metadata.hereditary.name}, w części ${
            metadata.hereditary.part
          }, `
        : "",
    namesAndRelations = "";

  for (const i of metadata.otherHereditaries) {
    namesAndAddresses += `${i.name}, ${i.address}<br>`;
    namesRelationsAndParts += `${determineRelation(i.relation, i.gender)} ${
      i.name
    }, w części ${i.part}${
      metadata.otherHereditaries.indexOf(i) ===
      metadata.otherHereditaries.length - 1
        ? "."
        : ", "
    }`;
    namesAndRelations += `${i.name}, ${determineRelation(
      i.relation,
      i.gender
    )} ${
      i.relation !== 0 ? `spadkodaw${isTestatorMale ? "cy" : "czyni"}` : ""
    }${
      metadata.otherHereditaries.indexOf(i) ===
      metadata.otherHereditaries.length - 1
        ? "."
        : ", "
    }`;
    if (!i.type) {
      noRestraintsNames.push(i.name);
    } else inventoryNames.push(i.name);
  }

  if (!metadata.hereditary.type)
    noRestraintsNames.push(metadata.hereditary.name);
  else inventoryNames.push(metadata.hereditary.name);

  const whichType = noRestraintsNames.length < inventoryNames.length;

  return html`
    <html>
      <head></head>
      <body style="font-family: Times New Roman, sans-serif;">
        <div style="width: 50%; margin-left: 50%; text-align: right;">
          ${metadata.hereditary.city}, ${date.getDate()}
          ${getMonth(date.getMonth())} ${date.getFullYear()}<br /><br />

          ${metadata.court.name}<br />
          ${metadata.court.number} Wydział Cywilny<br />
          ${metadata.court.address}<br />
          <br /><br />
          Wnioskodawc${isHereditaryMale ? "a" : "zyni"}:
          ${metadata.hereditary.name}, nr. PESEL: ${metadata.hereditary.pesel},
          zamieszkał${isHereditaryMale ? "y" : "a"} pod adresem
          ${metadata.hereditary.address}, ${metadata.hereditary.postal}
          ${metadata.hereditary.city}<br />
          ${metadata.otherHereditariesLength > 0
            ? `Uczestnicy postępowania: <br>
    ${namesAndAddresses} <br>`
            : ""}<br />
        </div>

        <h2 style="text-align: center;">
          Wniosek o stwierdzenie nabycia praw do spadku
        </h2>

        W imieniu własnym uprzejmie wnoszę o:<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;
        1. stwierdzenie, że spadek, który pozostawił${isTestatorMale ? "" : "a"}
        ${metadata.testator.name}, zmarł${isTestatorMale ? "y" : "a"} w dniu
        ${moment(metadata.testator.deathDate)
          .toDate()
          .toLocaleDateString("en-GB")}
        w miejscowości ${metadata.testator.deathPlace}, ostatnio
        zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
        ${metadata.testator.address}, w trybie dziedziczenia ustawowego
        ${metadata.otherHereditaries.length === 0
          ? `nabył${isHereditaryMale ? "" : "a"} ${
              metadata.hereditary.name
            }, ${determineRelation(
              metadata.hereditary.relation,
              metadata.hereditary.gender
            )} spadkodawcy w ${
              metadata.hereditary.part === 100
                ? "całości"
                : "części " + metadata.hereditary.part
            }.`
          : `nabyli: ${namesRelationsAndParts}`}
        ${
          "" /*"nabył/a [syn etc.] [imię, nazwisko] w całości/części [...] lub nabyli: [żona, córka etc.] [imię, nazwisko] w części [...] etc. (kolejne osoby)"*/
        } <br /><br />
        Ponadto wnoszę o:<br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp; 2. rozstrzygnięcie co do kosztów postępowania
        wg norm przepisanych.<br /><br />
        <h3 style="text-align: center;">Uzasadnienie</h3>

        Spadkodawc${isTestatorMale ? "a" : "zyni"}, ${metadata.testator.name},
        ostatnio zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
        ${metadata.testator.address}, zmarł${isTestatorMale ? "" : "a"} w
        miejscowości ${metadata.testator.deathPlace} w dniu
        ${moment(metadata.testator.deathDate)
          .toDate()
          .toLocaleDateString("en-GB")}.
        <br /><br />

        Wnioskodawc${isHereditaryMale ? "a" : "zyni"} to
        ${metadata.hereditary.name},
        ${metadata.hereditary.relation === 0
          ? "spadkobierca powołany na podstawie testamentu"
          : `${determineRelation(
              metadata.hereditary.relation,
              metadata.hereditary.gender
            )} spadkodawc${isTestatorMale ? "y" : "zyni"}`}.
        ${metadata.otherHereditaries.length > 0
          ? `Pozostali uczestnicy to: ${namesAndRelations}`
          : ""}
        <br /><br />
        Dowód: <br />&nbsp;&nbsp;&nbsp;&nbsp;1) odpis skrócony aktu zgonu
        spadkodawc${isTestatorMale ? "y" : "zyni"} z
        ${metadata.testator.uscName} z dnia
        ${moment(metadata.testator.deathDate)
          .toDate()
          .toLocaleDateString("en-GB")}
        nr ${metadata.testator.number},<br />
        &nbsp;&nbsp;&nbsp;&nbsp;2) odpis skrócony aktu
        ${(metadata.hereditary.changedSurname ||
        metadata.hereditary.relation === 1
          ? "małżeństwa"
          : "urodzenia") +
        (metadata.hereditary.relation === 3
          ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : ` wnioskodawc${isHereditaryMale ? "y" : "zyni"}`)}
        z ${metadata.hereditary.act.uscName} z dnia
        ${moment(metadata.hereditary.act.date)
          .toDate()
          .toLocaleDateString("en-GB")},
        nr ${metadata.hereditary.act.number}.<br />
        ${getFurtherProof(metadata, isTestatorMale)}
        <br /><br />
        II. Wnioskodawc${isHereditaryMale ? "a" : "zyni"} w trybie art. 671 kpc
        stwierdza, iż spadkodawc${isTestatorMale ? "a" : "zyni"} nie
        pozostawił${isTestatorMale ? "" : "a"} po sobie żadnego testamentu.

        <br /><br />

        Ponadto, na podstawie art.1012, art.1018 i art.1026 kc., wnoszę o
        odebranie na pierwszym posiedzeniu w tejże sprawie,
        ${metadata.otherHereditaries.length === 0
          ? `oświadczenia o przyjęciu spadku ${
              metadata.hereditary.part
                ? "z dobrodziejstwem inwentarza"
                : "bez ograniczeń"
            } od wnioskodawcy (${
              metadata.hereditary.name
            }), składanego w imieniu własnym.`
          : `oświadczeń o przyjęciu spadku ${
              whichType
                ? `z dobrodziejstwem inwentarza
`
                : `bez ograniczeń`
            } od następujących osób: ${getNamesString(
              whichType ? inventoryNames : noRestraintsNames
            )}${
              (
                whichType
                  ? noRestraintsNames.length > 0
                  : inventoryNames.length > 0
              )
                ? `, natomiast oświadczeń o przyjęciu spadku ${
                    whichType
                      ? `bez ograniczeń`
                      : `z dobrodziejstwem inwentarza`
                  } od następujących osób: ${getNamesString(
                    whichType ? noRestraintsNames : inventoryNames
                  )}`
                : ""
            }.
      `}
        <br /><br />
        Mając powyższe na uwadze, uprzejmie wnoszę jak na wstępie.<br /><br />

        Podpis:<br /><br /><br />

        Załączniki:<br /><br />

        &nbsp;&nbsp;&nbsp;&nbsp;1. ${1 + metadata.otherHereditaries.length}
        odpis${metadata.otherHereditaries.length > 1 &&
        metadata.otherHereditaries.length < 5
          ? "y"
          : metadata.otherHereditaries.length >= 5
          ? "ów"
          : ""}
        wniosku o stwierdzenie nabycia spadku,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;2. Odpis skrócony aktu zgonu spadkodawcy, plus
        kserokopia, <br />
        &nbsp;&nbsp;&nbsp;&nbsp;3. Odpis skrócony aktu
        ${metadata.hereditary.relation === 1 ||
        metadata.hereditary.changedSurname
          ? "małżeństwa"
          : "urodzenia"}
        ${metadata.hereditary.relation === 3
          ? `spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : `wnioskodawc${isHereditaryMale ? "y" : "zyni"}`},
        plus kserokopia, <br />
        ${getFurtherActs(metadata, isTestatorMale)}
      </body>
    </html>
  `;
};

function getFurtherProof(metadata, isTestatorMale) {
  let furtherProof = "";
  let number = 3;
  for (const i of metadata.otherHereditaries) {
    if (!i["act.date"] || !i["act.number"] || !i["act.uscName"]) {
      continue;
    }
    furtherProof += `&nbsp;&nbsp;&nbsp;&nbsp;${number}) odpis skrócony aktu ${
      (i.changedSurname || i.relation === 1 ? "małżeństwa" : "urodzenia") +
      (metadata.hereditary.relation !== 3 && i.relation === 3
        ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : ` spadkobiercy: ${i.name}`)
    } z ${i["act.uscName"]} z dnia ${moment(i["act.date"])
      .toDate()
      .toLocaleDateString("en-GB")}, nr ${i["act.number"]}<br> `;
    number += 1;
  }
  return furtherProof;
}

function getFurtherActs(metadata, isTestatorMale) {
  let furtherActs = "";
  let number = 4;
  for (const i of metadata.otherHereditaries) {
    if (!i["act.date"] || !i["act.number"] || !i["act.uscName"]) {
      continue;
    }
    furtherActs += `&nbsp;&nbsp;&nbsp;&nbsp;${number}. Odpis skrócony aktu ${
      (i.changedSurname || i.relation === 1 ? "małżeństwa" : "urodzenia") +
      (metadata.hereditary.relation !== 3 && i.relation === 3
        ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : ` spadkobierc${i.gender === "mężczyzna" ? "y" : "zyni"}: ${i.name}`)
    }, plus kserokopia,<br> `;
    number += 1;
  }
  return furtherActs;
}

const getNamesString = (namesArray: any[]) => {
  let names = ``;
  for (const otherHereditary of namesArray) {
    names += `${otherHereditary}${
      namesArray.indexOf(otherHereditary) === namesArray.length - 1 ? "" : ", "
    }`;
  }
  console.log("names2", names);
  return names;
};
