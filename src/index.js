import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App'
import rootReducer from './reducers'
import { fetchTodo, ActionTypes, fetchTodoSuccess } from './actions'
import 'bootstrap/dist/css/bootstrap.min.css';
// import apiFetchTodos, { socket } from './middleware'
import { socket } from './middleware'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// import { ActionTypes } from "../actions";



socket.onopen = (e) => store.dispatch(fetchTodo());
// socket.onopen = (e) => (e)



socket.onmessage = (event) => {
  store.dispatch(fetchTodoSuccess(JSON.parse(event.data)))
}

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    alert('[close] Соединение прервано');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};

// const apiFetchTodos  = () => {
//     return new Promise((resolve, reject) => {
//         socket.onmessage = function(event) {
//             resolve(JSON.parse(event.data));
//           };
//     })
// }

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
