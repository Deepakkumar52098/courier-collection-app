import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./slices/rootReducer";
import { watcherSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
})

sagaMiddleware.run(watcherSaga)

export default store