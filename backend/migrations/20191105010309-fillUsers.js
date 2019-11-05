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

exports.up = function(db) {
  insert('users',[
    'firstname', 
    'middlename', 
    'lastname', 
    'login', 
    'password', 
    'salt', 
    'chief'], 
    [
      'Алексей', 
      'Борисович', 
      'Кассь', 
      'alexeykass',
      '81e8cf1af2d776234d8afd433799ce8bca1e0297714213e51a55f4a3d2fcf1b68b620a321e5d2bcea455702b95a605789af4a9e34c10f183550172acc373f6fc', 
      '7871803669b11a45', 
      0], callback)
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
