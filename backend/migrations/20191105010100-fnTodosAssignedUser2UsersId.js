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
  db.addForeignKey('todos', 'users', 'todos_assigned_user_users_id_foreign',
  {
    'assigned_user': 'id'
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
  }, callback);
  return null;
};

exports.down = function(db, callback) {
  db.removeForeignKey('todos', 'todos_assigned_user_users_id_foreign', callback);
  return null;
};

exports._meta = {
  "version": 1
};
