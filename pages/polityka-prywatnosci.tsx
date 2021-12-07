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
              Polityka prywatności
            </h1>
            <p className="text-white text-xs text-right">
              serwisu www.trustree.pl
            </p>
          </div>
        </HeaderText>
        <img src="logo.svg" alt="Logo firmy Trustree." className="mr-4 ml-4" />
      </Header>
      <Card className="p-10 mt-6">
        <h1 className="font-bold mb-2 text-4xl w-full text-center mt-4">
          Polityka prywatności
        </h1>
        <p className="text-lg">
          Celem zapewnienia Użytkowników Serwisu, iż ochrona prywatności
          Użytkowników odwiedzających Serwis jest dla nas szczególnie istotna i
          dla udzielenia Użytkownikom informacji o przedmiocie danych osobowych
          zbieranych przez Serwis, celu ich gromadzenia i wykorzystywania plików
          cookies - przedstawiamy niniejszą nową Politykę prywatności.
        </p>
        <br />
        <p className="text-lg">
          Zapewniamy ochronę prywatności na poziomie co najmniej odpowiadającym
          standardom określonym w obowiązujących przepisach prawnych, w
          szczególności w ustawie z dnia 18 lipca 2002 r. o świadczeniu usług
          drogą elektroniczną (Dz.U.2020.344 t.j.), Rozporządzeniu Parlamentu
          Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w
          sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
          osobowych i w sprawie swobodnego przepływu takich danych oraz
          uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)
          (dalej: RODO) (t.j. Dz.Urz.UE.L 2016 Nr 119, str. 1), ustawie z dnia
          10 maja 2018 r. o ochronie danych osobowych (Dz.U.2019.1781 t.j.), a
          także ustawie z dnia 16 lipca 2004 r. - Prawie telekomunikacyjnym
          (Dz.U.2019.2460 t.j.).
        </p>
        <br />
        <ul>
          <li className="text-lg">
            <b>1.</b> Cele przyjętej polityki prywatności i wykorzystywania
            plików cookies w serwisie internetowym.
          </li>
          <br />
          <li className="text-lg">
            <b>1.1.</b> Niniejsza Polityka prywatności i wykorzystywania plików
            cookies reguluje zasady przetwarzania danych osobowych zbierania i
            wykorzystywania informacji o użytkownikach w serwisie internetowym w
            domenie WWW.TRUSTREE.PL; (zwanych dalej: „Serwisem”). Została
            stworzona i przyjęta przez Trustree Wojtowicz Cieśla Nowak spółka
            jawna (adres ul. Dworcowa 54,14-400 Pasłęk). Administratorem danych
            osobowych jest Trustree Wojtowicz Cieśla Nowak spółka jawna (dalej:
            Administrator).
          </li>
          <br />
          <li className="text-lg">
            <b>1.2.</b> Powierzane przez Użytkownika dane osobowe przetwarzane
            są w zakresie niezbędnym jedynie w celu realizacji usług, sprzedaży,
            dostawy i kontaktowym.
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>1.2.1.</b> zawarcia umowy o realizację usług świadczonych drogą
            elektroniczną ukształtowania jej treści, zmiany i rozwiązania;
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>1.2.2.</b> realizacji składanych przez Użytkownika zamówień na
            produkty znajdujące się w asortymencie Serwisu, w tym kontaktu z
            Użytkownikiem koniecznej ze względu na realizację zamówienia,
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>1.2.3.</b> rozpatrywania reklamacji Użytkownika,
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>1.2.4.</b> realizacji zwrotu świadczeń w przypadku odstąpienia od
            umowy;
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>1.2.5.</b> statystycznym, badawczym;
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>1.2.6.</b>
            informacyjnym dla udzielania odpowiedzi na zadane przez Użytkownika
            pytania;
          </li>
          <br />
          <h4 className="w-full font-bold">
            Podanie danych osobowych jest dobrowolne zgodnie z przepisami RODO.
            Użytkownik w każdej chwili może żądać usunięcia swoich danych.
          </h4>
          <br />
          <li className="text-lg">
            <b>1.3.</b> Informujemy, że w Serwisie mogą znajdować się odesłania
            – linki umożliwiające w przypadku ich kliknięcia dotarcie do innych
            stron internetowych zarządzanych przez innych administratorów.
            Administrator niniejszego Serwisu nie ma wpływu na prowadzoną przez
            tych administratorów politykę prywatności, ani politykę
            wykorzystywania plików cookies i nie ponosi za nie
            odpowiedzialności. Dlatego też apelujemy o zapoznanie się przez
            Użytkownika z polityką prywatności tych serwisów i wykorzystywania
            plików cookies.
          </li>
        </ul>
        <br />
        <ul>
          <li className="text-lg">
            <b>2.</b> Dane zbierane o użytkownikach w serwisie, w tym dane
            osobowe sposób ich wykorzystywania, uprawnienia Użytkownika
            Odwiedzając nasz Serwis dane o użytkowniku mogą być przez niego
            udostępniane na dwa sposoby: biernie i aktywnie. Dane zbierane
            biernie to informacje automatycznie zapisywane przez serwis, np.
            anonimowe informacje dotyczące czasu wizyty Użytkownika, adres IP,
            adres URL, rodzaj przeglądarki (tzw. logi systemowe). Narzędzie to
            działa w oparciu o tzw. pliki cookies i nie udostępnia danych
            umożliwiających identyfikację Użytkownika. Serwis pobiera także dane
            dotyczące geolokalizacji Użytkownika celem zweryfikowania, z jakiego
            miejsca (kontynentu, kraju, miejscowości) Użytkownik dokonuje
            zamówienia. Jeżeli realizacja zamówienia do lub w lokalizacji
            Użytkownika jest niemożliwa, w tym zabroniona złożenie zamówienia
            nie będzie możliwe i Użytkownik otrzyma odpowiednią wiadomość w
            komunikacie wyświetlającym się podczas próby złożenia zamówienia.
            Zebrane w wyżej opisany sposób dane przechowywane są przez czas rok
            jedynie w celu pomocniczym dla administrowania Serwisem,
            umożliwiając sprawne jego funkcjonowanie i stosowanie rozwiązań
            przyjaznych dla Użytkownika. Zapewniamy, iż informacje te nie są
            ujawniane nikomu poza osobami upoważnionymi do administrowania
            Serwisem.
          </li>
          <br />
          <li className="text-lg">
            <b>2.1.</b> Dane gromadzone przez Serwis to również dane
            przekazywane przez Użytkownika aktywnie.
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>2.1.1.</b> W celu złożenia zamówienia Użytkownik może
            jednorazowo, bez konieczności uprzedniej rejestracji i logowania,
            uzupełnić formularz zamówienia poprzez jego wypełnienie podając dane
            imię, nazwisko, adres, PESEL, adres e-mail oraz numer karty
            debetowej. Wyżej wymienione dane przetwarzane są tylko przez czas
            niezbędny do realizacji zamówienia i nie są udostępniane przez
            Administratora osobom trzecim. Po zrealizowaniu zamówienia dane są
            usuwane.
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>2.1.2.</b>
            Serwis umożliwia kontakt z Administratorem za pomocą adresu e-mail:
            mail@trustree.pl. Kontaktując się w ten sposób podajesz adres e
            –mail oraz imię i nazwisko. Dane te wykorzystywane są tylko i
            wyłącznie w celu kontaktowym tj. sporządzeniu odpowiedzi na pytanie
            zadane przez Użytkownika.
          </li>
          <br />
          <li className="text-lg ml-4">
            <b>2.1.3.</b> Użytkownik w każdym czasie ma prawo wglądu do
            przetwarzanych przez Administratora danych, prawo żądania ich
            zmiany, a także ich usunięcia. W tym celu należy prośbę napisać na
            adres e-mail: mail@trustree.pl.
          </li>
          <br />
        </ul>{" "}
        <ul>
          <li className="text-lg">
            <b>3.</b> Pliki Cookie i sposób ich wykorzystywania
          </li>
          <br />
          <li className="text-lg">
            <b>3.1.</b> Podczas korzystania z Serwisu na urządzeniu końcowym
            Użytkownika zapisywane są niewielkie pliki, w szczególności pliki
            tekstowe, które zawierają informacje umożliwiające zapamiętanie
            danych aktywności, a w tym czasu i ilości czynności (dalej: „pliki
            cookies”). Pliki cookies umożliwiają także zebranie danych
            statystycznych, o którym mowa w ppkt 1.2.5.
          </li>
          <br />
          <li className="text-lg">
            <b>3.2.</b> Pliki cookies nie zawierają danych identyfikujących
            Użytkownika, co oznacza, iż na ich podstawie nie jest możliwe
            ustalenie jego tożsamości. Zapisywane pliki, z których serwis
            korzysta nie są w żaden sposób szkodliwe dla Użytkownika ani
            urządzenia i nie ingerują w jego oprogramowanie ani ustawienia.
          </li>
          <br />
          <li className="text-lg">
            <b>3.3.</b> Rodzaje plików cookies: W Serwisie używamy następujących
            rodzajów plików cookies: Celem wyjaśnienia funkcji stosowanych
            plików, informujemy, iż: ⎯ pliki sesyjne to pliki tymczasowe, które
            przechowywane są w Twoim urządzeniu do czasu wylogowania się z
            Serwisu, wyjścia z Serwisu, w tym poprzez całkowite zamknięcie
            przeglądarki. ⎯
            ..................................................(należy wpisać
            inne rodzaje używane w serwisie)
          </li>
          <br />
          <li className="text-lg">
            <b>3.4.</b> Przypominamy, iż zasadniczo przeglądarki w ustawieniach
            domyślnych mają zaznaczoną opcję umożliwiającą zapisywanie plików
            cookies. Jeżeli Użytkownik nie wyraża zgody na zapisywanie tych
            plików na urządzeniu końcowym, Użytkownik powinien zmienić
            ustawienia przeglądarki internetowej, z której korzysta.
            Uniemożliwienie zapisywania plików cookies może polegać na: ⎯
            niezapisywaniu plików cookies na urządzeniu końcowym; ⎯ każdorazowym
            informowaniu użytkownika o zapisaniu danego pliku cookie na
            urządzeniu; ⎯ usuwaniu plików po skorzystaniu z Serwisu. Aby
            skorzystać z odpowiedniej dla Użytkownika opcji, należy zapoznać się
            z informacjami o zarządzaniu plikami cookies, które znajdują się
            najczęściej w „Ustawieniach” przeglądarki lub w zakładce „Pomoc". Za
            każdym razem Użytkownik może też skontaktować się z Serwisem
            wysyłając na adres mailowy mail@trustree.pl wszelkie pytania i
            wątpliwości, a konsultanci Serwisu udzielą wszelkich potrzebnych
            informacji. Należy mieć jednak świadomość, iż w przypadku, w którym
            pliki są konieczne do działania Serwisu ograniczenie ich
            wykorzystywania może utrudnić korzystania z Serwisu. Ustawienia
            przeglądarki Twojego urządzenia pozwalające na zapisywanie plików
            cookies oraz wyrażenie zgody poprzez kliknięcie opcji „zgadzam się”
            w oknie pojawiającym się po wejściu do Serwisu oznacza, że
            Użytkownik wyraża zgodę, aby pliki te zapisywane były na urządzeniu
            końcowym.
          </li>
          <br />
          <li className="text-lg">
            <b>3.5.</b> Dane zbierane za pomocą urządzenia Google Analytics lub
            podstawowego programu automatycznie przez pliki cookies mogą być
            użyte wyłącznie do tworzenia statystyk, które pomagają zrozumieć, w
            jaki sposób Użytkownicy witryny korzystają ze strony, co umożliwia
            ulepszanie struktury i jej zawartości. Informacja wytworzona przez
            plik cookie, dotycząca korzystania przez Państwa z Serwisu (w tym
            Państwa adres IP, który znajduje się tam, gdzie Państwo znajdują się
            w Internecie) będzie przekazana i przechowywana przez Google na
            serwerach w Stanach Zjednoczonych. Google będzie wykorzystywał te
            informacje w celu oceny korzystania przez Państwa z Serwisu,
            zestawiania raportów z działalności prowadzonej na witrynie dla
            operatorów witryny oraz świadczenia innych usług dotyczących
            działalności na witrynie i korzystania z Internetu. Google może
            również przesyłać takie informacje podmiotom zewnętrznym, jeżeli
            wymagają tego przepisy prawa lub w przypadku, gdy podmioty
            zewnętrzne przetwarzają je w imieniu Google. Google nie będzie
            kojarzył Państwa adresu IP z innymi danymi znajdującymi się w
            posiadaniu Google. W celu uzyskania dalszych informacji o Google
            Analytics, prosimy zapoznać się z informacjami na temat Cookies and
            Analytics, oraz Polityką Zachowania Poufności danych dla Google
            Analytics dotyczącej Google Analytics.
          </li>
          <br />
        </ul>
        <ul>
          <li className="text-lg">
            <b>4.</b> Zabezpieczenia Dane osobowe Użytkownika są przechowywane w
            bazie danych, dla której zastosowano środki techniczne i
            organizacyjne zapewniające ochronę przetwarzanych danych zgodne z
            wymaganiami określonymi przez przepisy prawa dotyczące ochrony
            danych osobowych, w szczególności w ustawie z dnia 18 lipca 2002 r.
            o świadczeniu usług drogą (Dz.U.2020.344 t.j.), Rozporządzeniu
            Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
            2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
            danych osobowych i w sprawie swobodnego przepływu takich danych oraz
            uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie
            danych) (dalej: RODO) (t.j. Dz.Urz.UE.L 2016 Nr 119, str. 1),
            ustawie z dnia 10 maja 2018 r. o ochronie danych osobowych
            (Dz.U.2019.1781 t.j.), a także ustawie z dnia 16 lipca 2004 r. -
            Prawie telekomunikacyjnym (Dz.U.2019.2460 t.j.). Serwis wykorzystuje
            technologie i procedury ochrony danych osobowych zapewniające
            maksymalną ochronę prywatności Użytkowników. Stosowane w Serwisie
            narzędzia i mechanizmy to m.in połączenia szyfrujące typu https.
            Dostęp do bazy mają jedynie osoby, posiadające upoważnienia nadane
            przez administratora danych. Użytkownik korzystając z Serwisu przy
            użyciu urządzenia końcowego osoby trzeciej powinien usunąć historię
            przeglądania.
          </li>
          <br />
          <li className="text-lg">
            <b>5.</b> Zmiany w polityce prywatności Zmiany w polityce
            prywatności będą dokonywane tylko w celu podwyższenia standardów
            ochrony polityki prywatności lub dostosowania polityki do wymogów
            prawa. Za każdym razem Użytkownik zostanie poinformowany o zmianie w
            komunikacie wyświetlającym się na stronie głównej Serwisu.
          </li>
          <br />
          <li className="text-lg">
            <b>6.</b> Kontakt z przedsiębiorcą lub administratorem i zgłaszanie
            nieprawidłowości Zgłoszenia wszelkich nieprawidłowości, uwag, żądań
            w zakresie polityki prywatności prosimy dokonywać na adres e-mail:
            mail@trustree.pl. Zapewniamy, że każde zgłoszenie będzie przez nas
            rozpatrzone i udzielimy na nie odpowiedzi na podany w zgłoszeniu
            adres poczty elektronicznej.
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
