var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://riicopxx:wxsedZwKcEoMnhwQ6PgPgtguebvx8iH2@pellefant.db.elephantsql.com:5432/riicopxx';
var db = pgp(connectionString);

// add query functions
function getAllSaldos(req, res, next) {
  db.any('select * from saldos')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL saldos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleSaldos(req, res, next) {
  var pupID = parseInt(req.params.cedula);
  db.one('select * from saldos where cedula = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createSaldos(req, res, next) {
  req.body.cedula = parseInt(req.body.cedula);
  req.body.dinero= parseFloat(req.body.dinero)
  db.none('insert into saldos(cedula, nombre, dinero)' +
      'values(${cedula}, ${nombre}, ${dinero})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one saldos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateSaldos(req, res, next) {
  db.none('update saldos set nombre=$1, dinero=$2 where cedula=$3',
    [req.body.nombre, parseFloat(req.body.dinero), parseInt(req.body.cedula)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated saldo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeSaldos(req, res, next) {
  var pupID = parseInt(req.params.cedula);
  db.result('delete from saldos where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} saldo`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllSaldos: getAllSaldos,
  getSingleSaldos: getSingleSaldos,
  createSaldos: createSaldos,
  updateSaldos: updateSaldos,
  removeSaldos: removeSaldos
};
