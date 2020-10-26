import 'pg';

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'calistanguyen',
    host: 'localhost',
    database: 'climb_on',
    password: 'password',
    port: 5432,
});

const getUsers = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT name FROM users WHERE user_id = 1', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

module.exports = {
    getUsers,
}