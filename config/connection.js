const mysql = require("mysql2");
const Sequelize = require('sequelize');





//------ Establishing a DB connection ------ //
module.exports = new Sequelize('--your DB Name-- ', 'DB username', 'DB Password', {
        host: '--Your Host Name--',
        dialect: '', //chooes yours mine is mysql
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



