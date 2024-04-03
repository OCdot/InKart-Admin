import AsyncStorage from "@react-native-async-storage/async-storage";
// import persistStore from "redux-persist/lib/persistStore";
import { persistReducer , persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { inKartReducer } from "./reducer";

const persistConfig = {
    key : 'InKartAdmin',
    storage : AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig,inKartReducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware : getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck : false,
        serializableCheck : false,
    })
})

let persister = persistStore(store);

export {store,persister}