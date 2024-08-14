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
const clientId = 'REDACTED_CLIENT_ID';
const clientSecret = 'REDACTED_CLIENT_SECRET';

getAccessToken(clientId, clientSecret).then(token => {
    console.log('Access Token:', token);
});
