'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true },
    firstname: 'string',
    middlename: 'string',
    lastname: 'string',
    login: 'string',
    password: 'text',
    salt: 'text',
    chief: { type: 'int' }
  }, callback)
  return null;
};

exports.down = function(db), callback {
  db.dropTable('users', callback);
  return null;
};

exports._meta = {
  "version": 1
};
