var mysql = require('mysql');

const dbUsr = process.env.DBUSR;
const dbPwd = process.env.DBPWD;

var con = mysql.createConnection({
    host: "localhost",
    user: dbUsr,
    password: dbPwd,
    database: "portfolio"
});

con.connect(function(err){
    if (err) throw err;
    var sql = "show tables";
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log(result);
    });
});

