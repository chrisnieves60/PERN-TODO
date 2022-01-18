const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres", 
    password: "28376563fd",
    host: "localhost",
    port: 5432, 
    database: "perntodo"
});

module.exports = pool; 