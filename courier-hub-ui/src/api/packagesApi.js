import { executeGet, executePost } from "./apiUtils";

export const requestCreateCourier = (payload) => {
  return executePost(payload.method, payload.body);
};

export const requestPackagesList = (payload) => {
  return executePost(payload.method, payload.body);
};

export const requestDashboardData = (payload) => {
  return executeGet(payload.method);
};
