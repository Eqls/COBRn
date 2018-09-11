import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"
import reducers from '../reducers/index'
import callAPIMiddleware from '../middleware/callAPIMiddleware'

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, callAPIMiddleware))
);

