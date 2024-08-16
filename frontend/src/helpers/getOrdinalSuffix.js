const GetOrdinalSuffix = (date) => {
  if (date === 1) {
    return date + "st";
  }
  if (date === 2) {
    return date + "nd";
  }
  if (date === 3) {
    return date + "rd";
  }
  return date + "th";
};

export default GetOrdinalSuffix;
