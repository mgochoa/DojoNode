var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/saldos', db.getAllSaldos);
router.get('/api/saldos/:cedula', db.getSingleSaldos);
router.post('/api/saldos', db.createSaldos);
router.put('/api/saldos/:cedula', db.updateSaldos);
router.delete('/api/saldos/:cedula', db.removeSaldos);


module.exports = router;
