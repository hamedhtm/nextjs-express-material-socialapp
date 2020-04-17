import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { reducers, persistedReducer } from "./rootReducer";

const middlewares = [thunk];

export default (initialState) => {
  let store;
  const isClient = typeof window !== "undefined";
  if (isClient) {
    store = createStore(
      persistedReducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares))
    );
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares))
    );
  }
  return store;
};
