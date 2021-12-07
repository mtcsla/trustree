import { Button, Card, UL } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { useWindowSize } from "../hooks/windowSize";
import Link from "next/link";

export default function WarunkiSwiadczeniaUslug() {
  const { width } = useWindowSize();

  return (
    <>
      <Header
        className="w-full flex text-left flex-wrap-reverse justify-center rounded-lg"
        style={{
          background: "var(--sea-green)",
          overflowX: "clip",
        }}
      >
        <HeaderText
          className="flex flex-col p-0 text-left ml-4 mr-4 justify-center"
          style={{
            background: "var(--sea-green)",
          }}
        >
          <div className="flex flex-col">
            <h1 className={`text-white mt-2  text-${width > 1000 ? 4 : 3}xl`}>
              Warunki świadczenia usług
            </h1>
            <p className="text-white text-xs text-right">
              przez serwis www.trustree.pl
            </p>
          </div>
        </HeaderText>
        <img src="logo.svg" alt="Logo firmy Trustree." className="mr-4 ml-4" />
      </Header>
      <Card className="p-10 mt-6">
        <h1 className="font-bold mb-2 text-4xl w-full text-center mt-4">
          Warunki świadczenia usług na stronie internetowej: www.trustree.pl
        </h1>
        <br />
        <p className="text-lg">
          Niniejsze Warunki określają warunki i zasady korzystania ze strony
          internetowej: <b>www.trustree.pl</b> (zwanej dalej{" "}
          <b>„Stroną Internetową”</b>), a także{" "}
          <b>
            prawa, obowiązki, odpowiedzialność i inne postanowienia dotyczące
            Użytkowników
          </b>{" "}
          (zwane dalej <b>„Regulaminem“</b>). Przed przystąpieniem do
          korzystania z systemu <b>www.trustree.pl</b> i usług świadczonych
          przez Spółkę Użytkownik musi uważnie przeczytać i zrozumieć treść
          niniejszych Warunków.
        </p>{" "}
        <br />
        <p className="text-lg">
          Niniejszy Regulamin nie ma na celu ograniczania praw Użytkowników, ani
          też nie może być w żaden sposób interpretowany jako ograniczający ich
          prawa zgodnie z prawem polskim.
        </p>{" "}
        <br />
        <p className="text-lg">
          Do korzystania z usług www.trustree.pl są uprawnione jedynie osoby,
          które zgodnie z Kodeksem Cywilnym mogą zawierać odpowiednie umowy.
          Użytkownikami zgodnie z treścią niniejszych Warunków są dowolni
          użytkownicy strony internetowej (zwani dalej „Użytkownikiem”).
        </p>
        <br />
        <p className="text-lg">
          Wszelkie dodatkowe pytania dotyczące niniejszych Warunków należy
          zgłaszać zespołowi www.trustree.pl, który odpowie na wszystkie pytania
          pod numerem telefonu: <b>+48 697 085 254</b> lub adresem poczty
          elektronicznej: <b>mail@trustree.pl</b>
        </p>
        <br />
        <p className="text-lg">
          Należy pamiętać, że Spółka jest uprawniona do jednostronnej zmiany
          niniejszego Regulaminu bez zachowania okresu uprzedniego
          powiadomienia. Dlatego zalecamy Użytkownikowi okresowe sprawdzanie
          niniejszego Regulaminu.
        </p>
        <br />
        <h2 className="text-3xl text-center">
          Stosowanie i interpretacja Regulaminu Strony Internetowej
        </h2>
        <br />
        <ul>
          <li className="text-lg">
            <b>1.1.</b> Niniejszy dokument jest umową zawartą pomiędzy
            Kancelarią Radcy Prawnego Piotr Wojtowicz (adres ul. Świętojańska
            34/7, 81-372 Gdynia, e-mail: mail@trustree.pl) (zwaną dalej
            „WWW.TRUSTREE.PL“), która jest prawomocnym właścicielem strony
            internetowej www.trustree.pl, a Użytkownikiem dotyczącą zasad
            korzystania ze Strony Internetowej.
          </li>
          <br />
          <li className="text-lg">
            <b>1.2.</b> Korzystając ze Strony Internetowej i sięgając po usługi
            WWW.TRUSTREE.PL, użytkownik potwierdza, że wyraża zgodę na
            przestrzeganie Regulaminu. Akceptując Regulamin, Użytkownik
            potwierdza, że jest uprawniony do wybrania i zakupu usług
            www.trustree.pl.
          </li>
          <br />
          <li className="text-lg">
            <b>1.3.</b> Zgodnie z treścią niniejszych Warunków usługi obejmują
            wszelkie działania Użytkownika, które może wykonać na Stronie
            Internetowej, w tym między innymi wyszukiwanie dodatkowych
            informacji prawnych, wybór produktów i usług, zamawianie usług i
            uregulowanie za nie zapłaty, wysyłanie lub odbiór jakichkolwiek
            informacji lub danych (dalej zwane „Usługami”). Użytkownik
            korzystający ze Strony Internetowej i/lub Usług wyraża zgodę na
            bezwarunkowe przestrzeganie w dowolny sposób i w dowolnej formie
            wszystkich wymagań określonych w niniejszym Regulaminie. W
            przypadku, gdy Użytkownik nie zgadza się na wypełnienie wszystkich
            obowiązków określonych w niniejszym Regulaminie, ale korzysta z
            systemu i usług WWW.TRUSTREE.PL, Kancelaria Radcy Prawnego Piotr
            Wojtowicz nie ponosi odpowiedzialności za jakiekolwiek szkody
            wyrządzone Użytkownikowi jego własnym działaniem. Użytkownik, który
            nie akceptuje niniejszych Warunków, nie jest uprawniony do
            korzystania z jakichkolwiek Usług na Stronie Internetowej.
          </li>
          <br />
          <li className="text-lg">
            <b>1.4.</b> Oprócz niniejszych Warunków stosunki między
            Użytkownikiem a WWW.TRUSTREE.PL regulują powszechne przepisy prawa,
            warunki szczególne oraz polityka prywatności zamieszczona na Stronie
            Internetowej.
          </li>
          <br />
          <li className="text-lg">
            <b>1.5.</b> Jeśli którekolwiek z postanowień niniejszych Warunków
            jest niezgodne z prawem lub z jakiegokolwiek powodu zostaje
            całkowicie lub częściowo unieważnione, nie unieważnia ono
            pozostałych postanowień Warunków. Postanowienia i warunki ogólne
          </li>
        </ul>
        <br />
        <h2 className="text-3xl text-center">Postanowienia i warunki ogólne</h2>
        <br />
        <ul className="text-lg">
          <li className="text-lg">
            <b>2.1.</b> WWW.TRUSTREE.PL zapewnia Użytkownikom przestrzeń
            wirtualną, tj. Stronę Internetową, na której Użytkownicy mają
            możliwość znalezienia pożądanej usługi lub produktu, a także
            zamówienia jej i uregulowania za nią zapłaty na Stronie
            Internetowej.
          </li>
          <br />
          <li className="text-lg">
            <b>2.2.</b> Wszelkie powiadomienia i informacje między Użytkownikiem
            a WWW.TRUSTREE.PL muszą być przesyłane drogą elektroniczną na adresy
            określone w niniejszym Regulaminie lub na Stronie Internetowej (o
            ile nie określono inaczej).
          </li>
          <br />
        </ul>
        <h2 className="text-3xl text-center">
          Obowiązki i potwierdzenia Użytkownika
        </h2>
        <br />{" "}
        <ul className="text-lg">
          <li>
            <b>3.1.</b> Użytkownik oświadcza i zapewnia, że:
          </li>{" "}
          <li className="ml-3">
            <b>3.1.1.</b> ma co najmniej 18 lat;
          </li>{" "}
          <li className="ml-3">
            <b>3.1.2.</b> rozumie postanowienia Regulaminu oraz fakt, że
            korzystanie ze Strony Internetowej i Usług pociąga za sobą prawny
            obowiązek zapłaty za produkt i/lub usługę zamówioną na stronie
            WWW.TRUSTREE.PL;
          </li>
          <br />
          <li>
            <b>3.2.</b> Składając WWW.TRUSTREE.PL zamówienie na produkt i/lub
            usługę, Użytkownik potwierdza, że:
          </li>{" "}
          <li className="ml-3">
            <b>3.2.1.</b> jest osobą fizyczną lub prawną posiadającą wszelkie
            uprawnienia i prawa do złożenia zamówienia ma zakup produktów i/lub
            usług oferowanych na stronie internetowej;
          </li>
          <li className="ml-3">
            <b>3.2.2.</b> należycie wykonywać obowiązki określone w punkcie{" "}
            <b>3.1.</b>
            Regulaminu;
          </li>{" "}
          <li className="ml-3">
            <b>3.2.3.</b> rozumie i wyraża zgodę WWW.TRUSTREE.PL na zarządzanie
            i przetwarzanie danych Użytkownika zgodnie z prawem i Polityką
            Prywatności.
          </li>
        </ul>
        <br />
        <h2 className="text-3xl text-center">
          Obowiązki i potwierdzenia TRUSTREE.PL
        </h2>
        <br />
        <ul className="text-lg">
          <li>
            <b>4.1.</b> WWW.TRUSTREE.PL zobowiązuje się:
          </li>{" "}
          <li className="ml-3">
            <b>4.1.1.</b> stworzyć dla Użytkownika przestrzeń internetową, na
            której będzie mógł zapoznać się z produktami i/lub usługami
            znajdującymi się na stronie internetowej, a także złożyć zamówienie
            i uregulować za niego zapłatę;
          </li>{" "}
          <li className="ml-3">
            <b>4.1.2.</b> w przypadku wystąpienia problemów z realizacją
            zamówienia możesz skontaktować się z przedstawicielem
            WWW.TRUSTREE.PL pod numerem telefonu: +48 697 085 254 lub adresem
            poczty elektronicznej: mail@trustree.pl.
          </li>
          <br />
          <li>
            <b>4.2.</b> WWW.TRUSTREE.PL potwierdza, że Usługi są świadczone
            zgodnie z prawem.
          </li>
          <br />
          <li>
            <b>4.3.</b> WWW.TRUSTREE.PL oświadcza, że:
          </li>
          <li className="ml-3">
            <b>4.3.1.</b> dąży do zapewnienia zamieszczania wiarygodnych i
            aktualnych informacji o produktach, usługach i innych informacji,
            jednak nie ponosi odpowiedzialności za dokładność informacji
            związanych z usługodawcami osób trzecich.
          </li>
        </ul>
        <br />
        <h2 className="text-3xl text-center">
          Ceny i sposoby uregulowania zapłaty
        </h2>
        <br />
        <ul className="text-lg">
          {" "}
          <li>
            <b>5.1.</b> Ceny Usług zamieszczone na Stronie Internetowej obejmują
            podatek od towarów i usług (VAT). Cena Usług może się różnić w
            zależności od miejsca siedziby Użytkownika. Płatności za Usługi są
            dokonywane w formie przelewu lub kartą płatniczą w momencie
            świadczenia Usług.
          </li>
        </ul>
        <br />
        <h2 className="text-3xl text-center">Dostęp do Strony Internetowej</h2>
        <br />
        <ul className="text-lg">
          <li>
            <b>6.1.</b> Strona Internetowa WWW.TRUSTREE.PL jest dostępna 24
            godziny na dobę.
          </li>
          <br />
          <li>
            <b>6.2.</b> W celu polepszenia jakości świadczonych Usług Strona
            Internetowa może nie być dostępna o dowolnej porze dnia lub przez
            czas nieokreślony.
          </li>
          <br />
          <li>
            <b>6.3.</b> WWW.TRUSTREE.PL korzysta z najbardziej zaawansowanych
            narzędzi ochrony danych i chroni informacje każdego Użytkownika.
            Należy jednak zauważyć, że WWW.TRUSTREE.PL nie zapewnia pełnej
            gwarancji ochrony danych, pozostawiając dane ryzyko po stronie
            Użytkownika.
          </li>
          <br />
        </ul>
        <h2 className="text-3xl text-center">
          Polityka WWW.TRUSTREE.PL plików cookie
        </h2>
        <br />{" "}
        <ul className="text-lg">
          <li>
            <b>7.1.</b> Użytkownik rozumie i wyraża zgodę na gromadzenie przez
            WWW.TRUSTREE.PL informacji o Użytkownikach przy użyciu plików
            cookie.
          </li>
          <br />
          <li>
            <b>7.2.</b> Pliki cookie – to pliki pasywne przechowywane na
            komputerze lub innym sprzęcie IT. Pliki cookie nie stanowią
            zagrożenia dla urządzeń. Podczas przeglądania strony internetowej
            przeglądarka odczytuje pliki cookie i dostarcza informacji, na
            przykład do rozpoznania Użytkownika jako odwiedzającego Stronę
            Internetową i dostosowania zawartości Strony Internetowej do potrzeb
            Użytkownika.
          </li>
          <br />
          <li>
            <b>7.3.</b> Pliki cookie nie mogą być używane do osobistej
            identyfikacji, ale WWW.TRUSTREE.PL może, w połączeniu z innymi
            informacjami o Tobie, jeśli są one przechowywane u nas, użyć je do
            analizy odwiedzin z Twojego komputera lub innego sprzętu IT.
            Zgromadzone dane są używane wyłącznie zgodnie z obowiązującym
            prawem. Pamiętaj, że informacje są zapisywane jedynie w przypadku
            wyrażenia przez Ciebie zgody na stosowanie plików cookie.
          </li>
          <br />
          <li>
            <b>7.4.</b> WWW.TRUSTREE.PL wykorzystuje dane z plików cookie do
            prowadzenia podstawowej działalności i zapewnienia różnych
            rozwiązań. Używamy również plików cookie do gromadzenia statystyk,
            które mogą na przykład służyć do udoskonalenia naszej Strony
            Internetowej i dostosowania jej do potrzeb odwiedzających Stronę
            Internetową.
          </li>
          <br />
          <li>
            <b>7.5.</b> WWW.TRUSTREE.PL wykorzystuje pliki cookie w
            następujących celach:
          </li>
          <li className="ml-3">
            <b>7.5.1.</b> świadczenia usług wysokiej jakości. Przechowując
            określone informacje w dokumentach, WWW.TRUSTREE.PL może świadczyć
            Usługi znacznie szybciej i wydajniej dla większej liczby
            odwiedzających. Informacje te są zwykle przechowywane w postaci
            zaszyfrowanej i mogą być odszyfrowane jedynie przez WWW.TRUSTREE.PL;
          </li>{" "}
          <li className="ml-3">
            <b>7.5.2.</b> zabezpieczenia użytkownika przed nieuprawnionym
            użyciem jego danych w celu wejścia do systemu;
          </li>{" "}
          <li className="ml-3">
            <b>7.5.3.</b> śledzenia statystyk, takich jak liczba odwiedzających
            i ruch na Stronie Internetowej. Takie informacje nie są powiązane z
            danymi osobowymi Użytkownika.
          </li>{" "}
          <br />
          <li>
            <b>7.6.</b> Użytkownik nie może usunąć własnych plików cookie ze
            strony internetowej WWW.TRUSTREE.PL, ale wszystkie przeglądarki
            pozwalają Użytkownikowi usuwać pliki cookie pojedynczo lub
            natychmiast. Procedura usuwania plików cookie zależy od przeglądarki
            używanej przez Użytkownika. Jeśli używasz więcej niż jednej
            przeglądarki, pamiętaj o usunięciu pliku cookie we wszystkich
            przeglądarkach.
          </li>
        </ul>
        <br />
        <h2 className="text-3xl text-center">Prawa własności intelektualnej</h2>
        <br />
        <ul className="text-lg mb-4">
          <li>
            <b>8.1.</b> Kancelaria Radcy Prawnego Piotr Wojtowicz jest
            właścicielem wszystkich praw do treści WWW.TRUSTREE.PL i ma wyłączne
            prawo do korzystania z nich. Wszystkie znaki towarowe, design,
            nazwy, logo itp. usługi zamieszczane na Stronie Internetowej są
            własnością WWW.TRUSTREE.PL.
          </li>
          <li>
            <b>8.2.</b> Wszelkie przetwarzanie, powielanie i/lub inne
            wykorzystanie treści, design i/lub wykorzystanie WWW.TRUSTREE.PL w
            inny sposób przez osoby trzecie bez pisemnej zgody WWW.TRUSTREE.PL
            i/lub z naruszeniem Regulaminu stanowi naruszenie praw autorskich.
          </li>
          <li>
            <b>8.3.</b> Warunki korzystania ze Strony Internetowej i Polityka
            Prywatności podlegają prawu Rzeczypospolitej Polskiej.
            Nieprzestrzeganie warunków Strony Internetowej i/lub Polityki
            Prywatności pociąga za sobą odpowiedzialność prawną.
          </li>
        </ul>
      </Card>
      <Link href="/" passHref>
        <a>
          <Button className="w-full mt-6" intent="primary" icon="caret-left">
            STRONA GŁÓWNA
          </Button>
        </a>
      </Link>
    </>
  );
}
const Header = styled.div`
  padding: 30px;
  @media (max-width: 1000px) {
    padding: 20px;
  }
`;
const HeaderText = styled.div``;
