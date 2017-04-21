'use strict';

var db = require('../db');


module.exports = {
  getAllUsers: function () {
    return db.any('SELECT * FROM users');
  }
};