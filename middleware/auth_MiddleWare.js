const jwt = require('jsonwebtoken');
const {model} = require('mongoose');
const User = require('../models/user');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    //Check json web token exiss & is verified
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{console.log(decodedToken); next();}
        });
    }
    else{
        res.redirect('/login');
    }
}



//check current user 
const checkUser =(req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next();
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user=user;
                
                next();
            }
        });
    }
    else{
        res.redirect('login');
        res.locals.user=null;
        next();
    }
}

module.exports ={
    requireAuth,checkUser
}