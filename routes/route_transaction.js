'use strict'
module.exports = function (app) {
  const controller = require('../controllers/controller_transaction')
  app.route('/v1/transaction').get(controller.transactionGet)
  app.route('/v1/transaction').post(controller.transactionAdd)
  app.route('/v1/transaction').put(controller.transactionEdit)
  app.route('/v1/transaction').delete(controller.transactionDelete)
}
