const router = require('express').Router();
const { Location, User, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all locations
    const locationData = await Location.findAll();
    // Serialize data so the template can read it
    const locations = locationData.map((location) => location.get({ plain: true }));

    // // count number of reviews locations
    // const locationData = await Location.findAll();
    // // Serialize data so the template can read it
    // const locations = locationData.map((location) => location.get({ plain: true }));



    // Pass serialized data and session flag into template
    res.render('homepage', { 
      locations, 
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get locations based on the user selection
router.get('/locations/:id', withAuth, async (req, res) => {
  try {
    // Get location by name
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Review }],
    });

    const location = locationData.get({ plain: true })
    console.log(location)

    res.render('location', { 
      ...location, 
      logged_in: req.session.logged_in,
    });

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return res.redirect('/profile');
  }

  res.render('login');
});

module.exports = router;
