'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Helper = require('../libs/helper')

const model = new Schema({
  fullName: {
    type: String,
    required: 'full_name is required'
  },
  address: {
    type: String,
    default: null
  },
  phoneNumber: {
    type: String,
    required: 'phone_number is required',
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  role: {
    type: Number,
    default: 0
  },
  attachment: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('ModelUser', model)
