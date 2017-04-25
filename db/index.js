/**
 * Created by Cheng on 4/16/2017.
 */
'use strict';

var promise = require('bluebird');

var options = {promiseLib: promise};

var pgp = require('pg-promise')(options);

var cn = {
    host: 'localhost',
    post: 5432,
    database: 'xuanzhang',
    user: 'xuanzhang'
};

var db = pgp(cn);

module.exports = db;

