const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('mysql','root','my-secret-pw',{
    host: 'localhost',
    dialect: 'mysql',
    port:3306
})

module.exports = sequelize;