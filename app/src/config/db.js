const mysql = require("mysql");

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PSWORD,
    database : process.env.DB_DATABASE,
});

//  const db = mysql.createConnection({
//     host : "basicdb.ci96kvjybyjz.ap-northeast-2.rds.amazonaws.com",
//     user : "admin",
//     password : "admin1234",
//     database : "login_lecture",
// });

db.connect();

module.exports = db;

// const { MongoClient } = require('mongodb');