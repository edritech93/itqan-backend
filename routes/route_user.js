'use strict'
module.exports = function (app) {
  const controller = require('../controllers/controller_user')
  app.route('/v1/user').get(controller.userGet)
  app.route('/v1/user').post(controller.userAdd)
  app.route('/v1/user').put(controller.userEdit)
  app.route('/v1/user').delete(controller.userDelete)
}
