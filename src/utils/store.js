import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from '../reducers/index'
import callAPIMiddleware from '../middleware/callAPIMiddleware'

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, callAPIMiddleware))
);

