'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Helper = require('../libs/helper')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const model = new Schema({
  amount: {
    type: Number,
    required: 'amount is required'
  },
  remark: {
    type: String,
    default: null
  },
  attachment: {
    type: String,
    default: null
  },
  userId: {
    type: String,
    required: 'userId is required'
  },
  transactionType: {
    type: Number,
    required: 'transactionType is required'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Helper.getNowDate()
  },
  updatedDate: {
    type: Date,
    default: null
  },
  deletedDate: {
    type: Date,
    default: null
  }
})

model.plugin(AutoIncrement, { inc_field: 'transactionCode' })
module.exports = mongoose.model('ModelTransaction', model)
