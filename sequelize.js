const {Sequelize} =require("sequelize")

//init Sequelize
const sequelize= new Sequelize({
    dialect: "sqlite",
    storage:"./SQL/ProiectTW.db"
});

//sincronizam BD
sequelize.sync().then(()=>{
    console.log("All models were synced");
});

module.exports=sequelize;