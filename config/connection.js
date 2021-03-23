const mysql = require("mysql2");
const Sequelize = require('sequelize');





//------ Establishing a DB connection ------ //
module.exports = new Sequelize('test', 'admin', 'helloracle#db', {
        host: 'database-01.cv2uua0r65md.us-east-2.rds.amazonaws.com',
        dialect: 'mysql',
        operatorAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }, define:
                {
            timestamps: false
        }
    });






