const express = require('express');
const router = express.Router();

const { Register,Login,ProtectUser } = require('../controller/Auth');
const { middleUser, middleAdmin } = require('../middleware/middleUser');

router.post('/register',Register)
router.post('/login',Login)
router.post('/currentUser',middleUser,middleAdmin,ProtectUser)

module.exports = router;