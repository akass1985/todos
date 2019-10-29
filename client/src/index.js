import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App'
import rootReducer from './reducers'
import { fetchTodo, ActionTypes, fetchTodoSuccess, fetchTodoFailure, dbDisconnect } from './actions'
import 'bootstrap/dist/css/bootstrap.min.css';
// import apiFetchTodos, { socket } from './middleware'
import { socket } from './middleware'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

socket.onopen = (e) => store.dispatch(fetchTodo());

socket.onmessage = (event) => {
  store.dispatch(fetchTodoSuccess(JSON.parse(event.data)))
}

socket.onclose = (event) => {
  if (event.wasClean) {
    alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    store.dispatch(dbDisconnect("Аааа! Шеф! Всё потеряно!!!"));
  }
};

socket.onerror = (error) => {
  store.dispatch(fetchTodoFailure(error));
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
