const express = require('express')

const {requireAuth, validateUser} = require('../middleware/requireAuth')

const router = express.Router()

const { home, smoothies } = require('../controllers/PageControllers')

router.get('*', validateUser)

router.get('/', home)

router.get('/smoothies',requireAuth, smoothies)

module.exports = router
