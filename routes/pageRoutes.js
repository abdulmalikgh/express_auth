const express = require('express')

const router = express.Router()

const { home, smoothies } = require('../controllers/PageControllers')

router.get('/', home)

router.get('/smoothies', smoothies)
module.exports = router
