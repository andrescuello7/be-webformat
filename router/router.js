const { orchestrator } = require('../services/orchestrator')
const router =  require('express').Router();

router.post('/', orchestrator);

module.exports = router;
