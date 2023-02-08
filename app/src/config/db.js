const mysql = require("mysql");

const db = mysql.createConnection({
    host : "basicdb.ci96kvjybyjz.ap-northeast-2.rds.amazonaws.com",
    user : "admin",
    password : "admin1234",
    database : "login_lecture",
});

db.connect();

module.exports = db;