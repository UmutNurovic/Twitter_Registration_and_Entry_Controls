const router = require('express').Router();
const auth_controller = require('../controller/auth_controller');

router.get('/',auth_controller.getIndex);
router.get('/login',auth_controller.getLogin);

router.get('/sign',auth_controller.getSign);

router.post('/sign',auth_controller.PostSign);







module.exports=router;