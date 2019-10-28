let socket = new WebSocket("ws://localhost:8888/");

socket.onopen = function(e) {
  alert("[open] Соединение установлено");
  alert("Отправляем данные на сервер");
  socket.send("Меня зовут Джон");
};



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

const apiFetchTodos  = () => {
    return new Promise((resolve, reject) => {
        socket.onmessage = function(event) {
            resolve(JSON.parse(event.data));
          };
    })
}

export default apiFetchTodos;