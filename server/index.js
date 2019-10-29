const WebSocket = require('ws');
const mysql = require('mysql')
const conn = mysql.createConnection({
    charset: "utf8_general_ci",
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'example'
});

const sendTodos = (ws, userId) => {
  conn.query('SELECT * FROM todos', (err, rows) => {
    if (err) throw err;
    const selection = rows.filter(t => t.id === userId );
    const answer = JSON.stringify(selection);
    ws.send(answer);
    console.log('SENT: %s', answer);
  });
}

const saveTodo = (ws, item) => {
  conn.query(
    'SELECT * FROM todos WHERE id=?', 
    obj.item, 
    (err, rows) => {
      if (err) throw err;
      console.log(rows)
      if (rows.length == 0){
        // insert
        // const sql_insert = 'INSERT INTO todos(';
        // conn.query(
        //   sql_insert, 
        //   obj.values, 
        //   (err, rows) => {

        //   }
      } else {
        // update
      }
    });
}

const wss = new WebSocket.Server({ port: 8888 });
console.log('BACK IS STARTED!');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('RECEIVED: %s', message);
    const obj = JSON.parse(message);
    if (obj.type){
      switch (obj.type){
        case "FETCH_TODO": sendTodos(ws, obj.userId)
        // case "SAVE_TODO": ws.send(ws, obj.item)
        default:
          console.log("UNKNOWN TYPE MESSAGE: %s", message)
      }
    }    
  });
});