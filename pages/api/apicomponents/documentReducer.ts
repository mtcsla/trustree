import { hereditaryRefusalDeclaration_pl } from "./documents/hereditaryRefusalDeclaration_pl";
import { hereditaryRightsApplicationAct_pl } from "./documents/hereditaryRightsApplicationAct_pl";
import { hereditaryRightsApplicationTestament_pl } from "./documents/hereditaryRightsApplicationTestament_pl";
import { zachowekLawsuit_pl } from "./documents/zachowekLawsuit_pl";

export const createDocument = (doctype, metadata) => {
  switch (doctype) {
    case "hereditaryRightsApplicationTestament_pl":
      return {
        document: hereditaryRightsApplicationTestament_pl(metadata),
        filename:
          "wniosek-o-stwierdzenie-nabycia-praw-do-spadku-wg-dziedziczenia-ustawowego.pdf",
        name: "Wniosek o stwierdzenie nabycia praw do spadku wg. dziedziczenia ustawowego",
      };
    case "hereditaryRightsApplicationAct_pl":
      return {
        document: hereditaryRightsApplicationAct_pl(metadata),
        filename:
          "wniosek-o-stwierdzenie-nabycia-praw-do-spadku-wg-dziedziczenia-testamentowego.pdf",
        name: "Wniosek o stwierdzenie nabycia praw do spadku wg. dziedziczenia testamentowego",
      };
    case "zachowekLawsuit_pl":
      return {
        document: zachowekLawsuit_pl(metadata),
        filename: "pozew-o-zachowek.pdf",
        name: "Pozew o zachowek",
      };

    case "hereditaryRefusalDeclaration_pl":
    default:
      return {
        document: hereditaryRefusalDeclaration_pl(metadata),
        filename: "oświadczenie-o-odrzuceniu-spadku.pdf",
        name: "Oświadczenie o odrzuceniu spadku",
      };
  }
};
