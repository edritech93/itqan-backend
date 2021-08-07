'use strict'
const mongoose = require('mongoose')
const ModelTransaction = mongoose.model('ModelTransaction')
const ModelTransactionTotal = mongoose.model('ModelTransactionTotal')
const Helper = require('../libs/helper')
const { DATA_NOT_FOUND, INPUT_FAILED, TYPE_TRANSACTION, ALL_DATA } = require('../constants')

exports.transactionGet = function (req, res) {
    const userId = req.query && req.query.userId ? req.query.userId : null
    const transactionType = req.query && req.query.transactionType ? req.query.transactionType : null
    let objFind = { userId: userId }
    if (transactionType != ALL_DATA.id)    {
        objFind = {...objFind, transactionType: transactionType}
    }
    ModelTransaction.find(objFind, function (error, data) {
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
    const { userId } = req.body;
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
            reloadDataSaldo(userId);
        } else {
            res.status(400).json({
                message: INPUT_FAILED
            })
        }
    })
}

async function reloadDataSaldo(userId) {
    const totalIncome = await getTotalIncomeSpending(userId, TYPE_TRANSACTION[0].id).catch(() => 0);
    const totalSpending = await getTotalIncomeSpending(userId, TYPE_TRANSACTION[1].id).catch(() => 0);
    const totalSaldo = totalIncome - totalSpending

    ModelTransactionTotal.findOne({ userId: userId }, function (error, data) {
        if (error) {
            console.log('reloadDataSaldo => ', error.message);
        } else if (data) {
            const dataUpdate = {
                totalAmount: totalSaldo,
                updatedDate: Helper.getNowDate()
            }
            ModelTransactionTotal.findOneAndUpdate({ userId: userId }, dataUpdate, { new: true }, function (error, data) {
                handleSaveUpdateSaldo(error, data)
            })
        } else {
            const objSave = { userId: userId, totalAmount: totalSaldo }
            const newSave = new ModelTransactionTotal(objSave)
            newSave.save(function (error, data) {
                handleSaveUpdateSaldo(error, data)
            })
        }
    })
}

function handleSaveUpdateSaldo(error, data)    {
    if (error) {
        console.log('reloadDataSaldo => ', error.message);
    } else if (data) {
        console.log('reloadDataSaldo => SUCCESS');
    } else {
        console.log('reloadDataSaldo => ', DATA_NOT_FOUND);
    }
}

function getTotalIncomeSpending(userId, transactionType) {
    return new Promise(function (resolve, reject) {
        ModelTransaction.aggregate([
            {
              $match: {
                userId: userId,
                transactionType: transactionType,
              }
            },
            {
              $group:
              {
                _id: userId,
                total: { $sum: '$amount' }
              }
            }], function (error, data) {
              if (error) {
                reject(error)
              } else {
                resolve(data.length > 0 ? data[0].total : 0);
              }
            });
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