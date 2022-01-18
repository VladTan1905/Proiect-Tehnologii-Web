"use strict";

const express=require("express");
const res = require("express/lib/response");
const sequelize=require("./sequelize");
const path=require('path');
var bodyParser = require('body-parser')
const router=require("express").Router();
var jsonParser = bodyParser.json();
require("./models/utilizator");
const Utilizator = require("./models/utilizator");
const Calatori=require("./models/calatori");
const { redirect } = require("express/lib/response");
const config=require('./config/database');
const passport=require('passport');
const expressValidator=require('express-validator');
const flash=require('connect-flash');
const session=require('express-session');
require('./config/passport');




const app= express();
app.use(express.json());
app.use(
    express.urlencoded({extended: true})
);
app.use(express.json());





//creare table
app.use("/crete",async (req,res)=>{
    try{
        await sequelize.sync({force:true});
        res.status(201).json({message:"Create"});
    }catch(err){res.status(400).json({message:"Failed"});}
});


app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));

//middleware express-session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));

//setare pasaport
  require('./config/passport')(passport); 

  app.use(passport.initialize());
  app.use(passport.session());

  //setare variabila globala utilizator
  app.get('*',function(req,res,next){
    res.locals.utilizator=req.user || null;
    next();
});


//incarcare date index
app.get('/',async function(req,res){
    
    let CalList= await Calatori.findAll({raw:true})
         res.render("index",{"CalList":CalList,title:"Calatorii"})
    
 });


 //incarcare routes
 let utilizator=require('./routes/utilizator');
app.use('/utilizator',utilizator);

let rute=require('./routes/rute');
app.use('/rute',rute);

 

  

 
//incepere server
app.listen(7000,async()=>{
    console.log("Server started on http://localhost:7000");
    try{
        await sequelize.authenticate()
        console.log("Merge")
    }catch(err){
        console.log("Nu merge pt ca ",err)
    }
})