const router = require('express').Router();
const { Location, User, Review } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    // Get 3 most reviewed locations for homepage
    const locationData = await Location.findAll({
      limit: 3,
      attributes: {
        include: [
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM review
                    WHERE
                    review.location_id = location.id
                )`),
            'review_count'
          ]
        ]
      },
      order: [
        [sequelize.literal('review_count'), 'DESC']
      ]
    });

    // Serialize data so the template can read it
    const locations = locationData.map((location) => location.get({ plain: true }));

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

// routing for about page
router.get('/about', (req, res) => {
  try {
    res.render('about', {
      logged_in: req.session.logged_in
    });


  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

});


//search
router.get('/search', (req, res) => {
  try {
    res.render('search', {
      logged_in: req.session.logged_in
    });


  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

});


// get all locations
router.get('/locations', async (req, res) => {
  try {
    const locationData = await Location.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM review
                    WHERE
                    review.location_id = location.id
                )`),
            'review_count'
          ]
        ]
      },
      order: [
        [sequelize.literal('review_count'), 'DESC']
      ]
    });

    // Serialize data so the template can read it
    const locations = locationData.map((location) => location.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('locations', {
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




// router.get('/search', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Review }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('search', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;



