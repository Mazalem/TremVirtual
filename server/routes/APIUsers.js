var express = require('express');
var router = express.Router();
const APIController = require('../controller/APIUsersController');

router.get('/', (req, res) => {res.json({ message: 'API está funcionando!' });});
router.post('/', APIController.cria);
router.post('/login', APIController.login);
router.get('/logout', APIController.logout);
router.get('/verificarLogin', APIController.verificarLogin);

module.exports = router;