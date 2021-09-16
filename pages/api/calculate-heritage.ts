import { Fraction } from "fractional";

export default (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    let result: any[] = [
      data.spouse || data.relation === 1
        ? HereditarySpouse(data)
        : new Fraction(0, 1),

      data.kin > 0 || data.relation === 2
        ? HereditaryKin(data)
        : new Fraction(0, 1),

      data.parents > 0 || data.relation === 3
        ? HereditaryParent(data)
        : new Fraction(0, 1),

      data.children > 0 || data.relation === 4
        ? HereditaryChild(data)
        : new Fraction(0, 1),

      data.children > 0 || data.relation === 4 || data.relation === 5
        ? HereditaryGrandchild(data)
        : new Fraction(0, 1),

      data.kin > 0 || data.relation === 2 || data.relation === 6
        ? HereditaryEnkel(data)
        : new Fraction(0, 1),
    ];

    for (const item in result) {
      result[item] = result[item].toString();
    }

    console.log(result);
    res.status(200).send({ result, relation: data.relation });
  } catch (err) {
    res.status(400).send({});
  }
};

const HereditarySpouse = ({ children, parents, kin }) => {
  if (children == 0) {
    if (parents == 0) {
      if (kin == 0) return new Fraction(1, 1);
      return new Fraction(1, 2);
    }
    return new Fraction(1);
  }
  if (children <= 3) return new Fraction(1, 1).divide(children + 1);
  return new Fraction(1, 4);
};

const HereditaryChild = ({ children, spouse }) => {
  if (spouse == 0) return new Fraction(1, 1).divide(children);
  if (children <= 3) return new Fraction(1, 1).divide(children + 1);
  return new Fraction(3, 4).divide(children);
};

const HereditaryKin = ({ kin, parents, children, spouse }) => {
  if (children > 0) return new Fraction(0, 1);
  if (parents == 2) return new Fraction(0, 1);
  if (spouse == 1)
    return parents == 0
      ? new Fraction(1, 2).divide(kin)
      : new Fraction(1, 4).divide(kin);
  return parents == 0
    ? new Fraction(1, 1).divide(kin)
    : new Fraction(1, 2).divide(kin);
};

const HereditaryParent = ({ children, spouse, parents, kin }) => {
  if (children > 0) return new Fraction(0, 1);
  if (!spouse)
    if (parents == 1) {
      if (kin == 0) return new Fraction(1, 1);
      else return new Fraction(1, 2);
    } else return new Fraction(1, 2);
  if (spouse) {
    if (parents == 1) {
      if (kin == 0) return new Fraction(1, 2);
      else return new Fraction(1, 4);
    } else return new Fraction(1, 4);
  }
};

const HereditaryGrandchild = ({ parentAlive, userKin, children, spouse }) => {
  if (parentAlive == 1) return new Fraction(0, 1);
  return HereditaryChild({ children, spouse }).divide(userKin + 1);
};

const HereditaryEnkel = ({
  kin,
  parents,
  children,
  spouse,
  parentAlive,
  userKin,
}) => {
  if (parentAlive == 1) return new Fraction(0, 1);
  return HereditaryKin({ kin, parents, children, spouse }).divide(userKin + 1);
};

const RelationReducer = (data) => {
  const relation = data.relation;

  return HereditaryChild(data);
};
