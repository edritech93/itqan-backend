const express = require('express')
const app = express()
const ModelUser = require('./models/model_user')
const connectToDatabase = require('./libs/database')
const bodyParser = require('body-parser')
const cors = require('cors')

connectToDatabase()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

const routeUser = require('./routes/route_user')

routeUser(app)

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(CONFIG.portServer, () => {
  console.log(`Server is running on port ${CONFIG.portServer}`)
})
