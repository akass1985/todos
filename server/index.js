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
  console.log('RECEIVED FETCH_TODOS MESSAGE, userId=%s', userId);
  conn.query('SELECT * FROM todos WHERE owner=? OR assigned_user=?', [userId, userId], (err, rows) => {
    if (err) throw err;
    const answer = JSON.stringify(rows);
    ws.send(answer);
    console.log('SENT: %s', answer);
  });
}

// var sql = "SELECT * FROM ?? WHERE ?? = ?";
// var inserts = ['users', 'id', userId];
// sql = mysql.format(sql, inserts);

const saveTodo = (ws, item) => {
  console.log('RECEIVED SAVE_TODO MESSAGE: %s', JSON.stringify(item));
  console.log('ITEM ID: %s', item.id);
  conn.query(
    'SELECT * FROM todos WHERE id=?', 
    {id: item.id}, 
    (err, rows) => {
      if (err) throw err;

      console.log('SELECT RESULT: %s', rows.length);

      if (rows.length == 0){
        // insert
        console.log('INSERT');
        conn.query(
          'INSERT INTO todos SET ?', 
          item, 
          (err, res) => {
            // if (err) throw err;
            console.log('ISERTING ERROR: %s', JSON.stringify(err));
            console.log(res.insertId);
          })
      } else {
        var sql = "UPDATE todos SET ? WHERE ?";
        var id = item.id;
        delete item['id'];
        console.log('ITEM AFTER DEL ID: %s', JSON.stringify(item));
        var updates = item;
        sql = mysql.format(sql, [id, ...updates]);
        // update
        // conn.query(
        //   'UPDATE todos SET ?', 
        //   item, 
        //   (err, res) => {
        //     if (err) throw err;
        //     console.log(res);
        //   })
        console.log('UPDATE >>> %s', sql)
      }
    });
}

const wss = new WebSocket.Server({ port: 8888 });
console.log('BACK IS STARTED!');

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    var obj = JSON.parse(message);
    // console.log("DHFL %s", message);
    if (obj.type){
      switch (obj.type){
        case "FETCH_TODO": sendTodos(ws, obj.userId); break;
        case "SAVE_TODO": saveTodo(ws, obj.item); break;
        default:
          console.log("DEFAULT: TYPE(%s), MESSAGE (%s)", obj.type, message)
      }
    } else {
      console.log('UNKNOWN MESSAGE TYPE: %s', message)
    }
  });
});