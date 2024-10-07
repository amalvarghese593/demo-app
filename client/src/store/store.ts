import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import api from "../middleware/api";
import rootReducer from "../reducers";
import { ENV, REDUX_DEBUG } from "../consts";
import { composeWithDevTools } from "@redux-devtools/extension";

const configureStore = () => {
  let enhancer;
  if (ENV === "development" || REDUX_DEBUG) {
    enhancer = composeWithDevTools(applyMiddleware(thunk as any, api) as any);
  } else {
    enhancer = applyMiddleware(thunk as any, api);
  }
  const store = createStore(rootReducer, enhancer as any);
  return store;
};
export default configureStore;
