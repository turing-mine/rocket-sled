
var mysql = require('mysql');

const dbUsr = process.env.DBUSR;
const dbPwd = process.env.DBPWD;

var con = mysql.createConnection({
    host: "localhost",
    user: dbUsr,
    password: dbPwd
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE portfolio", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        con.end();
    });
});

