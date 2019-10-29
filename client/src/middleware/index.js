export const socket = new WebSocket("ws://back:8080/");

const apiFetchTodos = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({type: message.type,userId: message.userId}));
    }
  }

export default apiFetchTodos;