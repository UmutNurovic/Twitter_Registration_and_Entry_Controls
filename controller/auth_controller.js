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
    console.log(req.body);
}

module.exports={
    getIndex,
    getLogin,
    getSign,
    //Posts
    PostSign
}