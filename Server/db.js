//pg in a collection of node js modules for interacting with postgresql database
const { Pool } = require('pg');

//connect to the database 

const pool = new Pool({
    user: "cel-oiri",
    host: "localhost",
    port: 5432,
    database: "matcha"
});

module.exports = pool;