'use strict'
module.exports = function (app) {
  const controller = require('../controllers/controller_user')
  app.route('/v1/transaction').get(controller.userGet)
  app.route('/v1/transaction').post(controller.userAdd)
  app.route('/v1/transaction').put(controller.userEdit)
  app.route('/v1/transaction').delete(controller.userDelete)
}
