import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const initStore = (initialState = {}) => {
  return createStore(reducer, initialState,composeWithDevTools( applyMiddleware(thunk)));
};

// import { createStore, applyMiddleware,compose } from 'redux';
// import thunk from 'redux-thunk';
// import allReducers from './reducers';
// const initialState = {};
// const middleware = [thunk];
// const store = createStore(allReducers,initialState,compose(applyMiddleware(...middleware)));
// export default store;