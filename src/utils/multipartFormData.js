export const multiPartFormData = (workData, nullables = []) => {
  let form = new FormData();
  Object.keys(workData)
    .filter((fill) => {
      return workData?.[fill] !== "" || nullables.some((key) => key === fill);
    })
    .map((item) => {
      return form.append(
        item,
        typeof workData[item] === "string"
          ? workData[item]
              .toString()
              .replace(/\s{2,}/g, " ")
              .trim()
          : workData[item]
      );
    });
  return form;
};
