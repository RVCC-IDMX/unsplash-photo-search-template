const { default: axios } = require('axios');
const fetch = require('axios');

exports.handler = async (event) => {
  const { query } = JSON.parse(event.body);

  const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log('error', error));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};
