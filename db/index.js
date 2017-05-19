/**
 * Created by Cheng on 4/16/2017.
 */
'use strict';

var promise = require('bluebird');

var options = {promiseLib: promise};

var pgp = require('pg-promise')(options);

//var cn = {
//    host: 'localhost',
//    post: 5432,
//    database: 'postgres',
//    user: 'postgres',
//    password: '123456'
//};
//
//var db = pgp(cn);

//var db = pgp('postgres://paymhnenwlxxsd:2da6012ece1ad45d94e57bc6c5000f8af539b9253291455dfac8ee26f950747d@ec2-54-225-119-223.compute-1.amazonaws.com:5432/d7f7q1cf8f2ar?ssl=true');

module.exports = db;

