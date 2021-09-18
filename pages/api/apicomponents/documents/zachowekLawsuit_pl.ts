import moment from "moment";

import { getMonth } from "./functions/polish-months";
import { determineRelation } from "./hereditaryRightsApplicationTestament_pl";
function html(strings, ...tags) {
  let str = strings[0];
  for (let i = 0; i < tags.length; i++) {
    str += tags[i] + strings[i + 1];
  }
  return str;
}

//convert fraction string to number
const getFractionDecimal = (fraction: string): number => {
  const [numerator, denominator] = fraction.split("/");
  return parseInt(numerator) / parseInt(denominator);
};

const tab = "&nbsp;&nbsp;&nbsp;&nbsp;";

export const zachowekLawsuit_pl = (metadata: any) => {
  const date = new Date();
  const isTestatorMale = metadata.testator.gender === "mężczyzna";
  const isHereditaryMale = metadata.hereditary.gender === "mężczyzna";

  let suedNumber: number;
  let suedList = "";
  let allNames = "";
  let allNamesRelationsAndShares = "";
  let allNamesAndRelations = "";

  for (const i of metadata.otherHereditaries) {
    if (i.sued) {
      suedNumber++;
      suedList +=
        i.name +
        `zamieszkał${i.gender === "mężczyzna" ? "y" : "a"} pod adresem ${
          i.address
        } <br/>`;
    }
    allNames +=
      i.name +
      (metadata.otherHereditaries.indexOf(i) ===
      metadata.otherHereditaries.length - 1
        ? "."
        : ", ");
    allNamesAndRelations +=
      i.name +
      `, ${determineRelation(i.relation, i.gender)} spadkodawc${
        isTestatorMale ? "y" : "zyni"
      }` +
      (metadata.otherHereditaries.indexOf(i) ===
      metadata.otherHereditaries.length - 1
        ? "."
        : ", ");
    allNamesRelationsAndShares +=
      i.name +
      `, ${determineRelation(i.relation, i.gender)} spadkodawc${
        isTestatorMale ? "y" : "zyni"
      }, w ${i.part ? `${i.part} części` : "całości"}` +
      (metadata.otherHereditaries.indexOf(i) ===
      metadata.otherHereditaries.length - 1
        ? "."
        : ", ");
  }

  return html`
    <html>
      <body>
        <div style="width: 100%;">
          <span style="width: 100%; text-align: right;">
            ${metadata.hereditary.city}, ${date.getDate()}
            ${getMonth(date.getMonth())} ${date.getFullYear()}
          </span>
          <br /><br />
          <span style="width: 100%; text-align: left; font-weight: bold;">
            ${metadata.court.name}
          </span>
          <br />
          <span style="width: 100%; text-align: left; font-weight: bold;">
            ${metadata.court.number} Wydział Cywilny
          </span>
          <br /><br />
          <span style="width: 100%; text-align: left;">
            ${metadata.court.address}
          </span>
          <br />
          <span style="width: 100%; text-align: right;">
            Powód: ${metadata.hereditary.name}, nr. PESEL:
            ${metadata.hereditary.pesel},
            zamieszkał${isHereditaryMale ? "y" : "a"} pod adresem
            ${metadata.hereditary.address}, ${metadata.hereditary.postal}
            ${metadata.hereditary.city} <br />
            Pozwan${suedNumber === 1 ? "y" : "i"}:
            ${suedNumber > 1 ? "<br />" : ""} ${suedList} <br />
            Wartość przedmiotu sporu: ${metadata.hereditary.part}zł
          </span>
          <br /><br />
        </div>
        <h2 style="width: 100%; text-align: center;">Pozew o zachowek</h2>

        W imieniu własnym uprzejmie wnoszę o: <br />
        <br />
        <ol>
          <li>
            zasądzenie od strony pozwanej na rzecz powoda kwoty
            ${metadata.hereditary.part}zł wraz z odsetkami ustawowymi za
            opóźnienie od dnia wniesienia pozwu do dnia zapłaty, tytułem
            zachowku, stosownie do treści art. 991 §2 kc,
          </li>
          <br />
          <br />
          <li>
            wydanie wyroku zaocznego, uwzględniającego powództwo, stosownie do
            treści art. 339 i następnych kpc, w razie zaistnienia ustawowych ku
            temu przesłanek,
          </li>
          <br />
          <br />
          <li>
            nadanie wyrokowi zaocznemu rygoru natychmiastowej wykonalności w
            trybie art. 333 §1 pkt. 3 kpc,
          </li>
          <br />
          <br />
          <li>
            zasądzenie od strony pozwanej na rzecz powoda kosztów procesu według
            norm przepisanych.
          </li>
          <br />
        </ol>
        <br />
        Ponadto wnoszę o: <br />
        <br />
        <ol start="5">
          <li>
            przeprowadzenie dowodu z dokumentów, niniejszym przedłożonych - na
            okoliczności wskazane w treści pozwu,
          </li>
          <br />
          <br />
          <li>
            przeprowadzenie dowodu z przesłuchania strony powodowej i strony
            pozwanej.
          </li>
          <br />
        </ol>
        <br />
        <h3 style="width: 100%; text-align: center;">Uzasadnienie</h3>
        I. Dnia
        ${moment(metadata.testator.deathDate)
          .toDate()
          .toLocaleDateString("en-GB")}
        zmarł spadkodawca -
        ${getTestatorRelation(metadata.hereditary.relation, isTestatorMale)}
        powoda, ${metadata.hereditary.name}, pozostawiając testament z dnia
        ${moment(metadata.testament.date).toDate().toLocaleDateString("en-GB")}.
        Zgodnie z tym testamentem, do spadku zostali powołani:
        ${allNamesAndRelations} Na mocy prawomocnego postanowienia wydanego
        przez ${metadata.decision.courtName}, ${metadata.decision.number}
        Wydział Cywilny z dnia
        ${moment(metadata.decision.name).toDate().toLocaleDateString("en-GB")},
        spadek po spadkodawcy, ${metadata.testator.name},
        naby${metadata.otherHereditaries.length > 1 ? "li:" : "ł"} ${allNames}
        <br />
        <br />
        Dowody: <br />
        <ol>
          ${tab}
          <li>
            skrócony akt zgonu spadkodawcy, ${metadata.testator.name} nr
            ${metadata.testator.number} z dnia
            ${moment(metadata.testator.deathDate)
              .toDate()
              .toLocaleDateString("en-GB")}, <br />
          </li>
          ${tab}
          <li>
            postanowienie wydane przez ${metadata.decision.courtName} z dnia
            ${moment(metadata.decision.date)
              .toDate()
              .toLocaleDateString("en-GB")}
            sygn. ${metadata.decision.signature}
            ${metadata.decision.clause
              ? `wraz z klauzulą prawomocności z
        dnia ${moment(metadata.decision.clauseDate)
          .toDate()
          .toLocaleDateString("en-GB")} (odpis notarialny), na okoliczność
        nabycia spadku na mocy testamentu przez osobę pozwaną.`
              : "."}
          </li>
        </ol>
        <br />
        <br />
        Powód ${metadata.hereditary.name} jest spadkobiercą ustawowym
        (${determineRelation(
          metadata.hereditary.relation,
          metadata.hereditary.gender
        )}
        spadkodawcy), który w związku z dziedziczeniem testamentowym nie
        otrzymał należnej mu części spadku po spadkodawcy:
        ${metadata.hereditary.part}zł. <br />
        <br />
        Dowód: akt
        ${metadata.hereditary.changedSurname ||
        metadata.hereditary.relation === 1
          ? "małżeństwa"
          : "urodzenia"}
        powoda, z dnia
        ${moment(metadata.hereditary.act.date)
          .toDate()
          .toLocaleDateString("en-GB")},
        z ${metadata.hereditary.act.uscName}. <br />
        <br />
        ${metadata.immovables.length > 0 || metadata.movables.length > 0
          ? html`II.Wg wiedzy powoda, w skład spadku wchodził:
              <ol>
                ${getImmovables(metadata.immovables, metadata.hereditary)}
                ${getVehicles(metadata.immovables)}
                ${getValuables(metadata.immovables)}
              </ol>
              <br />
              <br />`
          : ""}
        ${metadata.grants.length > 0
          ? `Na podstawie art. 993 kc do spadku należy dołączyć
        ${metadata.grants.length === 1 ? "darowiznę" : "darowizny"} na rzecz
        ${suedNumber === 1 ? "pozwanego" : "pozwanych"}${
              metadata.grants.length === 1 ? "" : ":"
            }
        ${
          metadata.grants.length > 1
            ? `<ol>
          ${getGrants(metadata.grants)}
        </ol>`
            : getGrants(metadata.grants)
        }
`
          : ""}

        <br />
        W przypadku zakwestionowania przez osobę pozwaną roszczenia o zachowek
        co do wysokości, powód wnosi o: przeprowadzenie dowodu z opinii
        rzeczoznawcy - biegłego sądowego, na okoliczność wartości w/w
        nieruchomości (stosownych udziałów), wchodzących w skład majątku
        spadkowego po spadkodawcy. <br />
        <br />
        ${metadata.hereditary.mediation
          ? `Wniesienie niniejszego pozwu jest konieczne, gdyż
        podjęta przez powoda, w trybie art.187 §1 pkt 3 kpc, próba mediacji z
        osobą pozwaną w danej sprawie nie przyniosła rezultatu w postaci zapłaty
        dochodzonej kwoty.`
          : ""} <br />
        <br />
        ${metadata.hereditary.questioned
          ? html`Roszczenie powoda z tytułu zachowku nie uległo przedawnieniu po
              myśli art.1007 kc, bowiem powód, w toku postępowania o
              stwierdzenie nabycia spadku, który pozostawił
              ${metadata.testator.name} (sygn.${metadata.decision.signature})
              zgłosił zarzut nieważności testamentu spadkodawcy, czym przerwał
              bieg terminu przedawnienia do żądania w niniejszej sprawie. <br />
              <br />
              Dowód:
              <br />
              <ol>
                <li>
                  odpis postanowienia wydanego przez
                  ${metadata.decision.courtName} z dnia
                  ${moment(metadata.decision.date)
                    .toDate()
                    .toLocaleDateString("en-GB")}
                  sygn. ${metadata.decision.signature} wraz z pisemnym
                  uzasadnieniem.
                </li>
              </ol>
              <br /><br />
              Mając powyższe na uwadze, uprzejmie wnoszę jak na wstępie, jako że
              żądania powództwa są całkowicie konieczne i usprawiedliwione.
              <br />`
          : ""}<br />
        Załączniki: <br />
        <ol>
          <li>odpis pozwu wraz z załącznikami,</li>
          <br />
          <li>dowody – dokumenty w pozwie wyszczególnione,</li>
          <br />
          <li>dowód uiszczenia opłaty sądowej od pozwu</li>
        </ol>
      </body>
    </html>
  `;
};

const getImmovables = (immovables, hereditary) => {
  let immovablesString = "";

  for (const i of immovables) {
    immovablesString += html`${tab}
      <li>
        ${i.testatorShare ? `Udział w części ${i.testatorShare}` : "Całość"}
        nieruchomości ${determinePropertyType(i.type)} pod adresem ${i.address},
        dla której to nieruchomości jest prowadzona księga wieczysta nr
        ${i.number} przez ${i.courtName}.${getPropertyTypeMessage(i)} Wartość
        tegoż majątku spadkowego powód ocenia na kwotę co najmniej
        ${i.value *
        getFractionDecimal(hereditary.share) *
        getFractionDecimal(i.testatorShare)}zł${getPropertyValueMessage(i)}zł.
        <br />
        <br />
        <b>Dowody:</b> <br />
        <br />
        <ol>
          <li>
            odpis zwykły księgi wieczystej nr ${i.number} z dnia
            ${moment(i.bookDate).toDate().toLocaleDateString("en-GB")}, na
            okoliczność wchodzenia w skład spadku po spadkodawcy,
            ${!i.testatorShare
              ? `udziału w ${i.testatorShare} części`
              : `całości`}
            tejże nieruchomości.
          </li>
        </ol>
      </li>`;
  }

  return immovablesString;
};
const getVehicles = (movables) => {
  let movablesString = "";

  for (const i of movables) {
    movablesString += html`${tab}
    ${i.type === 1
      ? html`<li>
            ${i.vehicleType === 1
              ? "samochód osobowy"
              : i.vehicleType === 2
              ? "samochód ciężarowy"
              : "motocykl"}
            marki ${i.vehicleBrand}, model ${i.vehicleModel}, o numerze
            rejestracyjnym: ${i.vehicleRegistration}. Wartość przedmiotową tegoż
            pojazdu powód ocenia na kwotę ${i.value}zł. <br />
            <br />
            <b>Dowody:</b> <br />
            <ol>
              <li>
                kserokopia dowodu rejestracyjnego
                ${i.vehicleType === 3
                  ? "motocyklu"
                  : `samochodu ${
                      i.vehicleType === 1 ? "osobowego" : "ciężarowego"
                    }`}
                marki ${i.vehicleBrand}, nr rej. ${i.vehicleRegistration}, na
                okoliczność wchodzenia w skład spadku po spadkodawcy.
              </li>
            </ol>
          </li>

          <li />`
      : ""}`;
  }
  return movablesString;
};

const getValuables = (movables) => {
  let movablesString: any = "";
  let number = 0;
  let valuesSum = 0;

  for (const i of movables) {
    if (i.type === 2) {
      movablesString += `${(() => {
        let name = [...i.name];
        name[0] = name[0].toLowerCase();
        return name.join();
      })()}, `;
      valuesSum += i.value;
      number++;
    }
  }

  if (movablesString) {
    return html`<li>
      ${movablesString}o ${number > 1 ? "łącznej " : ""}wartości ${valuesSum}zł.
    </li>`;
  }
  return "";
};

const determinePropertyType = (type) => {
  switch (type) {
    case 1:
      return "gruntowej zabudowanej";
    case 2:
      return "gruntowej";
    case 3:
      return "budynkowej";
    case 4:
      return "lokalowej";
    case 5:
      return "rolnej";
    default:
      return "gruntowej";
  }
};

const getPropertyTypeMessage = (property) => {
  switch (property.type) {
    case 1:
      return html`
        Przedmiotowa nieruchomość o powierzchni łącznej
        ${property.fieldSurfaceArea}m<sup>2</sup> jest zabudowana budynkiem
        ${getBuildingType(property.buildingType)}, o powierzchni łącznej
        użytkowej ${property.buildingSurfaceArea}m<sup>2</sup>.
      `;
    case 2:
      return html``;
    case 3:
      return html` Przedmiotowa nieruchomość to budynek
      ${getBuildingType2(property.buildingType)} o powierzchni łącznej
      użytkowej: ${property.buildingSurfaceArea}m<sup>2</sup>, niestanowiący
      części składowej nieruchomości gruntowej.`;
    case 4:
      return html`
        Przedmiotowa nieruchomość to lokal mieszkalny o powierzchni
        ${property.buildingSurfaceArea}m<sup>2</sup>.
      `;
    case 5:
      return html` Przedmiotowa nieruchomość to nieruchomość rolna o łącznej
      powierzchni użytkowej ${property.fieldSurfaceArea}m<sup>2</sup>.`;
    default:
      return "";
  }
};

const getBuildingType = (type) => {
  switch (type) {
    case 1:
      return "jednorodzinnym";
    case 2:
      return "zbliźniaczonym";
    case 3:
      return "letniskowym";
  }
};

const getBuildingType2 = (type) => {
  switch (type) {
    case 1:
      return "jednorodzinny";
    case 2:
      return "zbliźniaczony";
    case 3:
      return "letniskowy";
  }
};

const getPropertyValueMessage = (property) => {
  if (property.hereditaryShare)
    return html`, jako że wartość całej przedmiotowej nieruchomości wynosi ok.
    ${property.value}, która to nieruchomość aktualnie stanowi współwłasność
    ułamkową powoda w ${property.hereditaryShare} części, będąc uprzednio do
    chwili śmierci spadkodawcy elementem współwłasności łącznej.`;
  if (property.testatorShare)
    return html`, jako że wartość całej przedmiotowej nieruchomości wynosi ok.
    ${property.value}, która to nieruchomość stanowiła współwłasność ułamkową
    spadkodawcy w ${property.testatorShare} części.`;
  return ".";
};

const getGrants = (grants) => {
  let grantsString = "";

  if (grants.length > 1)
    for (const i of grants)
      grantsString += html`<li>
        na kwotę ${i.value}zł z dnia
        ${moment(i.date).toDate().toLocaleDateString("en-GB")}. <br />
        <br />
        <b>Dowód:</b> akt darowizny z dnia
        ${moment(i.date).toDate().toLocaleDateString("en-GB")} w miejscowości
        ${i.city}. <br /><br />
      </li>`;
  else if (grants.length === 1) {
    const i = grants[0];
    grantsString += html` na kwotę ${i.value}zł z dnia
      ${moment(i.date).toDate().toLocaleDateString("en-GB")}. <br />
      <br />
      <b>Dowód:</b> akt darowizny z dnia
      ${moment(i.date).toDate().toLocaleDateString("en-GB")} w miejscowości
      ${i.city}. <br /><br />`;
  } else return "";

  return grantsString;
};

const getTestatorRelation = (relation, isMale) => {
  switch (relation) {
    case 1:
      return isMale ? "mąż" : "żona";
    case 3:
      return isMale ? "syn" : "córka";
    case 4:
      return isMale ? "ojciec" : "matka";
  }
};
