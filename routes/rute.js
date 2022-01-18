const express=require('express');
const router=express.Router();
const Calatori=require("../models/calatori");
const Utilizator = require('../models/utilizator');


//adaugam calatorie
router.post('/add',async function(req,res){
    try{
    const nouRoute=await Calatori.create(req.body);
    res.redirect("/");
    }catch(err){return res.status(500).json(err);}
})


router.get('/add',ensureAuthenticated,function(req,res){
    res.render("add",{title: "Add Route"})
})

//vedem detaliat calatoria
router.get('/data/:id',async function(req,res){
   try{ 
       const route=await Calatori.findByPk(req.params.id);
       res.render("route_view",{route:route})
   }catch(err){return res.status(500).json(err);}})

//editam calatoria
   router.get('/edit/:id',ensureAuthenticated,async function(req,res){
    try{ 
        const route=await Calatori.findByPk(req.params.id);
        res.render("edit_route",{route:route,title:'Edit Route'})
    }catch(err){return res.status(500).json(err);}})

    router.post('/edit/:id',async function(req,res){
        try{
        const nouRoute=await Calatori.findByPk(req.params.id);
        nouRoute.update(req.body);
        res.redirect("/");
        
        }catch(err){return res.status(500).json(err);}
    })
 
    //stergem din BD calatoria
    router.get('/delete/:id',ensureAuthenticated,async function(req,res){
        try{
        const nouRoute=await Calatori.findByPk(req.params.id);
        nouRoute.destroy();
        res.redirect("/");
        
        }catch(err){return res.status(500).json(err);}
    })

    //verificam daca utilizatorul este logat
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next();
        } else {
          res.redirect('/utilizator/login');
        }
      }

    module.exports=router;
 
