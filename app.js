const express = require('express');
const path = require('path');
const app = express();


//view engine
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));



app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/sign',(req,res)=>{
    res.render('sign');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.listen(3000,()=>{
    console.log("port çalışıyor");
})