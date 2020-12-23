const Pool = require ('pg').Pool;

const  pool = new Pool ({
    user:'postgres',
    password:'azerty',
    host:'localhost',
    port:5432,
    database:'testdb'
});

pool.connect((err)=> {
    (err)?console.error(err.message):console.log("Database Connected!");
  });

module.exports = pool;