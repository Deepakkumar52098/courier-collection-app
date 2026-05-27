import { executePost } from "./apiUtils"

export const requestLogin = (payload) => {
    return executePost(payload.method, payload.body)
}