const homeRoutes = require('express').Router()
const models = require('../models')


homeRoutes.get('/', function (req, res) {
    res.render('./home')
})

homeRoutes.get('/item', function (req, res) {

    models.Item.findAll({
        order: [[
            "id", "asc"
        ]]
    })
        .then(function (allItems) {
            res.render('./client/item', { allItems, err: true })
        })

})





module.exports = homeRoutes