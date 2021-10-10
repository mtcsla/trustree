import { getMonth } from "./functions/polish-months";
function html(strings, ...tags) {
  let str = strings[0];
  for (let i = 0; i < tags.length; i++) {
    str += tags[i] + strings[i + 1];
  }
  return str;
}

export const determineRelation = (relation, gender) => {
  if (typeof relation == "string") relation = parseInt(relation);

  const isMale = gender == 0;

  switch (relation) {
    case 0:
      return isMale ? "niespokrewniony" : "niespokrewniona";
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

export const hereditaryRightsApplicationTestament_pl = (metadata: any) => {
  const date = new Date();

  const isTestatorMale = metadata.deadGender == "mężczyzna";
  const isHereditaryMale = metadata.gender == "mężczyzna";

  let inventoryNames = [],
    noRestraintsNames = [],
    namesAndAddresses = "",
    namesRelationsAndParts =
      metadata.otherHereditaries.length > 0
        ? `${determineRelation(metadata.relation, metadata.gender)}
          ${metadata.name}, w części ${metadata.share}, `
        : "",
    namesAndRelations = "";

  for (const i of metadata.otherHereditaries) {
    namesAndAddresses += `${i.name}, ${i.address}<br />`;
    namesRelationsAndParts += `${determineRelation(i.relation, i.gender)}
    ${i.name}, w części
    ${i.share}${
      metadata.otherHereditaries.indexOf(i) ==
      metadata.otherHereditaries.length - 1
        ? "."
        : ", "
    }`;
    namesAndRelations += `${i.name},
    ${determineRelation(i.relation, i.gender)}
    ${i.relation != 0 ? `spadkodaw${isTestatorMale ? "cy" : "czyni"}` : ""}${
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

  return `
    <html>
      <head></head>
      <body style="font-family: Times New Roman, sans-serif;">
        <div style="width: 50%; margin-left: 50%; text-align: right;">
          ${metadata.city}, ${date.getDate()} ${getMonth(date.getMonth())}
          ${date.getFullYear()}<br /><br />

          ${metadata.courtName}<br />
          ${metadata.courtNumber} Wydział Cywilny<br />
          ${metadata.courtAddress}<br />
          <br /><br />
          Wnioskodawc${isHereditaryMale ? "a" : "zyni"}: ${metadata.name}, nr.
          PESEL: ${metadata.pesel}, zamieszkał${isHereditaryMale ? "y" : "a"}
          pod adresem ${metadata.street}, ${metadata.postal} ${
    metadata.city
  }<br />
          ${
            metadata.otherHereditaries.length > 0
              ? `Uczestnicy postępowania: <br />
                ${namesAndAddresses} <br />`
              : ""
          }<br />
        </div>

        <h2 style="text-align: center;">
          Wniosek o stwierdzenie nabycia praw do spadku
        </h2>

        W imieniu własnym uprzejmie wnoszę o:<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;
        1. stwierdzenie, że spadek, który pozostawił${isTestatorMale ? "" : "a"}
        ${metadata.deadName}, zmarł${isTestatorMale ? "y" : "a"} w dniu
        ${new Date(metadata.deadDate).toLocaleDateString("pl-PL")} w
        miejscowości ${metadata.deadCity}, ostatnio
        zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
        ${metadata.deadAddress}, na podstawie testamentu sporządzonego w
        dniu ${new Date(metadata.testamentDate).toLocaleDateString("pl-PL")}
        przez spadkodawc${isTestatorMale ? "ę" : "zynię"} w trybie art. 949 § 1
        kc,
        ${
          metadata.otherHereditaries.length == 0
            ? `nabył${isHereditaryMale ? "" : "a"} ${metadata.name},
            ${determineRelation(metadata.relation, metadata.gender)}${
                metadata.relation != 0
                  ? ` spadkodawc${isTestatorMale ? "y" : "yni"}`
                  : ""
              }
            w ${!metadata.share ? "całości" : "części " + metadata.share}.`
            : `nabyli: ${namesRelationsAndParts}`
        }

        <br /><br />&nbsp;&nbsp;&nbsp;&nbsp; 2. otwarcie i ogłoszenie
        testamentu, który sporządził${isTestatorMale ? "" : "a"}
        ${metadata.deadName} z dnia
        ${new Date(metadata.testamentDate).toLocaleDateString("pl-PL")},
        sporządzonego w trybie art. 949 §1 kc.<br /><br />
        Ponadto wnoszę o:<br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp; 3. rozstrzygnięcie co do kosztów postępowania
        wg norm przepisanych.<br /><br />
        <h3 style="text-align: center;">Uzasadnienie</h3>

        Spadkodawc${isTestatorMale ? "a" : "zyni"}, ${metadata.deadName},
        ostatnio zamieszkał${isTestatorMale ? "y" : "a"} pod adresem
        ${metadata.deadAddress}, zmarł${isTestatorMale ? "" : "a"} w
        miejscowości ${metadata.deadCity} w dniu
        ${new Date(metadata.deadDate).toLocaleDateString("pl-PL")}.
        <br /><br />

        Wnioskodawc${isHereditaryMale ? "a" : "zyni"} to ${metadata.name},
        ${
          metadata.relation == 0
            ? "spadkobierca powołany na podstawie testamentu"
            : `${determineRelation(metadata.relation, metadata.gender)}
            spadkodawc${isTestatorMale ? "y" : "zyni"}`
        }.
        ${
          metadata.otherHereditaries.length > 0
            ? `Pozostali uczestnicy to: ${namesAndRelations}`
            : ""
        }
        <br /><br />
        Dowód: <br />&nbsp;&nbsp;&nbsp;&nbsp;1) odpis skrócony aktu zgonu
        spadkodawc${isTestatorMale ? "y" : "zyni"} z ${metadata.deadActUscName}
        z dnia ${new Date(metadata.deadDate).toLocaleDateString("pl-PL")} nr
        ${metadata.deadActNumber},<br />
        &nbsp;&nbsp;&nbsp;&nbsp;2) odpis skrócony aktu
        ${
          (metadata.actType == 0 || metadata.relation == 1
            ? "małżeństwa"
            : "urodzenia") +
          (metadata.relation == 3
            ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
            : ` wnioskodawc${isHereditaryMale ? "y" : "zyni"}`)
        }
        z ${metadata.actUscName} z dnia
        ${new Date(metadata.actDate).toLocaleDateString("pl-PL")}, nr
        ${metadata.actNumber}.<br />
        ${getFurtherProof(metadata, isTestatorMale)}
        <br /><br />
        II.
        ${
          metadata.testamentNotarial == "false"
            ? `W dniu
            ${new Date(metadata.testamentDate).toLocaleDateString("pl-PL")},
            spadkodawc${isTestatorMale ? "a" : "zyni"}
            oświadczył${isTestatorMale ? "" : "a"} swą ostatnią wolę w trybie
            art. 949 kc na piśmie i opatrzył${isTestatorMale ? "" : "a"}
            testament własnoręcznym podpisem.`
            : `Zmarł${isTestatorMale ? "y" : "a"}
            pozostawił${isTestatorMale ? "" : "a"} testament notarialny,
            sporządzony w dniu
            ${new Date(metadata.testamentDate).toLocaleDateString("pl-PL")}
            przed notariuszem: ${metadata.testamentNotarialName}, w Kancelarii
            Notarialnej w miejscowości ${metadata.testamentNotarialCity}, Rep.
            ${metadata.testamentNotarialRepository} nr
            ${metadata.testamentNotarialNumber}.`
        }
        <br /><br />
        Dowód:
        ${
          metadata.testamentNotarial == "false"
            ? `oryginał testamentu z dnia
            ${new Date(metadata.testamentDate).toLocaleDateString("pl-PL")}`
            : `wypis aktu notarialnego zawierającego testament`
        }
        <br /><br />
        III. Zapewniam w trybie art. 671 kpc, iż niniejszym sporządzony w trybie
        art. 949 §1 kc testament jest jedynym i wyłącznym testamentem
        spadkodawc${isTestatorMale ? "y" : "zyni"}.
        Spadkodawc${isTestatorMale ? "a" : "zyni"} tegoż testamentu nie
        odwołał${isTestatorMale ? "" : ""}.
        <br /><br />
        Ponadto, na podstawie art.1012, art.1018 i art.1026 kc., wnoszę o
        odebranie na pierwszym posiedzeniu w tejże sprawie,
        ${
          metadata.otherHereditaries.length == 0
            ? `oświadczenia o przyjęciu spadku
            ${
              metadata.share ? "z dobrodziejstwem inwentarza" : "bez ograniczeń"
            }
            od wnioskodawcy (${metadata.name}), składanego w imieniu własnym.`
            : `oświadczeń o przyjęciu spadku
            ${whichType ? `z dobrodziejstwem inwentarza ` : `bez ograniczeń`}
            od następujących osób:
            ${getNamesString(whichType ? inventoryNames : noRestraintsNames)}${
                (
                  whichType
                    ? noRestraintsNames.length > 0
                    : inventoryNames.length > 0
                )
                  ? `, natomiast oświadczeń o przyjęciu spadku
                ${whichType ? `bez ograniczeń` : `z dobrodziejstwem inwentarza`}
                od następujących osób:
                ${getNamesString(
                  whichType ? noRestraintsNames : inventoryNames
                )}`
                  : ""
              }.
            `
        }
        <br /><br />
        Mając powyższe na uwadze, uprzejmie wnoszę jak na wstępie.<br /><br />

        Podpis:<br /><br /><br />

        Załączniki:<br /><br />

        &nbsp;&nbsp;&nbsp;&nbsp;1. ${1 + metadata.otherHereditaries.length}
        odpis${
          metadata.otherHereditaries.length > 1 &&
          metadata.otherHereditaries.length < 5
            ? "y"
            : metadata.otherHereditaries.length >= 5
            ? "ów"
            : ""
        }
        wniosku o stwierdzenie nabycia spadku,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;2.
        ${
          metadata.testamentNotarial == "false"
            ? `Oryginał testamentu z dnia
            ${new Date(metadata.testamentDate).toLocaleDateString("pl-PL")},
            plus kserokopia`
            : "Odpis testamentu"
        },<br />
        &nbsp;&nbsp;&nbsp;&nbsp;3. Odpis skrócony aktu zgonu spadkodawcy, plus
        kserokopia, <br />
        &nbsp;&nbsp;&nbsp;&nbsp;4. Odpis skrócony aktu
        ${
          metadata.relation == 1 || metadata.actType == 0
            ? "małżeństwa"
            : "urodzenia"
        }
        ${
          metadata.relation == 3
            ? `spadkodawc${isTestatorMale ? "y" : "zyni"}`
            : `wnioskodawc${isHereditaryMale ? "y" : "zyni"}`
        },
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
    if (!i.actDate || !i.actNumber || !i.actUscName) {
      continue;
    }
    furtherProof += `&nbsp;&nbsp;&nbsp;&nbsp;${number}) odpis skrócony aktu
      ${
        (i.changedSurname || i.relation == 1 ? "małżeństwa" : "urodzenia") +
        (metadata.relation != 3 && i.relation == 3
          ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : ` spadkobiercy: ${i.name}`)
      }
      z ${i.actUscName} z dnia
      ${new Date(i.actDate).toLocaleDateString("pl-PL")}, nr
      ${i.actNumber}<br />
      `;
    number += 1;
  }
  return furtherProof;
}

function getFurtherActs(metadata, isTestatorMale) {
  let furtherActs = "";
  let number = 5;
  for (const i of metadata.otherHereditaries) {
    if (!i.actDate || !i.actNumber || !i.actUscName) {
      continue;
    }
    furtherActs += `&nbsp;&nbsp;&nbsp;&nbsp;${number}. Odpis skrócony aktu
      ${
        (i.changedSurname || i.relation == 1 ? "małżeństwa" : "urodzenia") +
        (metadata.relation != 3 && i.relation == 3
          ? ` spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : ` spadkobierc${i.gender == "mężczyzna" ? "y" : "zyni"}: ${i.name}`)
      },
      plus kserokopia,<br />
      `;
    number += 1;
  }
  return furtherActs;
}

const getNamesString = (namesArray: any[]) => {
  let names = ``;
  for (const otherHereditary of namesArray) {
    names += `${otherHereditary}${
      namesArray.indexOf(otherHereditary) == namesArray.length - 1 ? "" : ", "
    }`;
  }
  console.log("names2", names);
  return names;
};
