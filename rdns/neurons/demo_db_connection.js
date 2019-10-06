
var mysql = require('mysql');

//require('dotenv').config();

const dbUsr = process.env.DBUSR;
const dbPwd = process.env.DBPWD;

console.log(process.env);

var con = mysql.createConnection({
    host: "localhost",
    user: dbUsr,
    password: dbPwd
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to (localhost) mysql!");
});

con.end();

