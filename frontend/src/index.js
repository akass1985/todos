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
  fetchTodo} from './actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import { socket } from './api'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

socket.onopen = (e) => {
  // store.dispatch(fetchUsers());
}

socket.onmessage = (message) => {
  // alert(message.data);
  const obj = JSON.parse(message.data);
  if (obj.type){
    switch (obj.type){
      case "FETCH_TODOS": 
        store.dispatch(fetchTodoSuccess(obj.data));
      case "FETCH_USERS": 
        store.dispatch(fetchUsersSuccess(obj.data));
      // case "LOGIN":
      //   if (obj.result === "OK"){
      //     // store.dispatch(loginSuccessful(obj.userId));
      //     // store.dispatch(fetchTodo());
      //     break;
      //   } else {
      //     // store.dispatch(loginFailure(obj.error));
      //     break;
      //   }
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
  store.dispatch(fetchTodoFailure(error));
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
