import moment from "moment";

import { getMonth } from "./functions/polish-months";
function html(strings, ...tags) {
  let str = strings[0];
  for (let i = 0; i < tags.length; i++) {
    str += tags[i] + strings[i + 1];
  }
  return str;
}

export const determineRelation = (a, b) => "xd";

export const hereditaryRightsApplicationTestament_pl = (metadata: any) => {
  const date = new Date();

  const isTestatorMale = metadata.testator.gender === "mężczyzna";
  const isHereditaryMale = metadata.hereditary.gender === "mężczyzna";

  let inventoryNames = [],
    noRestraintsNames = [],
    namesAndAddresses = "",
    namesRelationsAndParts =
      metadata.otherHereditaries.length > 0
        ? html`${determineRelation(
            metadata.hereditary.relation,
            metadata.hereditary.gender
          )}
          ${metadata.hereditary.name}, w części ${metadata.hereditary.part},
          html`
        : "",
    namesAndRelations = "";

  for (const i of metadata.otherHereditaries) {
    namesAndAddresses += html`${i.name}, ${i.address}<br />`;
    namesRelationsAndParts += html`${determineRelation(i.relation, i.gender)}
    ${i.name}, w części
    ${i.part}${metadata.otherHereditaries.indexOf(i) ===
    metadata.otherHereditaries.length - 1
      ? "."
      : ", "}`;
    namesAndRelations += html`${i.name},
    ${determineRelation(i.relation, i.gender)}
    ${i.relation !== 0
      ? html`spadkodaw${isTestatorMale ? "cy" : "czyni"}`
      : ""}${metadata.otherHereditaries.indexOf(i) ===
    metadata.otherHereditaries.length - 1
      ? "."
      : ", "}`;
    if (!i.type) {
      noRestraintsNames.push(i.name);
    } else inventoryNames.push(i.name);
  }

  if (!metadata.hereditary.type)
    noRestraintsNames.push(metadata.hereditary.name);
  else inventoryNames.push(metadata.hereditary.name);

  const whichType = noRestraintsNames.length < inventoryNames.length;

  return html` <html>
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
            ? html`Uczestnicy postępowania: <br />
                ${namesAndAddresses} <br />`
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
          .toLocaleDateString("pl-PL")}
        w miejscowości ${metadata.testator.deathPlace}, ostatnio
        zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
        ${metadata.testator.address}, na podstawie testamentu sporządzonego w
        dniu
        ${moment(metadata.testament.date).toDate().toLocaleDateString("pl-PL")}
        przez spadkodawc${isTestatorMale ? "ę" : "zynię"} w trybie art. 949 § 1
        kc,
        ${metadata.otherHereditaries.length === 0
          ? html`nabył${isHereditaryMale ? "" : "a"}
            ${metadata.hereditary.name},
            ${determineRelation(
              metadata.hereditary.relation,
              metadata.hereditary.gender
            )}
            spadkodawcy w
            ${!metadata.hereditary.part
              ? "całości"
              : "części " + metadata.hereditary.part}.`
          : html`nabyli: ${namesRelationsAndParts}`}

        <br /><br />&nbsp;&nbsp;&nbsp;&nbsp; 2. otwarcie i ogłoszenie
        testamentu, który sporządził${isTestatorMale ? "" : "a"}
        ${metadata.testator.name} z dnia
        ${moment(metadata.testament.date).toDate().toLocaleDateString("pl-PL")},
        sporządzonego w trybie art. 949 §1 kc.<br /><br />
        Ponadto wnoszę o:<br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp; 3. rozstrzygnięcie co do kosztów postępowania
        wg norm przepisanych.<br /><br />
        <h3 style="text-align: center;">Uzasadnienie</h3>

        Spadkodawc${isTestatorMale ? "a" : "zyni"}, ${metadata.testator.name},
        ostatnio zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
        ${metadata.testator.address}, zmarł${isTestatorMale ? "" : "a"} w
        miejscowości ${metadata.testator.deathPlace} w dniu
        ${moment(metadata.testator.deathDate)
          .toDate()
          .toLocaleDateString("pl-PL")}.
        <br /><br />

        Wnioskodawc${isHereditaryMale ? "a" : "zyni"} to
        ${metadata.hereditary.name},
        ${metadata.hereditary.relation === 0
          ? "spadkobierca powołany na podstawie testamentu"
          : html`${determineRelation(
              metadata.hereditary.relation,
              metadata.hereditary.gender
            )}
            spadkodawc${isTestatorMale ? "y" : "zyni"}`}.
        ${metadata.otherHereditaries.length > 0
          ? html`Pozostali uczestnicy to: ${namesAndRelations}`
          : ""}
        <br /><br />
        Dowód: <br />&nbsp;&nbsp;&nbsp;&nbsp;1) odpis skrócony aktu zgonu
        spadkodawc${isTestatorMale ? "y" : "zyni"} z
        ${metadata.testator.uscName} z dnia
        ${moment(metadata.testator.deathDate)
          .toDate()
          .toLocaleDateString("pl-PL")}
        nr ${metadata.testator.number},<br />
        &nbsp;&nbsp;&nbsp;&nbsp;2) odpis skrócony aktu
        ${(metadata.hereditary.changedSurname ||
        metadata.hereditary.relation === 1
          ? "małżeństwa"
          : "urodzenia") +
        (metadata.hereditary.relation === 3
          ? html` spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : html` wnioskodawc${isHereditaryMale ? "y" : "zyni"}`)}
        z ${metadata.hereditary.act.uscName} z dnia
        ${moment(metadata.hereditary.act.date)
          .toDate()
          .toLocaleDateString("pl-PL")},
        nr ${metadata.hereditary.act.number}.<br />
        ${getFurtherProof(metadata, isTestatorMale)}
        <br /><br />
        II.
        ${!metadata.testament.isNotarial
          ? html`W dniu
            ${moment(metadata.testament.date)
              .toDate()
              .toLocaleDateString("pl-PL")},
            spadkodawc${isTestatorMale ? "a" : "zyni"}
            oświadczył${isTestatorMale ? "" : "a"} swą ostatnią wolę w trybie
            art. 949 kc na piśmie i opatrzył${isTestatorMale ? "" : "a"}
            testament własnoręcznym podpisem.`
          : html`Zmarł${isTestatorMale ? "y" : "a"}
            pozostawił${isTestatorMale ? "" : "a"} testament notarialny,
            sporządzony w dniu
            ${moment(metadata.testament.date)
              .toDate()
              .toLocaleDateString("pl-PL")}
            przed notariuszem: ${metadata.testament.notarial.name}, w Kancelarii
            Notarialnej w miejscowości ${metadata.testament.notarial.city}, Rep.
            ${metadata.testament.notarial.repository} nr
            ${metadata.testament.notarial.number}.`}
        <br /><br />
        Dowód:
        ${!metadata.testament.isNotarial
          ? html`oryginał testamentu z dnia
            ${moment(metadata.testament.date)
              .toDate()
              .toLocaleDateString("pl-PL")}`
          : html`wypis aktu notarialnego zawierającego testament`}
        <br /><br />
        III. Zapewniam w trybie art. 671 kpc, iż niniejszym sporządzony w trybie
        art. 949 §1 kc testament jest jedynym i wyłącznym testamentem
        spadkodawc${isTestatorMale ? "y" : "zyni"}.
        Spadkodawc${isTestatorMale ? "a" : "zyni"} tegoż testamentu nie
        odwołał${isTestatorMale ? "" : ""}.
        <br /><br />
        Ponadto, na podstawie art.1012, art.1018 i art.1026 kc., wnoszę o
        odebranie na pierwszym posiedzeniu w tejże sprawie,
        ${metadata.otherHereditaries.length === 0
          ? html`oświadczenia o przyjęciu spadku
            ${metadata.hereditary.part
              ? "z dobrodziejstwem inwentarza"
              : "bez ograniczeń"}
            od wnioskodawcy (${metadata.hereditary.name}), składanego w imieniu
            własnym.`
          : html`oświadczeń o przyjęciu spadku
            ${whichType
              ? html`z dobrodziejstwem inwentarza `
              : html`bez ograniczeń`}
            od następujących osób:
            ${getNamesString(whichType ? inventoryNames : noRestraintsNames)}${(
              whichType
                ? noRestraintsNames.length > 0
                : inventoryNames.length > 0
            )
              ? html`, natomiast oświadczeń o przyjęciu spadku
                ${whichType
                  ? html`bez ograniczeń`
                  : html`z dobrodziejstwem inwentarza`}
                od następujących osób:
                ${getNamesString(
                  whichType ? noRestraintsNames : inventoryNames
                )}`
              : ""}.
            html`}
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
        &nbsp;&nbsp;&nbsp;&nbsp;2.
        ${metadata.testament.isNotarial
          ? html`Oryginał testamentu z dnia
            ${moment(metadata.testament.date)
              .toDate()
              .toLocaleDateString("pl-PL")},
            plus kserokopia`
          : "Odpis testamentu"},<br />
        &nbsp;&nbsp;&nbsp;&nbsp;3. Odpis skrócony aktu zgonu spadkodawcy, plus
        kserokopia, <br />
        &nbsp;&nbsp;&nbsp;&nbsp;4. Odpis skrócony aktu
        ${metadata.hereditary.relation === 1 ||
        metadata.hereditary.changedSurname
          ? "małżeństwa"
          : "urodzenia"}
        ${metadata.hereditary.relation === 3
          ? html`spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : html`wnioskodawc${isHereditaryMale ? "y" : "zyni"}`},
        plus kserokopia, <br />
        ${getFurtherActs(metadata, isTestatorMale)}
      </body>
    </html>
    html`;
};

function getFurtherProof(metadata, isTestatorMale) {
  let furtherProof = "";
  let number = 3;
  for (const i of metadata.otherHereditaries) {
    if (!i["act.date"] || !i["act.number"] || !i["act.uscName"]) {
      continue;
    }
    furtherProof += html`&nbsp;&nbsp;&nbsp;&nbsp;${number}) odpis skrócony aktu
      ${(i.changedSurname || i.relation === 1 ? "małżeństwa" : "urodzenia") +
      (metadata.hereditary.relation !== 3 && i.relation === 3
        ? html` spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : html` spadkobiercy: ${i.name}`)}
      z ${i["act.uscName"]} z dnia
      ${moment(i["act.date"]).toDate().toLocaleDateString("pl-PL")}, nr
      ${i["act.number"]}<br />
      html`;
    number += 1;
  }
  return furtherProof;
}

function getFurtherActs(metadata, isTestatorMale) {
  let furtherActs = "";
  let number = 5;
  for (const i of metadata.otherHereditaries) {
    if (!i["act.date"] || !i["act.number"] || !i["act.uscName"]) {
      continue;
    }
    furtherActs += html`&nbsp;&nbsp;&nbsp;&nbsp;${number}. Odpis skrócony aktu
      ${(i.changedSurname || i.relation === 1 ? "małżeństwa" : "urodzenia") +
      (metadata.hereditary.relation !== 3 && i.relation === 3
        ? html` spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : html` spadkobierc${i.gender === "mężczyzna" ? "y" : "zyni"}: ${i.name}`)},
      plus kserokopia,<br />
      html`;
    number += 1;
  }
  return furtherActs;
}

const getNamesString = (namesArray: any[]) => {
  let names = html``;
  for (const otherHereditary of namesArray) {
    names += html`${otherHereditary}${namesArray.indexOf(otherHereditary) ===
    namesArray.length - 1
      ? ""
      : ", "}`;
  }
  console.log("names2", names);
  return names;
};
