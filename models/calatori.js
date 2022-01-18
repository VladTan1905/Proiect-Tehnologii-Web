const { DataTypes } = require("sequelize");
const sequelize = require('../sequelize');
const { Op } = require("sequelize");

const Calatori=sequelize.define("Calatori",{
    idCal:
    {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    iduserCal:
    {
        type:DataTypes.INTEGER,
    },
    PctPlecare:DataTypes.STRING,
    PctSosire:DataTypes.STRING,
    Mijloc:DataTypes.STRING,
    OraP:
    {
        type:DataTypes.INTEGER
    },
    Durata:DataTypes.INTEGER,
    Aglomeratie:DataTypes.STRING,
    Satisfactie:DataTypes.STRING

})




module.exports=Calatori;

