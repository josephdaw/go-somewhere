const newFormHandler = async (event) => {
  event.preventDefault();

  const urlArray = window.location.pathname.split('/');
  const location_id = urlArray[urlArray.length - 1];

  const title = document.querySelector('#review-title').value.trim();
  const content = document.querySelector('#review-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/reviews`, {
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
      alert('Failed to create review');
    }
  }


};

document
  .querySelector('#submitReview')
  .addEventListener('click', newFormHandler);