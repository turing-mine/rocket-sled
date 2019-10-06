var mysql = require('mysql');

const dbUsr = process.env.DBUSR;
const dbPwd = process.env.DBPWD;

var con = mysql.createConnection({
    host: "localhost",
    user: dbUsr,
    password: dbPwd,
    database: "portfolio"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log("Table altered");
    });
});

