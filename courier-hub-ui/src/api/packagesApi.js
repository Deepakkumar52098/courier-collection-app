import { executePost } from "./apiUtils";

export const requestCreateCourier = (payload) => {
  return executePost(payload.method, payload.body);
};

export const requestPackagesList = (payload) => {
  return executePost(payload.method, payload.body);
};
