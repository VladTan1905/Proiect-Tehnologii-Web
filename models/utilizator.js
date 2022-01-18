const { DataTypes } = require("sequelize");
const sequelize = require('../sequelize');


const Utilizator = sequelize.define("Utilizator",
    {
        idUtil:
        {
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            
        },
        password:{
            type:DataTypes.STRING,
            
        },
        email:{
            type:DataTypes.STRING,
         
        }
        
    },

);


module.exports = Utilizator;