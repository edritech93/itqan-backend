'use strict'
module.exports = function (app) {
  const controller = require('../controllers/controller_transaction_total')
  app.route('/v1/transaction/total').get(controller.transactionTotalGet)
  app.route('/v1/transaction/total/byUserId').get(controller.transactionTotalGetByUserId)
  app.route('/v1/transaction/total').post(controller.transactionTotalAddEdit)
}
