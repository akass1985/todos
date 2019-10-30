import WebSocketAsPromised from 'websocket-as-promised'
import { ActionTypes, loginSuccessful, fetchTodo, loginFailure } from '../actions';

export const socket = new WebSocket("ws://localhost:8888/");

export const apiFetchTodos = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: message.type, 
          userId: message.userId
        }));
    }
  }

export const apiSaveTodo = (message) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: message.type, 
      item: message.item
    }))
  }
}

export const apiFetchUsers = (message) => {
  if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: message.type, 
        filter: message.filter
      }));
  }
}

// export const apiLogin = (message) => {
//   if(socket.readyState === WebSocket.OPEN) {
//     socket.send(JSON.stringify({
//       type: message.type,
//       credentials: message.credentials
//     }));
//   }
// }

export const apiLogin = (values, dispatch) => {
  const wsp = new WebSocketAsPromised("ws://localhost:8888/");

  wsp.open()
  .then( 
    () => wsp.send(JSON.stringify({ type: ActionTypes.LOGIN, credentials: values })), 
    () => alert("FAIL") )
  .then( 
    () => wsp.onMessage.addListener(message => {
      const obj = JSON.parse(message);
      if (obj.result === "OK"){
        dispatch(loginSuccessful({data: obj.userId}));
        dispatch(fetchTodo());
      } else {
        dispatch(loginFailure(message.error));
      }
    },
    () => alert("X"))
  )
  // .then( () => wsp.close() )
  .catch(
    (e) => alert(e)
  );
}

export default apiFetchTodos;