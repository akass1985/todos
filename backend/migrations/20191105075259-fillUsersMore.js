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
  db.insert('users',[
    'firstname', 
    'middlename', 
    'lastname', 
    'login', 
    'password', 
    'salt', 
    'chief'], 
    [
      'Иван', 
      'Иванович', 
      'Иванов', 
      'i.i.ivanov',
      '6021860af20edc56d8100cccec6b0912667dd00eb108b891ec7316a10cd0acdb1d7ba2ac7531f622b36b1d8634b5668f4fe1298f9892a78a7b2f6cad47f58227', 
      '7871803669b11a45', 
      1], callback)
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
