const router = require('express').Router();
const authCtrl = require("../controllers/authCtrl");

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/logout', authCtrl.logout);
router.post('/refresh_token', authCtrl.refreshToken);
router.get('/user', authCtrl.getUser);

module.exports = router;
