var express = require('express');
var router = express.Router();
var axios = require('axios')
const config = require('../config/apiEnv')


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(config.apiRoute('/contratos'))
  .then((data) => {
    contratos = data.data
    res.status(200).render('index', {'title' : 'Lista de Contratos - Teste epoca Normal EngWeb2024', 'n_registos' : contratos.length,'list' : contratos})
  })
  .catch(erro => {
    res.status(500).render('error', {'message' : "SOmething went wront", "error" : erro})
  })
});


/* GET /:id -> página do registo */
router.get('/:id', function(req, res, next) {
  axios.get(config.apiRoute('/contratos/' + req.params.id))
  .then((data) => {
    contrato = data.data
    res.status(200).render('contrato', {'title' : 'Contrato ' + req.params.id, 'n_registos' : contrato.length,'data' : contrato})
  })
  .catch(erro => {
    res.status(500).render('error', {'message' : "SOmething went wront", "error" : erro})
  })
});

module.exports = router;