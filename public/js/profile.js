
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
      
    } else {
      alert('Failed to delete review');
    }
  }
};

document.querySelector('.reviewButton').addEventListener('click', delButtonHandler);
