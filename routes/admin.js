

const adminRoutes = require('express').Router()
const models = require('../models')


adminRoutes.get('/', function (req, res) {
    models.Item.findAll({
        order: [[
            "id", "asc"
        ]]
    })
        .then(function (allItems) {
            res.render('admin/item', { allItems, err: true })
        })
})

adminRoutes.post('/', function (req, res) {
    models.Item.create(req.body)
        .then(function () {
            res.redirect('/admin')
        })

})

adminRoutes.get("/edit/:id/item", function (req, res) {
    models.Item.findById(req.params.id)
        .then(function (item) {
            res.render('admin/edit', { itemKey: item })

        })
})

adminRoutes.post("/edit/:id/item", function (req, res) {
    models.Item.update({
        itemName: req.body.itemName,
        preorderAvailablility: req.body.preorderAvailablility,
        itemCategory: req.body.itemCategory,
        price: req.body.price,
        downPayment: req.body.downPayment

    }, { where: { id: req.params.id } })

        .then(function () {
            // res.send('succes')
            res.redirect('/admin')
        })

})

adminRoutes.get("/delete/:id/item", function (req, res) {
    let id = req.params.id
    models.Item.destroy({ where: { id: id } })
        .then(function (outlet) {
            res.redirect('/admin')
        })
})

module.exports = adminRoutes