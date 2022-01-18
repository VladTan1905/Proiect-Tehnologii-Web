const LocalStrategy=require('passport-local').Strategy;
const Utilizator=require('../models/utilizator');
const config=require('../config/database');

module.exports=function(passport){
    passport.use(new LocalStrategy(async (username,password,done)=>{
        try{
        const Util=await Utilizator.findOne({where:{username}});
        if(!Util){return done(null,false);}
        if(Util.password==password){
            return done(null,Util);
        }else{return done(null,false);}
    }catch(err){return done(null,false)}
    }))
    passport.serializeUser(function(Util, done) {
        done(null, Util.idUtil);
      });
      
      passport.deserializeUser(async function(id, done) {
        try{
        const Util=await Utilizator.findByPk(id);
          done(null, Util);
        }catch(err){console.log(err)}
        });
      

}