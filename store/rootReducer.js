import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authentication from "./_reducer/authentication.reducer";
import registration from "./_reducer/registration.reducer";

const persistConfig = {
  key: "root",
  storage,
};

export const reducers = combineReducers({
  auth: authentication,
  register: registration,
});

export const persistedReducer = persistReducer(persistConfig, reducers);
