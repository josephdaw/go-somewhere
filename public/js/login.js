const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const res = await response.json()
       // If successful, redirect the browser to the page the user initially tried to access
       document.location.replace(res.redirect);
       
    } else {
      console.log('err', response)
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  console.log(window.location.pathname.split('/') );

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ 
        name,
        email,
        password 
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok || window.location.pathname.split('/') == 'login') {
        document.location.replace('/locations');
      } else if (response.ok ) {
      document.location.replace(res.redirect);
    } else {
      console.log('err', response)
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);