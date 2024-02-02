const Sequelize = require('sequelize');

const sequelize = require('../util/datebase');

const CartItem = sequelize.define('cartItem',{
    id: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER,
    
});

module.exports = CartItem;