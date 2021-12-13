const newFormHandler = async (event) => {
  event.preventDefault();

  const location_name = document.querySelector('#location-name').value.trim();
  const description = document.querySelector('#location-description').value.trim();

  if (location_name && description) {
    const response = await fetch(`/api/locations`, {
      method: 'POST',
      body: JSON.stringify({ location_name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create new location');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-location-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
