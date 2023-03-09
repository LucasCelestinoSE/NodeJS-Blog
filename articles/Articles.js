const Sequelize = require('sequelize');
const connection = require('../database/Database')
// para relacionamento
const Category = require('../categories/Categories')
//
const Articles = connection.define('Articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});
// para relacionamento
Category.hasMany(Articles) // Relacionamento uma categoria tem muitos artigos
Articles.belongsTo(Category) // Relacionamentos 1 para 1

module.exports = Articles