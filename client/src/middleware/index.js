export const socket = new WebSocket("ws://localhost:8888/");

const apiFetchTodos = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({type: message.type,userId: message.userId}));
    }
  }

export default apiFetchTodos;