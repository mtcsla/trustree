import { hereditaryAcceptanceDeclaration_pl } from "./documents/hereditaryAcceptanceDeclaration_pl";
import { hereditaryRefusalDeclaration_pl } from "./documents/hereditaryRefusalDeclaration_pl";
import { hereditaryRightsApplicationAct_pl } from "./documents/hereditaryRightsApplicationAct_pl";
import { hereditaryRightsApplicationTestament_pl } from "./documents/hereditaryRightsApplicationTestament_pl";
import { zachowekLawsuit_pl } from "./documents/zachowekLawsuit_pl";

export const createDocument = (doctype, metadata) => {
  if (typeof doctype == "string") doctype = parseInt(doctype);
  switch (doctype) {
    case 0:
      return {
        document: hereditaryRefusalDeclaration_pl(metadata),
        filename: "oświadczenie-o-odrzuceniu-spadku.pdf",
        name: "Oświadczenie o odrzuceniu spadku",
      };
    case 1:
      return {
        document: hereditaryAcceptanceDeclaration_pl(metadata),
        filename: "oświadczenie-o-przyjeciu-spadku.pdf",
        name: "Oświadczenie o przyjęciu spadku",
      };
    case 2:
      return {
        document: zachowekLawsuit_pl(metadata),
        filename: "pozew-o-zachowek.pdf",
        name: "Pozew o zachowek",
      };
    case 4:
      return {
        document: hereditaryRightsApplicationAct_pl(metadata),
        filename:
          "wniosek-o-stwierdzenie-nabycia-praw-do-spadku-wg-dziedziczenia-ustawowego.pdf",
        name: "Wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia ustawowego",
      };
    case 5:
      return {
        document: hereditaryRightsApplicationTestament_pl(metadata),
        filename:
          "wniosek-o-stwierdzenie-nabycia-praw-do-spadku-wg-dziedziczenia-testamentowego.pdf",
        name: "Wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia testamentowego",
      };

    default:
      return {
        document: hereditaryRefusalDeclaration_pl(metadata),
        filename: "oświadczenie-o-odrzuceniu-spadku.pdf",
        name: "Oświadczenie o odrzuceniu spadku",
      };
  }
};
