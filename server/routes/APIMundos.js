var express = require('express');
var router = express.Router();
const APIMundosController = require('../controller/APIMundosController');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/', (req, res) => {res.json({ message: 'API está funcionando!' });});
router.post("/", upload.single("jogoZip"), APIMundosController.cria);
router.get('/lista', APIMundosController.index);
router.get('/consulta/:_id', APIMundosController.show);

module.exports = router;