let express = require('express')
let router = express.Router()

let quota_controller = require('../controllers/QuotaController')

router.get('/nodes', quota_controller.action_nodes)
router.get('/search-nodes', quota_controller.action_search_nodes)

module.exports = router;