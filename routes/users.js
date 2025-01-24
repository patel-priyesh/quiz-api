var express = require('express');
var router = express.Router();
let controller = require('../controllers/user');

/* GET home page. */
router.get('/read',controller.SECURE,controller.read);
router.post('/create',controller.create);
router.post('/login',controller.login);
router.patch('/update/:id',controller.update);
router.delete('/delete/:id',controller.SECURE,controller.isAdmin,controller.delete);

module.exports = router;
