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
<<<<<<< HEAD
    user: 'postgres',
    password: '123456'
=======
    user: 'postgres'
>>>>>>> 5914ab2b6f2bda4461c8ce7fa4b9a229370d37d3
};

var db = pgp(cn);

module.exports = db;

