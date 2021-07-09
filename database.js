const { createPool } = require('mysql');

const pool = createPool({
    host: "",
    user: "",
    password: "",
    database: "test",
    connectionLimit: 10
})

pool.query('INSERT INTO WHERE id=?',[1], (err, result, fields) => {
    if(err) {
        return console.log(err)
    }
    return console.log(result);
});

module.exports = pool;