const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const path = require('path');

const getIndex= (req,res)=>{
    res.render('index');
}
const getMainPage= async(req,res)=>{
    res.render('main')
}
const getLogin= (req,res)=>{
    
    res.render('login');
}
const PostLogin =  async(req,res)=>{
    
    const _user = await User.findOne({email:req.body.email});
    
    const password = await bcrypt.compare(req.body.password,_user.password);
    if(!_user){
        
        req.flash('validation_error',[{msg: "Böyle bir Mail Bulunmamakta"}]);
        req.flash('name',req.body.email);
        req.flash('email',req.body.email);
        req.flash('password',req.body.password);
        res.redirect('/login');  
    }
    if(!password){
        req.flash('validation_error',[{msg: "Şifre hatalı"}]);
        req.flash('name',req.body.email);
        req.flash('email',req.body.email);
        req.flash('password',req.body.password);
        res.redirect('/login');  
    }
    else{
        if(_user && _user.emailAktif == false){
            req.flash('validation_error',[{msg: "Lütfen Emailinizi onaylayın"}]); 
            req.flash('name',req.body.email);
            req.flash('email',req.body.email);
            req.flash('password',req.body.password);
            res.redirect('/login');  
        }
        const token = createToken(_user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000});
        res.redirect('main');

    }
}

const getSign= (req,res)=>{
    res.render('sign');
}
// token create
const maxAge = 3 * 24 * 60 * 60;
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    });
}

const PostSign = async(req,res)=>{
   
    console.log(req.body);
   
  
    
    const validateError = validationResult(req);
    if(!validateError.isEmpty()){
        req.flash('validation_error',validateError.array());
        req.flash('name',req.body.email);
        req.flash('email',req.body.ad);
        req.flash('password',req.body.soyad);
        res.redirect('/sign');    
    }
    else
    {
        try {
            const _user = await User.findOne({email:req.body.email});
            if(_user && _user.emailAktif == true){
                req.flash('validation_error',[{msg: "Bu mail kullanımda"}]);
                req.flash('name',req.body.email);
                req.flash('email',req.body.email);
                req.flash('password',req.body.password);
                res.redirect('/sign');      
            }
            else if(_user && _user.emailAktif == false || _user == null){
                if(_user){
                    await User.findByIdAndRemove({_id:_user._id});
                }
                let Img = req.files.Img;
                Img.mv(path.resolve(__dirname,'../public/img/userProfileImg',Img.name));
                const newUser = new User({
                    name:req.body.name,
                    Nickname:req.body.Nickname,
                    email:req.body.email,
                    password: await bcrypt.hash(req.body.password,10),
                    Img:`/img/userProfileImg/${Img.name}`,
                });
               await newUser.save();

                //console.log(newUser);
                // JWT Transactions
                const Jwtinformation = {
                    id:newUser._id,
                    mail:newUser.email
                };
                const jwtToken = jwt.sign(Jwtinformation,  process.env.CONFRIM_MAIL_JWT_SECRET,{expiresIn:'1d'});
                console.log(jwtToken);

                // Mailing news
                const url = process.env.WEB_SITE_URL+'verify?id='+jwtToken;
                //console.log(`gidecek url ${url}`);
                let transporter = nodemailer.createTransport({
                    service:'gmail',
                    port: 587,
                    secure:465,
                    auth:{
                        user:process.env.GMAIL_USER,
                        pass:process.env.GMAIL_SIFRE
                    }
                });
                await transporter.sendMail({
                    from:'Twitter clone uygulaması  <info@nodejskurusu.com>',
                    to:newUser.email,
                    subject:'lütfen mailinizi onaylayınız',
                    text:'Emailinizi onaylamak için lütfen linke tıklanyın: '+url
                },(error,info)=>{
                    if(error){
                        console.log("bir hatta oluştu "+ error);
                    }
                    else{
                        console.log("mail gonderildi");
                        console.log(info);
                        transporter.close();
                    }
                  
                });
                res.redirect('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(validateError);
    console.log(req.body); 
}
const verifyMail = (req,res,next)=>{
    
    const token = req.query.id;
    if(token){
   
       try {
           jwt.verify(token,process.env.CONFRIM_MAIL_JWT_SECRET,async (e,decoded)=>{
               if(e){
                   req.flash('error','kod hatalı veya süresi geçmiş');
                   res.redirect('/register');
               }else{
                   const TokenIcindekiIdDegeri = decoded.id;
                   const sonuc = await User.findByIdAndUpdate(TokenIcindekiIdDegeri,{
                       emailAktif:true});
                       if(sonuc){
                           req.flash("success_message",[{msg:"mail başarıyla onaylandı"}]);
                           res.redirect('/login');
                       }else{
                           req.flash("error","Lütfen tekrar kullanici oluşturun");
                           res.redirect('/login');
                       }
                   }
              
           });
       } catch (err) {
           req.flash("error","Token yok veya geçersiz");
           res.redirect('/login'); 
       }
    }else{
        console.log("token yok");
    }
   }




const Getlogout =async(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/login');
};
module.exports={
    getMainPage,
    getIndex,
    getLogin,
    getSign,
    //Posts
    PostSign,
    PostLogin,
    verifyMail,



    //logout
    Getlogout
}