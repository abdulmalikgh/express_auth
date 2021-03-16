const express = require('express')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const { home, smoothies } = require('../controllers/PageControllers')

router.get('/', home)

router.get('/smoothies',requireAuth, smoothies)
module.exports = router
