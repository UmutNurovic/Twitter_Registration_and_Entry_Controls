const router = require('express').Router();

const {checkUser} = require('../middleware/auth_MiddleWare');
router.get('/',checkUser,(req,res)=>{
    res.render('main');
})



module.exports = router ;