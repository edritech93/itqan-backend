const express = require('express')
const app = express()
const PORT = 8086;
const ModelUser = require('./models/model_user')
const ModelTransaction = require('./models/model_transaction')
const ModelTransactionTotal = require('./models/model_transaction_total')
const connectToDatabase = require('./libs/database')
const bodyParser = require('body-parser')
const cors = require('cors')

connectToDatabase()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

const routeUser = require('./routes/route_user')
const routeTransaction = require('./routes/route_transaction')
const routeTransactionTotal = require('./routes/route_transaction_total')

routeUser(app)
routeTransaction(app)
routeTransactionTotal(app)

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
