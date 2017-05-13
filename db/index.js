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
    database: 'postgres_cczz_test',
    user: 'postgres_cczz_test',
    password: '123456'
};

var db = pgp(cn);

module.exports = db;

