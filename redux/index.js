import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// export const initStore = (initialState = {}) => {
//   return createStore(reducer, initialState,composeWithDevTools( applyMiddleware(thunk)));
// };

const initialState = {};
// const middleware = [thunk];
export const initStore = () => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};
//  default initStore;
