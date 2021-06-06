const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//db Connet
require('./connet/db_Connect');

//router
const auth_Router = require('./Router/AuthRoter');


//view engine
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));



app.use(bodyParser.urlencoded({extended:true}));

app.use(auth_Router);

app.listen(3000,()=>{
    console.log("port çalışıyor");
})