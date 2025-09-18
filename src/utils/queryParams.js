import queryString from "query-string";

//use to convert a query param string into js object
export const parseQueryParams = (params, parseOptions) =>
  queryString.parse(params, { arrayFormat: "bracket", ...parseOptions });

//use to create a new query param string
export const createQueryParams = (params, arrayFormat) =>
  queryString.stringify(params, { arrayFormat: arrayFormat || "bracket" });
