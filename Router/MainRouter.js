const router = require('express').Router();
const Twit = require('../models/Twiit');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');
const {checkUser} = require('../middleware/auth_MiddleWare');
const moment = require('moment');

router.get('/',checkUser,(req,res)=>{
    
 Twit.find({}).sort({$natural:-1}).populate({path:'author',model:User}).then(posts=>{
        const date = moment(posts.date).format('h:mm:ss a');
          res.render('main',{posts:posts,date:date});
        }); 
});
router.post('/',async(req,res)=>{

    let Img = req.files.Imgs;
    Img.mv(path.resolve(__dirname,'../public/img/PostsImg',Img.name));
   const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
            }else{
                let user = await User.findById(decodedToken.id);
                 const twit = new Twit({
                twiit:req.body.twiit,
                author:user._id,
                twiitImg:`/img/PostsImg/${Img.name}`,
            });
            await twit.save();        
            res.redirect('main');        
            }
        });
    }  
   

})


module.exports = router ;