var express = require('express');
var router = express.Router();
var axios = require('axios')
const config = require('../config/apiEnv')

/* GET /entidades/:id -> página de informação de uma entidade */
router.get("/:id", function (req, res, next) {
  axios
    .get(config.apiRoute("/contratos/entidades/" + req.params.id))
    .then((infoEntidade) => {
      console.log(infoEntidade.data);
      axios
        .get(config.apiRoute("/contratos?entidade=" + req.params.id))
        .then((list) => {
          res
            .status(200)
            .render("entidade", {
              title: "Entidade " + req.params.id,
              info: infoEntidade.data[0],
              list: list.data,
              n_registos: list.data.length,
            });
        })
        .catch((erro) => {
          res
            .status(500)
            .render("error", { message: "SOmething went wront", error: erro });
        });
    })
    .catch((erro) => {
      res
        .status(500)
        .render("error", { message: "SOmething went wront", error: erro });
    });
});

module.exports = router;
