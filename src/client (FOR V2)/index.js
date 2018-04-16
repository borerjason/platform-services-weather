const input = document.querySelector(".form-control");
const btn = document.querySelector('.btn');
const URL = 'http://localhost:3000/submit'

const submitCity = (e) => {
  e.preventDefault();
  const city = input.value;
 
  return fetch(URL, {
    body: JSON.stringify({ city }),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
} 

btn.addEventListener('click', submitCity);
