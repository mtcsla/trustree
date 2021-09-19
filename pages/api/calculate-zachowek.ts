export default (req, res) => {
  try {
    let { is18, workable, value, grantsValue, writeValue, share } = req.body;

    is18 = parseInt(is18);
    workable = parseInt(workable);
    value = parseInt(value);

    grantsValue &&= parseInt(grantsValue);
    writeValue &&= parseInt(writeValue);

    const [numerator, denominator] = share.split("/");
    share = parseInt(numerator) / parseInt(denominator);

    if (!is18 || !workable) {
      share = (2 * share) / 3;
    } else share = share / 2;

    if (grantsValue) value = value + grantsValue;
    if (writeValue) value = value - writeValue;

    res.status(200).send({
      result: value * share,
    });
  } catch {
    res.status(400).send({});
  }
};
