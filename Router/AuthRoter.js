const router = require('express').Router();
const validateSignUser = require('../middleware/validataion_Middleware');
const auth_controller = require('../controller/auth_controller');
const User = require('../models/user');

router.get('/',auth_controller.getIndex);
router.get('/login',auth_controller.getLogin);
router.get('/sign',auth_controller.getSign);
router.get('/main',auth_controller.getMainPage);

router.post('/sign',validateSignUser.validateNewUser(),auth_controller.PostSign);
router.post('/login',auth_controller.PostLogin);

router.get('/logout',auth_controller.Getlogout);





router.get('/verify',auth_controller.verifyMail);


module.exports=router;