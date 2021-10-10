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
  if (!metadata.share) {
    metadata.otherHereditaries = [];
  }

  const isTestatorMale = metadata.deadGender == 0;
  const isHereditaryMale = metadata.gender == 0;

  let inventoryNames = [],
    noRestraintsNames = [],
    namesAndAddresses = "",
    namesRelationsAndParts =
      metadata.otherHereditaries.length > 0
        ? `${determineRelation(metadata.relation, metadata.gender)} ${
            metadata.name
          }, w części ${metadata.share}, `
        : "",
    namesAndRelations = "";

  for (const i of metadata.otherHereditaries) {
    namesAndAddresses += `${i.name}, ${i.address}<br>`;
    namesRelationsAndParts += `${determineRelation(i.relation, i.gender)} ${
      i.name
    }, w części ${i.share}${
      metadata.otherHereditaries.indexOf(i) ==
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
      metadata.otherHereditaries.indexOf(i) ==
      metadata.otherHereditaries.length - 1
        ? "."
        : ", "
    }`;
    if (i.forma == 0) {
      noRestraintsNames.push(i.name);
    } else inventoryNames.push(i.name);
  }

  if (metadata.forma == 0) noRestraintsNames.push(metadata.name);
  else inventoryNames.push(metadata.name);

  const whichType = noRestraintsNames.length < inventoryNames.length;

  return html`
    <div style="font-family: 'Montserrat', sans-serif !important;">
      <div style="width: 50%; margin-left: 50%; text-align: right;">
        ${metadata.city}, ${date.getDate()} ${getMonth(date.getMonth())}
        ${date.getFullYear()}<br /><br />

        ${metadata.courtName}<br />
        ${metadata.courtNumber} Wydział Cywilny<br />
        ${metadata.courtAddress}<br />
        <br /><br />
        Wnioskodawc${isHereditaryMale ? "a" : "zyni"}: ${metadata.name}, nr.
        PESEL: ${metadata.pesel}, zamieszkał${isHereditaryMale ? "y" : "a"} pod
        adresem ${metadata.street}, ${metadata.postal} ${metadata.city}<br />
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
      ${metadata.deadName}, zmarł${isTestatorMale ? "y" : "a"} w dniu
      ${moment(metadata.deadDate).toDate().toLocaleDateString("pl-PL")} w
      miejscowości ${metadata.deadCity}, ostatnio
      zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
      ${metadata.deadAddress}, w trybie dziedziczenia ustawowego
      ${metadata.otherHereditaries.length == 0
        ? `nabył${isHereditaryMale ? "" : "a"} ${
            metadata.name
          }, ${determineRelation(
            metadata.relation,
            metadata.gender
          )} spadkodawcy w ${
            !metadata.share ? "całości" : "części " + metadata.share
          }.`
        : `nabyli: ${namesRelationsAndParts}`}
      ${
        "" /*"nabył/a [syn etc.] [imię, nazwisko] w całości/części [...] lub nabyli: [żona, córka etc.] [imię, nazwisko] w części [...] etc. (kolejne osoby)"*/
      } <br /><br />
      Ponadto wnoszę o:<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp; 2. rozstrzygnięcie co do kosztów postępowania wg
      norm przepisanych.<br /><br />
      <h3 style="text-align: center;">Uzasadnienie</h3>

      Spadkodawc${isTestatorMale ? "a" : "zyni"}, ${metadata.deadName}, ostatnio
      zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
      ${metadata.deadAddress}, zmarł${isTestatorMale ? "" : "a"} w miejscowości
      ${metadata.deadCity} w dniu
      ${moment(metadata.deadDate).toDate().toLocaleDateString("pl-PL")}.
      <br /><br />

      Wnioskodawc${isHereditaryMale ? "a" : "zyni"} to ${metadata.name},
      ${metadata.relation == 0
        ? "spadkobierca powołany na podstawie testamentu"
        : `${determineRelation(metadata.relation, metadata.gender)} spadkodawc${
            isTestatorMale ? "y" : "zyni"
          }`}.
      ${metadata.otherHereditaries.length > 0
        ? `Pozostali uczestnicy to: ${namesAndRelations}`
        : ""}
      <br /><br />
      Dowód: <br />&nbsp;&nbsp;&nbsp;&nbsp;1) odpis skrócony aktu zgonu
      spadkodawc${isTestatorMale ? "y" : "zyni"} z ${metadata.deadActUscName} z
      dnia ${moment(metadata.deadDate).toDate().toLocaleDateString("pl-PL")} nr
      ${metadata.deadActNumber},<br />
      &nbsp;&nbsp;&nbsp;&nbsp;2) odpis skrócony aktu
      ${(metadata.actType == 0 || metadata.relation == 1
        ? "małżeństwa"
        : "urodzenia") +
      (metadata.relation == 3
        ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : ` wnioskodawc${isHereditaryMale ? "y" : "zyni"}`)}
      z ${metadata.actUscName} z dnia
      ${moment(metadata.actDate).toDate().toLocaleDateString("pl-PL")}, nr
      ${metadata.actNumber}.<br />
      ${getFurtherProof(metadata, isTestatorMale)}
      <br /><br />
      II. Wnioskodawc${isHereditaryMale ? "a" : "zyni"} w trybie art. 671 kpc
      stwierdza, iż spadkodawc${isTestatorMale ? "a" : "zyni"} nie
      pozostawił${isTestatorMale ? "" : "a"} po sobie żadnego testamentu
      zapewniając przy tym o braku innych spadkobierców.

      <br /><br />

      Ponadto, na podstawie art.1012, art.1018 i art.1026 kc., wnoszę o
      odebranie na pierwszym posiedzeniu w tejże sprawie,
      ${metadata.otherHereditaries.length == 0
        ? `oświadczenia o przyjęciu spadku ${
            metadata.share ? "z dobrodziejstwem inwentarza" : "bez ograniczeń"
          } od wnioskodawcy (${metadata.name}), składanego w imieniu własnym.`
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
                  whichType ? `bez ograniczeń` : `z dobrodziejstwem inwentarza`
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
      odpis${(metadata.otherHereditaries.length % 10) + 1 > 1 &&
      (metadata.otherHereditaries.length % 10) + 1 < 5
        ? "y"
        : (metadata.otherHereditaries.length % 10) + 1 >= 5
        ? "ów"
        : ""}
      wniosku o stwierdzenie nabycia spadku,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;2. Odpis skrócony aktu zgonu spadkodawcy, plus
      kserokopia, <br />
      &nbsp;&nbsp;&nbsp;&nbsp;3. Odpis skrócony aktu
      ${metadata.relation == 1 || metadata.actType == 0
        ? "małżeństwa"
        : "urodzenia"}
      ${metadata.relation == 3
        ? `spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : `wnioskodawc${isHereditaryMale ? "y" : "zyni"}`},
      plus kserokopia, <br />
      ${getFurtherActs(metadata, isTestatorMale)}
    </div>
  `;
};

function getFurtherProof(metadata, isTestatorMale) {
  let furtherProof = "";
  let number = 3;
  for (const i of metadata.otherHereditaries) {
    if (!i.actDate || !i.actNumber || !i.actUscName) {
      continue;
    }
    furtherProof += `&nbsp;&nbsp;&nbsp;&nbsp;${number}) odpis skrócony aktu ${
      (i.actType == 0 || i.relation == 1 ? "małżeństwa" : "urodzenia") +
      (metadata.relation !== 3 && i.relation == 3
        ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : ` spadkobiercy: ${i.name}`)
    } z ${i.actUscName} z dnia ${moment(i.actDate)
      .toDate()
      .toLocaleDateString("pl-PL")}, nr ${i.actNumber}<br> `;
    number += 1;
  }
  return furtherProof;
}

function getFurtherActs(metadata, isTestatorMale) {
  let furtherActs = "";
  let number = 4;
  for (const i of metadata.otherHereditaries) {
    if (!i.actDate || !i.actNumber || !i.actUscName) {
      continue;
    }
    furtherActs += `&nbsp;&nbsp;&nbsp;&nbsp;${number}. Odpis skrócony aktu ${
      (i.actType == 0 || i.relation == 1 ? "małżeństwa" : "urodzenia") +
      (metadata.relation !== 3 && i.relation == 3
        ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
        : ` spadkobierc${i.gender == 0 ? "y" : "zyni"}: ${i.name}`)
    }, plus kserokopia,<br> `;
    number += 1;
  }
  return furtherActs;
}

const getNamesString = (namesArray: any[]) => {
  let names = ``;
  for (let index = 0; index < namesArray.length; index++) {
    names += `${namesArray[index]}${
      index == namesArray.length - 1 ? "." : ", "
    }`;
  }
  return names;
};
