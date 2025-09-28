const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDashboard ,adminStats} = require('../controllers/dashboardController');

router.use(auth);
router.get('/', getDashboard);
router.get('/adminstats', adminStats);

module.exports = router;
