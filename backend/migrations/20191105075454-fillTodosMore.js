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
  db.insert('todos',[
    'title',
    'description', 
    'due_date', 
    'created_date', 
    'modified_date', 
    'priority', 
    'status', 
    'owner', 
    'assigned_user'], 
    [
      'Подготовиться к застолью',
      'Купить хлеба и макарон',
      '2019-12-31',
      '2019-11-15',
      '2019-11-15',
      'низкий',
      'выполняется',
      1,
      2], callback)
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
