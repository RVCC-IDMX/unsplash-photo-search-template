const form = document.querySelector('.search-form');
const template = document.querySelector('#template');
const container = document.querySelector('.container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  console.log(response.results);
  //const dataObj = response.results[0];

  while (container.firstChild) {
    //The list is LIVE so it will re-index each call
    container.removeChild(container.firstChild);
  }

  response.results.forEach((dataObj) => {
    const clone = template.firstElementChild.cloneNode(true);
    console.log(clone);
    const postImg = clone.querySelector('.post__img');
    postImg.src = dataObj.urls.small;
    const postUser = clone.querySelector('.post__user');
    postUser.textContent = `by ${dataObj.user.name}`;
    const postDescription = clone.querySelector('.post__desc');
    if (dataObj.description) {
      postDescription.textContent = dataObj.description;
      if (dataObj.description.length > 100) {
        postDescription.textContent = dataObj.description.substring(0, 100) + '...';
      }
    }
    container.appendChild(clone);
    /*

      Add an attribution statement below using the
      postUser element and the photographer's name from dataObj
     */
  });
});