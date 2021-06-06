const {validationResult} = require('express-validator');
const getIndex=(req,res)=>{
    res.render('index');
}

const getLogin= (req,res)=>{
    res.render('login');
}

const getSign= (req,res)=>{
    res.render('sign');
}

const PostSign = (req,res)=>{
    const validateError = validationResult(req);
    if(!validateError.isEmpty()){
        req.flash('validation_error',validateError.array());
        req.flash('name',req.body.email);
        req.flash('email',req.body.ad);
        req.flash('password',req.body.soyad);
        res.redirect('/sign');    
    }
    console.log(validateError);
    console.log(req.body);
}

module.exports={
    getIndex,
    getLogin,
    getSign,
    //Posts
    PostSign
}