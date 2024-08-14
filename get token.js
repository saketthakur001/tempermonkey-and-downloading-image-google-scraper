const getAccessToken = async (clientId, clientSecret) => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const credentials = btoa(`${clientId}:${clientSecret}`);
    
    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`
            },
            body: 'grant_type=client_credentials'
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
};

// Usage
const clientId = '4e1c1626b9e04c0fba6d8f14d31ab3e6';
const clientSecret = '35f4ab42756a4b5688c73d26a0fd49e7';

getAccessToken(clientId, clientSecret).then(token => {
    console.log('Access Token:', token);
});
