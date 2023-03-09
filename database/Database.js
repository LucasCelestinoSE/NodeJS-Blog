const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress','root','lucas@98623457',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;