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
  db.createTable('todos', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: { type: 'string' },
    description: { type: 'text' },
    due_date: { type: 'date' },
    created_date: { type: 'date' },
    modified_date: { type: 'date' },
    priority: { type: 'string' },
    status: { type: 'string' },
    owner: { type: 'int'},
    assigned_user: { type: 'int' }
  }, callback)
  return null;
};

exports.down = function(db, callback) {
  db.dropTable('todos', callback);
  return null;
};

exports._meta = {
  "version": 1
};
