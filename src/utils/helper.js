export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, ".$1.")
    .split(".")
    .filter((t) => t !== "")
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
