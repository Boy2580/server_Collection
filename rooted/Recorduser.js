const express = require('express');
const router = express.Router();

// Define routes for user records
const { CreateRecord, ListRecord, UpdateRecord, DeleteRecord } = require('../controller/Recorduser');
const { middleUser,middleAdmin } = require('../middleware/middleUser');

router.post('/record',middleUser,CreateRecord)
router.get('/record',middleUser,ListRecord)
router.put('/record/:recordId',middleUser,UpdateRecord)
router.delete('/users/:userId/record/:recordId',DeleteRecord)



module.exports = router;