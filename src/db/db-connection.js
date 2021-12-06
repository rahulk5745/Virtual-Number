

const mysql2 = require('mysql2');
const mysql = require('mysql');
//const config = require('config.json');
const dotenv = require('dotenv');
//const { Sequelize } = require('sequelize');
//require('./config/env')
dotenv.config();
// ('dotenv').config({
//     path: './.env'
//   })

//const mysql = require('mysql2/promise');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'test_db',
//     port:'3308',
//   });

//   connection.connect((err) => {
//     if (err) {
//       throw err;
//     }
  
//     console.log('Connected!');
//   });

// const connection = mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'test_db'
//   });
   
//   // simple query
//   connection.query(
//     'SELECT * FROM `user`',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );


//   module.exports = db = {};

// initialize();

// async function initialize() {
//     // create db if it doesn't already exist
//     const { host, port, user, password, database } = config.database;
//     const connection = await mysql.createConnection({ host, port, user, password });
//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

//     // connect to db
//     const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

//     // init models and add them to the exported db object
//     //db.User = require('../users/user.modal')(sequelize);

//     // sync all models with database
//     await sequelize.sync();
// }


class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: 'localhost',
            //database:'myapi37',
            port:'3308',
            user: 'root',
            password: 'root',
            database:'ucm'
            
        });
        this.checkConnection();
    }

    

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;