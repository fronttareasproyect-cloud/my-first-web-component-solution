/*
 * NOTE: "path" field has to be unique, if not it will use the 1st match
 */
export const NAVIGATION = [
  {
    path: '/',
    page: 'transfer-dashboard',
  },
];

export const ROUTES = NAVIGATION.reduce((res, value) => {
  if (!res[value.page]) {
    res[value.page] = value.path;
  }
  return res;
}, {});
