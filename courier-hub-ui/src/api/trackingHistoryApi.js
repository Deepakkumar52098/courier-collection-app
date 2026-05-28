import { executeGet } from "./apiUtils";

export const requestTrackingHistory = (payload) => {
    const url = payload.method + payload.trackingId
  return executeGet(url, payload.body);
};
