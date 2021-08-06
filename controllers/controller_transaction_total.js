'use strict'
const mongoose = require('mongoose')
const ModelTransactionTotal = mongoose.model('ModelTransactionTotal')
const Helper = require('../libs/helper')
const { DATA_NOT_FOUND, INPUT_FAILED } = require('../constants')

exports.transactionTotalGetByUserId = function (req, res) {
    const userId = req.query && req.query.userId ? req.query.userId : null
    ModelTransactionTotal.findOne({ userId: userId }, function (error, data) {
        if (error) {
            res.status(400).json({
                message: error.message
            })
        } else if (data) {
            res.status(200).json(data)
        } else {
            res.status(200).json({ totalAmount: 0 })
        }
    })
}

exports.transactionTotalGet = function (req, res) {
    ModelTransactionTotal.find({}, function (error, data) {
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

exports.transactionTotalAddEdit = function (req, res) {
    const { userId } = req.body;
    ModelTransactionTotal.findOne({ userId: userId }, function (error, data) {
        if (error) {
            res.status(400).json({
                message: error.message
            })
        } else if (data) {
            const dataUpdate = {
                ...req.body,
                updatedDate: Helper.getNowDate()
            }
            ModelTransactionTotal.findOneAndUpdate({userId: userId}, dataUpdate, { new: true }, function (error, data) {
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
        } else {
            const newSave = new ModelTransactionTotal(req.body)
            newSave.save(function (error, data) {
                if (error) {
                    res.status(400).json({
                        message: error.message
                    })
                } else if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(400).json({
                        message: INPUT_FAILED
                    })
                }
            })
        }
    })
}
