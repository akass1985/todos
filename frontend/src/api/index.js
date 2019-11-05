export const socket = new WebSocket("ws://back:8888/");

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
      item: message.item,
      userId: message.userId
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

export const apiLogin = (message) => {
  if(socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: message.type,
      credentials: message.credentials
    }))
  }
}

export default apiFetchTodos;