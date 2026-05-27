import { executeGet, executePost } from "./apiUtils";

export const requestCreateCourier = (payload) => {
  return executePost(payload.method, payload.body);
};

export const requestGetPackages = (payload) => {
  return executeGet(payload.method);
};
