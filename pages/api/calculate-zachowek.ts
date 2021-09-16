export default (req, res) => {
  console.log(req.body);
  try {
    let { is18, ablebodied, value, givenAwayValue, zapisyValue, udzialy } =
      req.body;

    if (!is18 || !ablebodied) {
      udzialy = (2 * udzialy) / 3;
    } else udzialy = udzialy / 2;

    if (givenAwayValue) value = value + givenAwayValue;
    if (zapisyValue) value = value - zapisyValue;

    res.status(200).send({
      result: (value * udzialy) / 100,
    });
  } catch {
    res.status(400).send({});
  }
};
