const WebSocket = require('ws');
const mysql = require('mysql')
const conn = mysql.createConnection({
    charset: "utf8_general_ci",
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'example'
});

const wss = new WebSocket.Server({ port: 8080 });
console.log('BACK IS STARTED!');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const obj = JSON.parse(message);
    if (obj.type === "FETCH_TODO"){
        conn.query('SELECT * FROM todos', (err, rows) => {
            if (err) throw err;
            const selection = rows.filter(t => t.id === obj.userId );
            console.log(selection);
            const answer = JSON.stringify(selection);
            console.log(answer);
            ws.send(answer);
        });
    }
  });
});