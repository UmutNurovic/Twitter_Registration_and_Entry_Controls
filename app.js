const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {checkUser}= require('./middleware/auth_MiddleWare');
const fileUpload = require('express-fileupload');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//db Connet
require('./connect/db_Connect');

//router
const auth_Router = require('./Router/AuthRoter');


//view engine
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(fileUpload());
app.use(session({

    secret:process.env.SEESION_SECRET,
    resave:false,
    saveUninitialized:true,

}
));

app.use(flash());
app.use((req,res,next)=>{
res.locals.validation_error = req.flash('validation_error');
res.locals.success_message = req.flash('success_message');
res.locals.name = req.flash('name');
res.locals.email = req.flash('email');
res.locals.password = req.flash('password');
res.locals.login_error = req.flash('error');
next();
});



app.use(auth_Router);
app.listen(3000,()=>{
    console.log("port çalışıyor");
})