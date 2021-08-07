const mongoose = require('mongoose')

const connectToDatabase = () => {
  const url = `mongodb://localhost:27017/itqan`
  const options = {
    poolSize: 10,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    authSource: 'admin',
    user: 'admin',
    pass: 'admin@@Edritech2021'
  }
  mongoose.connect(url, options).then(() => {
    console.log(`Database itqan is connected!`)
  }).catch(error => {
    console.log('Database => ', error)
  })
}

module.exports = connectToDatabase
