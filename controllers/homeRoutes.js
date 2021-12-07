const router = require('express').Router();
const { Location, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all locations
    const locationData = await Location.findAll();
    console.log('locationData: ', locationData)

    // Serialize data so the template can read it
    const locations = projectData.map((project) => project.get({ plain: true }));
    console.log('location: ',locations)

    //extract unique city names
    const cities = locations.map((city)=> city.city_name)
    console.log('cities: ',cities)

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      cities, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
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
