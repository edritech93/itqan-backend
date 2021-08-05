'use strict'
const mongoose = require('mongoose')
const ModelTransaction = mongoose.model('ModelTransaction')
const Helper = require('../libs/helper')
const { DATA_NOT_FOUND, INPUT_FAILED } = require('../constants')

exports.transactionGet = function (req, res) {
    const userId = req.query && req.query.userId ? req.query.userId : null
    const transactionType = req.query && req.query.transactionType ? req.query.transactionType : null
    ModelTransaction.find({ userId: userId, transactionType: transactionType }, function (error, data) {
        if (error) {
            res.status(400).json({
                message: error.message
            })
        } else if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).json({
                message: DATA_NOT_FOUND
            })
        }
    })
}

exports.transactionAdd = function (req, res) {
    const newSave = new ModelTransaction(req.body)
    newSave.save(function (error, data) {
        if (error) {
            res.status(400).json({
                message: error.message
            })
        } else if (data) {
            res.status(200).json({
                message: 'Transaction berhasil ditambah'
            })
        } else {
            res.status(400).json({
                message: INPUT_FAILED
            })
        }
    })
}

exports.transactionEdit = function (req, res) {
    const dataUpdate = {
        ...req.body,
        updatedDate: Helper.getNowDate()
    }
    ModelTransaction.findOneAndUpdate({
        _id: req.body.userId,
        is_active: true
    }, dataUpdate, { new: true }, function (error, data) {
        if (error) {
            res.status(400).json({
                message: error.message
            })
        } else if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).json({
                message: DATA_NOT_FOUND
            })
        }
    })
}

exports.transactionDelete = function (req, res) {
    ModelTransaction.findByIdAndRemove({ _id: req.body.userId }, function (error, data) {
        if (error) {
            res.status(400).json({
                message: Helper.getMessageError(error)
            })
        } else if (data) {
            res.status(200).json({
                message: 'Transaction berhasil dihapus'
            })
        } else {
            res.status(400).json({
                message: DATA_NOT_FOUND
            })
        }
    })
}