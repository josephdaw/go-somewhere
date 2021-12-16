const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// wildcard for 404 
router.get('*', (_req, res) => {
    res.status(404).render('404');
  });

module.exports = router;
