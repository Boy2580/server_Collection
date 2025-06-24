const express = require('express');
const router = express.Router();


// Define routes for user skills
const { CreateSkill, GetSkills, UpdateSkill, DeleteSkill } = require('../controller/Skill');

router.get('/users/:userId/skills',GetSkills)
router.post('/users/:userId/skills',CreateSkill)
router.put('/users/:userId/skills/:skillId',UpdateSkill)
router.delete('/users/:userId/skills/:skillId',DeleteSkill);


module.exports = router;