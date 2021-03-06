'use strict'
const mongoose = require('mongoose')
const ModelUser = mongoose.model('ModelUser')
const Helper = require('../libs/helper')
const { DATA_NOT_FOUND, INPUT_FAILED } = require('../constants')

exports.userGet = function (req, res) {
    ModelUser.find({ }, function (error, data) {
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
    .sort({ fullName: 1 })
}

exports.userAdd = function (req, res) {
    const newSave = new ModelUser(req.body)
    newSave.save(function (error, data) {
        if (error) {
            res.status(400).json({
                message: Helper.getMessageError(error)
            })
        } else if (data) {
            res.status(200).json({
                message: 'User berhasil ditambah'
            })
        } else {
            res.status(400).json({
                message: INPUT_FAILED
            })
        }
    })
}

exports.userEdit = function (req, res) {
    const dataUpdate = {
        ...req.body,
        updatedDate: Helper.getNowDate()
    }
    ModelUser.findOneAndUpdate({_id: req.body.userId}, dataUpdate, { new: true }, function (error, data) {
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

exports.userDelete = function (req, res) {
    ModelUser.findByIdAndRemove({ _id: req.body.userId }, function (error, data) {
        if (error) {
            res.status(400).json({
                message: Helper.getMessageError(error)
            })
        } else if (data) {
            res.status(200).json({
                message: 'User berhasil dihapus'
            })
        } else {
            res.status(400).json({
                message: DATA_NOT_FOUND
            })
        }
    })
}