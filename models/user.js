const {Sequelize, DataTypes, DatabaseError} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    
    fechaNacimiento:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{ timestamps:true}
);

module.exports=User;