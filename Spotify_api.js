const axios = require('axios');

// Spotify API credentials
const client_id = 'your_client_id'; // Replace with your Spotify client ID
const client_secret = 'your_client_secret'; // Replace with your Spotify client secret

// Get access token
async function getAccessToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
}

// Fetch podcast episodes
async function fetchPodcasts() {
  const token = await getAccessToken();
  const podcastID = '4rOoJ6Egrf8K2IrywzwOMk'; // Example podcast ID (replace with a real one)

  const response = await axios.get(`https://api.spotify.com/v1/shows/${podcastID}/episodes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(response.data);
}

fetchPodcasts().catch((err) => console.error(err));
