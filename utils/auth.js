const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    // store the url that the user was trying to access before auth request
    req.session.returnTo = req.originalUrl; 
    // redirect to the login page
    res.redirect('/login');

  } else {
    next();
  }
};

module.exports = withAuth;
