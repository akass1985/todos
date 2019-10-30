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

export const apiAuth = (message) => {
  if(socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: message.type,
      login: message.login
    }))
  }
}

export default apiFetchTodos;