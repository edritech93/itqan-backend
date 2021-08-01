'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Helper = require('../libs/helper')

const model = new Schema({
  totalAmount: {
    type: Number,
    required: 'totalAmount is required'
  },
  userId: {
    type: String,
    required: 'userId is required'
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

module.exports = mongoose.model('ModelTransactionTotal', model)
