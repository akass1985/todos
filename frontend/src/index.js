import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App'
import rootReducer from './reducers'
import { 
  fetchTodoSuccess, 
  fetchTodoFailure, 
  fetchUsers, 
  fetchUsersSuccess,  
  dbDisconnect, 
  loginSuccessful,
  loginFailure,
  fetchTodo,
  saveTodoSuccess,
  saveTodoFailure} from './actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { socket } from './api'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

socket.onopen = (e) => {
}

socket.onmessage = (message) => {
  const obj = JSON.parse(message.data);
  if (obj.type){
    switch (obj.type){
      case "FETCH_TODOS": {
        store.dispatch(fetchTodoSuccess(obj.data)); };break;
      case "FETCH_USERS": 
        store.dispatch(fetchUsersSuccess(obj.data)); break
      case "LOGIN": {
          if (obj.result === "SUCCESS"){
            store.dispatch(loginSuccessful(obj.userId));
            store.dispatch(fetchTodo(obj.userId));
            store.dispatch(fetchUsers());
          } else {
            store.dispatch(loginFailure(obj.error));
          }
        }; break;
      case "SAVE_TODO":{
          if (obj.result === "SUCCESS"){
            store.dispatch(saveTodoSuccess(obj.userId));
            store.dispatch(fetchTodo(obj.userId));
          } else {
            store.dispatch(saveTodoFailure(obj.data));
          }}; break;
      case "UPDATE_NOTIFICATION":{
        store.dispatch(fetchTodoSuccess(obj.data));
      }
    }
  }
}

socket.onclose = (event) => {
  if (event.wasClean) {
    alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    store.dispatch(dbDisconnect("Соединение с сервером потеряно"));
  }
};

socket.onerror = (error) => {
  // store.dispatch(fetchTodoFailure(error));
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
