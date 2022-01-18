const express=require('express');
const router=express.Router();
const Utilizator=require("../models/utilizator");
const Calatori=require("../models/calatori");
const passport=require('passport');
var bodyParser = require('body-parser');


//logare cont
router.get('/login',function(req,res){
    res.render('login',{title:'Login'})
})

router.use(bodyParser.json());
router.post('/login',function(req,res,next){
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/utilizator/login'
    })(req,res,next);

})


//inregistrare nou cont
router.get('/register',function(req,res){
    res.render("register",{title: 'Register'})
})




router.post('/register',async(req,res)=>
{
        const{username,email,password}=req.body;
        const dejaExistaEmail=await Utilizator.findOne({where:{email}}).catch((err)=>{console.log("erroare: ",err);});
        if(dejaExistaEmail){return res.status(409).json({message: "Deja exista cu acest email, folositi alt email"})}
        const dejaExistaUsername=await Utilizator.findOne({where:{username}}).catch((err)=>{console.log("erroare: ",err);});
        if(dejaExistaUsername){return res.status(409).json({message: "Deja exista cont cu acest username, folositi alt username"})}
        try{
            const nouUtil=await Utilizator.create(req.body);
            res.redirect('/');
        }catch(err){return res.status(500).json(err);}

    })
//modificare cont
    router.get('/schimbaredate/:id',ensureAuthenticated,async function(req,res){
        try{ 
            res.render("edit_profil",{title:'Edit Profile'})
        }catch(err){return res.status(500).json(err);}})
    
     router.post('/schimbaredate/:id',async function(req,res){
         try{
            const utilizator=await Utilizator.findByPk(req.params.id);
            utilizator.update(req.body);
            res.redirect("/");
         }catch(err){console.log(err);}
            
        })

//calatori doar ale utilizatorului logat
    router.get('/cal_util',ensureAuthenticated,async function(req,res){
    
        let CalList= await Calatori.findAll({raw:true})
             res.render("cal_util",{"CalList":CalList,title:"Calatorii Utilizator"})
        
     });

//functia logout
router.get('/logout',ensureAuthenticated,function(req,res){
    req.logout();
    res.redirect('/');
})
  
//verificam daca suntem logati
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/utilizator/login');
    }
  }

    

    module.exports=router;