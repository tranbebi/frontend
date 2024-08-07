import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlicer from "./slices/cartSlicer";
import  sortSlide  from "./slices/sortSlide";
import filterSlicer from "./slices/filterSlicer";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  cart: cartSlicer,
  sort: sortSlide,
  filter:filterSlicer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);
