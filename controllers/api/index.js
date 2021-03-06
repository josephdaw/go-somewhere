const router = require('express').Router();
const userRoutes = require('./userRoutes');
const locationRoutes = require('./locationRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/locations', locationRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
