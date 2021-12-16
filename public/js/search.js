const newFormHandler = async (event) => {
    event.preventDefault();
  
    const urlArray = window.location.pathname.split('/');
    const location_id = urlArray[urlArray.length - 1];
  
    const location_name = document.querySelector('#search-title').value.trim();
    const description = document.querySelector('#search-content').value.trim();
  
    if (!location_name || !description) {
      alert("Please ensure all fields are filled out.")
    }

    if (location_name && description) {
      const response = await fetch(`/api/locations`, {
        method: 'POST',
        body: JSON.stringify({ 
          location_name, 
          description
         }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/locations');
        
      } else {
        alert('Failed to add location');
      }
    }
  
  
  };
  
  document
    .querySelector('#submitLocation')
    .addEventListener('click', newFormHandler);