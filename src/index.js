import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App'
import rootReducer from './reducers'

import 'bootstrap/dist/css/bootstrap.min.css';

// const initialState = {
//   todos: [{id:1, title: 1}],
//   visibilityFilter: 'SHOW_ALL',
//   visibilityDialog: false,
//   currentEditing: null
// };

const store = createStore(
  rootReducer,
  // initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
