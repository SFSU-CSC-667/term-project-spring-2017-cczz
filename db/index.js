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
    database: 'postgres',
    user: 'postgres',
    password: '123456'
};

var db = pgp(process.env.DATABASE_URL || cn);

module.exports = db;

