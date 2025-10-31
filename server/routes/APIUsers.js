var express = require('express');
var router = express.Router();
const APIController = require('../controller/APIUsersController');

router.get('/', (req, res) => {res.json({ message: 'API está funcionando!' });});
router.post('/', APIController.cria);
router.put('/', APIController.atualiza);
router.get('/liberado/:email', APIController.liberado);
router.post('/autologin', APIController.autoLogin);
router.post('/login', APIController.login);
router.get('/logout', APIController.logout);
router.get('/verificarLogin', APIController.verificarLogin);
router.get('/entrarTurma/:idAluno/:idProfessor', APIController.entrarTurma);
router.get('/sairTurma/:idAluno/:idProfessor', APIController.sairTurma);
router.get('/verificarTurma/:idAluno', APIController.verificarTurma);
router.get('/retirarAluno/:idAluno/:idProfessor', APIController.retirarAluno);
router.get('/listarAlunos/:idProfessor', APIController.listarAlunos);

module.exports = router;