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

//convert fraction string to number
const getFractionDecimal = (fraction: string) => {
  if (!fraction) return 1;
  const [numerator, denominator] = fraction.split("/");
  return parseInt(numerator) / parseInt(denominator);
};

const tab = "&nbsp;&nbsp;&nbsp;&nbsp;";

export const zachowekLawsuit_pl = (metadata: any) => {
  const date = new Date();
  console.log(metadata);
  const isTestatorMale = metadata.deadGender == 0;
  const isHereditaryMale = metadata.gender == 0;

  let suedNumber = 0;
  let suedList = "";
  let allNames = "";
  let allNamesRelationsAndShares = "";
  let allNamesAndRelations = "";

  for (const i of metadata.otherHereditaries) {
    if (i.sued == 1) {
      suedNumber++;
      suedList +=
        tab +
        i.name +
        ` zamieszkał${i.gender == 0 ? "y" : "a"} pod adresem ${
          i.address
        } <br/>`;
    }
    allNames +=
      i.name +
      (metadata.otherHereditaries.indexOf(i) ==
      metadata.otherHereditaries.length - 1
        ? "."
        : ", ");
    allNamesAndRelations +=
      i.name +
      `, ${determineRelation(i.relation, i.gender)} ${
        i.relation != 0
          ? `spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : "ze spadkodawc" + (isTestatorMale ? "ą" : "zynią")
      }` +
      (metadata.otherHereditaries.indexOf(i) ==
      metadata.otherHereditaries.length - 1
        ? "."
        : ", ");
    allNamesRelationsAndShares +=
      i.name +
      `, ${determineRelation(i.relation, i.gender)} ${
        i.relation != 0
          ? `spadkodawc${isTestatorMale ? "y" : "zyni"}`
          : "ze spadkodawc" + isTestatorMale
          ? "ą"
          : "zynią"
      }, w ${i.share ? `części ${i.share}` : "całości"}` +
      (metadata.otherHereditaries.indexOf(i) ==
      metadata.otherHereditaries.length - 1
        ? "."
        : ", ");
  }

  return html`
    <div style="  font-size: 12px;">
      <div style="width: 100%; ">
        <span style="width: 100%; text-align: right;">
          ${metadata.city}, ${date.getDate()} ${getMonth(date.getMonth())}
          ${date.getFullYear()}
        </span>
        <br /><br />
        <span style="width: 100%; text-align: left; font-weight: bold;">
          ${metadata.courtName}
        </span>
        <br />
        <span style="width: 100%; text-align: left; font-weight: bold;">
          ${metadata.courtNumber} Wydział Cywilny
        </span>
        <br /><br />
        <span style="width: 100%; text-align: left;">
          ${metadata.courtAddress}
        </span>
        <br /><br />
        <span style="width: 100%; text-align: right;">
          Powód:<br />
          ${tab}${metadata.name}, nr. PESEL: ${metadata.pesel},
          zamieszkał${isHereditaryMale ? "y" : "a"} pod adresem
          ${metadata.street}, ${metadata.postal} ${metadata.city} <br /><br />
          Pozwan${suedNumber == 1 ? "y" : "i"}:
          ${suedNumber > 1 ? "<br />" : ""} ${suedList} <br />
          Wartość przedmiotu sporu: ${metadata.value}zł
        </span>
        <br /><br />
      </div>
      <h2 style="width: 100%; text-align: center;">Pozew o zachowek</h2>

      W imieniu własnym uprzejmie wnoszę o: <br />
      <br />
      <ol>
        <li>
          zasądzenie od strony pozwanej na rzecz powoda kwoty
          ${metadata.value}zł wraz z odsetkami ustawowymi za opóźnienie od dnia
          wniesienia pozwu do dnia zapłaty, tytułem zachowku, stosownie do
          treści art. 991 §2 kc,
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
      I. Dnia ${new Date(metadata.deadDate).toLocaleDateString("pl-PL")} zmarł
      spadkodawca - ${getTestatorRelation(metadata.relation, isTestatorMale)}
      powoda, ${metadata.deadName}, pozostawiając testament z dnia
      ${new Date(metadata.testamentDate).toLocaleDateString("pl-PL")}. Zgodnie z
      tym testamentem, do spadku zostali powołani: ${allNamesAndRelations} Na
      mocy prawomocnego postanowienia wydanego przez
      ${metadata.rulingCourtName}, ${metadata.rulingCourtNumber} Wydział Cywilny
      z dnia ${new Date(metadata.rulingDate).toLocaleDateString("pl-PL")},
      spadek po spadkodawcy: ${metadata.deadName},
      naby${metadata.otherHereditaries.length > 1
        ? "li:"
        : metadata.otherHereditaries[0].gender == 0
        ? "ł"
        : "ła"}
      ${allNames}
      <br />
      <br />
      Dowody: <br />
      <ol>
        ${tab}
        <li>
          skrócony akt zgonu spadkodawcy, ${metadata.deadName} nr
          ${metadata.deadActNumber} z dnia
          ${new Date(metadata.deadDate).toLocaleDateString("pl-PL")},
          <br />
        </li>
        ${tab}
        <li>
          postanowienie wydane przez ${metadata.rulingCourtName} z dnia
          ${new Date(metadata.rulingDate).toLocaleDateString("pl-PL")} sygn.
          ${" " + metadata.rulingSignature}
          ${metadata.rulingClosure == 1
            ? `wraz z klauzulą prawomocności z
        dnia ${new Date(metadata.rulingClosureDate).toLocaleDateString(
          "pl-PL"
        )} (odpis notarialny), na okoliczność
        nabycia spadku na mocy testamentu przez osobę pozwaną.`
            : "."}
        </li>
      </ol>
      <br />
      <br />
      Powód jest spadkobiercą ustawowym
      (${determineRelation(metadata.relation, metadata.gender)} spadkodawcy),
      który w związku z dziedziczeniem testamentowym nie otrzymał należnej mu
      części spadku po spadkodawcy: ${metadata.value}zł. <br />
      <br />
      Dowód: akt
      ${metadata.actType == 0 || metadata.relation == 1
        ? "małżeństwa"
        : "urodzenia"}
      powoda, z dnia ${new Date(metadata.actDate).toLocaleDateString("pl-PL")},
      z ${metadata.actUscName}. <br />
      <br />
      ${metadata.immovables.length > 0 || metadata.movables.length > 0
        ? html`II.Wg wiedzy powoda, w skład spadku wchodziły:
            <ol>
              ${getImmovables(metadata.immovables, metadata)}
              ${getVehicles(metadata.movables)}
              ${getValuables(metadata.movables)}
            </ol>
            <br />
            <br />`
        : ""}
      ${metadata.grants.length > 0
        ? `Na podstawie art. 993 kc do spadku należy dołączyć
        ${metadata.grants.length == 1 ? "darowiznę" : "darowizny"} na rzecz
        ${suedNumber == 1 ? "pozwanego" : "pozwanych"}${
            metadata.grants.length == 1 ? "" : ":"
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
      W przypadku zakwestionowania przez osobę pozwaną roszczenia o zachowek co
      do wysokości, powód wnosi o: przeprowadzenie dowodu z opinii rzeczoznawcy
      - biegłego sądowego, na okoliczność wartości w/w nieruchomości (stosownych
      udziałów), wchodzących w skład majątku spadkowego po spadkodawcy. <br />
      <br />
      ${metadata.mediation == 1
        ? `Wniesienie niniejszego pozwu jest konieczne, gdyż
        podjęta przez powoda, w trybie art.187 §1 pkt 3 kpc, próba mediacji z
        osobą pozwaną w danej sprawie nie przyniosła rezultatu w postaci zapłaty
        dochodzonej kwoty.`
        : ""} <br />
      <br />
      ${metadata.invalid == 1
        ? html`Roszczenie powoda z tytułu zachowku nie uległo przedawnieniu po
            myśli art.1007 kc, bowiem powód, w toku postępowania o stwierdzenie
            nabycia spadku, który pozostawił ${metadata.deadName} (sygn.
            ${metadata.rulingSignature}) zgłosił zarzut nieważności testamentu
            spadkodawcy, czym przerwał bieg terminu przedawnienia do żądania w
            niniejszej sprawie. <br />
            <br />
            Dowód:
            <br />
            <ol>
              <li>
                odpis postanowienia wydanego przez ${metadata.rulingCourtName} z
                dnia
                ${new Date(metadata.rulingDate).toLocaleDateString("pl-PL")}
                sygn. ${metadata.rulingSignature} wraz z pisemnym uzasadnieniem.
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
    </div>
  `;
};

const getImmovables = (immovables, hereditary) => {
  let immovablesString = "";

  for (const i of immovables) {
    immovablesString += html`${tab}
      <li>
        ${i.deadShare ? `Udział w części ${i.deadShare}` : "Całość"}
        nieruchomości ${determinePropertyType(i.type)} pod adresem ${i.address},
        dla której to nieruchomości jest prowadzona księga wieczysta nr
        ${i.number} przez ${i.courtName}.${getPropertyTypeMessage(i)} Wartość
        tegoż majątku spadkowego powód ocenia na kwotę co najmniej
        ${toTwo(
          i.propertyValue * getFractionDecimal(i.deadShare || "1/1")
        )}zł${getPropertyValueMessage(i)}
        <br />
        <br />
        <b>Dowody:</b> <br />
        <br />
        <ol>
          <li>
            odpis zwykły księgi wieczystej nr ${i.number} z dnia
            ${new Date(i.date).toLocaleDateString("pl-PL")}, na okoliczność
            wchodzenia w skład spadku po spadkodawcy,
            ${i.deadShare ? `udziału w ${i.deadShare} części` : `całości`} tejże
            nieruchomości.
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
    ${i.type == 1
      ? html`<li>
            ${i.vehicleType == 1
              ? "samochód osobowy"
              : i.vehicleType == 2
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
                ${i.vehicleType == 3
                  ? "motocyklu"
                  : `samochodu ${
                      i.vehicleType == 1 ? "osobowego" : "ciężarowego"
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
    if (i.type == 2) {
      movablesString += `${(() => {
        let name = [...i.itemName];
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
  if (typeof type == "string") type = parseInt(type);
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
  switch (property.propertyType) {
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

const toTwo = (number) => {
  return number % 1 == 0 ? number : number.toFixed(2);
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
  if (property.share)
    return html`, jako że wartość całej przedmiotowej nieruchomości wynosi ok.
    ${property.propertyValue}zł, która to nieruchomość aktualnie stanowi
    współwłasność ułamkową powoda w części ${property.share}, będąc uprzednio do
    chwili śmierci spadkodawcy elementem współwłasności łącznej.`;
  if (property.deadShare)
    return html`, jako że wartość całej przedmiotowej nieruchomości wynosi ok.
    ${property.propertyValue}, która to nieruchomość stanowiła współwłasność
    ułamkową spadkodawcy w części ${property.deadShare}.`;
  return ".";
};

const getGrants = (grants) => {
  let grantsString = "";

  if (grants.length > 1)
    for (const i of grants)
      grantsString += html`<li>
        na kwotę ${i.value}zł z dnia
        ${new Date(i.date).toLocaleDateString("pl-PL")}. <br />
        <br />
        <b>Dowód:</b> akt darowizny z dnia
        ${new Date(i.date).toLocaleDateString("pl-PL")} w miejscowości
        ${i.city}. <br /><br />
      </li>`;
  else if (grants.length == 1) {
    const i = grants[0];
    grantsString += html` na kwotę ${i.value}zł z dnia
      ${new Date(i.date).toLocaleDateString("pl-PL")}. <br />
      <br />
      <b>Dowód:</b> akt darowizny z dnia
      ${new Date(i.date).toLocaleDateString("pl-PL")} w miejscowości ${i.city}.
      <br /><br />`;
  } else return "";

  return grantsString;
};

const getTestatorRelation = (relation, isMale) => {
  if (typeof relation == "string") relation = parseInt(relation);

  switch (relation) {
    case 1:
      return isMale ? "mąż" : "żona";
    case 3:
      return isMale ? "syn" : "córka";
    case 4:
      return isMale ? "ojciec" : "matka";
  }
};
