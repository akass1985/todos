const WebSocket = require('ws');
const mysql = require('mysql')
'use strict';
var crypto = require('crypto');

const clients = [];

const conn = mysql.createConnection({
    charset: "utf8_general_ci",
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'example'
});


/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

const updateNotification = function(websocketes) {
  console.log('NOTIFICATIONS ON UPDATE');  
  conn.query('SELECT * FROM todos', (err, rows) => {
    if (err) throw err;
    const answer = JSON.stringify({
      type: "UPDATE_NOTIFICATION",
      data: rows
    });
    for (var i = 0; i < websocketes.length; i++){
      websocketes[i].send(answer);
      console.log('SENT: %s', answer);
    }
  });
}

const sendTodos = (ws, userId) => {
  console.log('RECEIVED FETCH_TODOS MESSAGE, userId=%s', userId);
  conn.query('SELECT * FROM todos', (err, rows) => {
    if (err) throw err;
    const answer = JSON.stringify({
      type: "FETCH_TODOS",
      result: "SUCCESS",
      data: rows
    });
    ws.send(answer);
    console.log('SENT: %s', answer);
  });
}

const sendUsers = (ws, filter) => {
  console.log('RECEIVED FETCH_USERS MESSAGE, filter=%s', filter);
  conn.query('SELECT id, firstname, middlename, lastname, chief FROM users', (err, rows) => {
    if (err) throw err;
    const answer = JSON.stringify({
      type: "FETCH_USERS",
      result: "SUCCESS",
      data: rows
    });
    ws.send(answer);

    console.log('SENT: %s', answer);
  });
}

const saveTodo = (ws, item, userId) => {
  console.log('RECEIVED SAVE_TODO MESSAGE: %s', JSON.stringify(item));
  console.log('WITH USERID=%s', userId);
  if (item.id){
    // UPDATE
    console.log('UPDATING %s', JSON.stringify(item));
    conn.query(
      'UPDATE todos SET ? WHERE id=?', 
      [{...item, modified_date: new Date() }, item.id], 
      (err, res) => {
        if (err) throw err;
        const answer = JSON.stringify({
          type: "SAVE_TODO",
          result: "SUCCESS",
          userId: userId
        });
        ws.send(answer);
        updateNotification(clients);
        console.log("SAVE RESULT IS %s", res.affectedRows > 0 ? 'OK' : 'FAIL');
      })
  } else {
    // INSERT
    console.log('INSERTING %s', JSON.stringify(item));
    conn.query(
      'INSERT INTO todos SET ?', 
      item, 
      (err, res) => {
        if (err) throw err;
        const answer = JSON.stringify({
          type: "SAVE_TODO",
          result: "SUCCESS",
          userId: userId
        });
        ws.send(answer);
        updateNotification(clients);
        console.log("SAVE RESULT IS %s", res.affectedRows > 0 ? 'OK' : 'FAIL');
      })
  }
}

const login = (ws, credentials) => {
  console.log('RECEIVED LOGIN MESSAGE, filter=%s', JSON.stringify(credentials));
  conn.query(
    'SELECT id, login, password, salt FROM users WHERE login=?', 
    [credentials.login], 
    (err, rows) => {
      try {
        if (err) throw err;

        if (rows.length){
          console.log("LOGIN \"%s\" IS EXIST", credentials.login);
          const match = rows.find( user => {
            const passwordData = sha512(credentials.password, user.salt);
            console.log('HASH WITH GET PASSWORD IS %s', passwordData.passwordHash);
            return user.password === passwordData.passwordHash;
          });
          if (match){
            console.log("FOUND PASSWORD FOR \"%s\" IS EXIST", credentials.login);
            const answer = JSON.stringify({
              type: 'LOGIN',
              result: 'SUCCESS',
              userId: match.id
            });
            ws.send(answer);
            console.log('SENT: %s', answer);
          } else {
            console.log("DON'T MATCH");
            const answer = JSON.stringify({
              type: 'LOGIN',
              result: 'FAILURE',
              error: "Неправильный пароль"
            });
            ws.send(answer);
            console.log('SENT: %s', answer);
          }
        } else {
          console.log("LOGIN \"%s\" NOT EXIST", credentials.login);
          const answer = JSON.stringify({
            type: 'LOGIN',
            result: 'FAILURE',
            error: "Пользователя с таким логином не существует"
          });
          ws.send(answer);
          console.log('SENT: %s', answer);
        }
      } catch(e){
        
      }
    }
  );
}

const wss = new WebSocket.Server({ port: 8888 });
console.log('BACK IS STARTED!');
wss.on('connection', (ws) => {
  clients.push(ws);
  console.log('CONNECTED: %s', clients.length);
  ws.on('message', (message) => {
    var obj = JSON.parse(message);
    if (obj.type){
      switch (obj.type){
        case "FETCH_TODO":
          sendTodos(ws, obj.userId); break;
        case "SAVE_TODO":
          saveTodo(ws, obj.item, obj.userId); break;
        case "FETCH_USERS": sendUsers(ws, obj.filter); break;
        case "LOGIN": login(ws, obj.credentials); break;
        default:
          console.log("DEFAULT: TYPE(%s), MESSAGE (%s)", obj.type, message)
      }
    } else {
      console.log('UNKNOWN MESSAGE TYPE: %s', message)
    }
  });
});