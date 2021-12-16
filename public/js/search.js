const newFormHandler = async (event) => {
    event.preventDefault();
  
    const urlArray = window.location.pathname.split('/');
    const location_id = urlArray[urlArray.length - 1];
  
    const title = document.querySelector('#search-title').value.trim();
    const content = document.querySelector('#search-content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/search`, {
        method: 'POST',
        body: JSON.stringify({ 
          title, 
          content,
          location_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
        
      } else {
        alert('Failed to add location');
      }
    }
  
  
  };
  
  document
    .querySelector('#submitLocation')
    .addEventListener('click', newFormHandler);