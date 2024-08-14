const searchTrack = async (trackName) => {
    const accessToken = 'BQBPXxVn9139e9RgAIxr5Vp2GKoFJiLoLB2qVcQOEDbJXQJDXllHZQ5EqpHIEdWkyFQ1VFalLmd26GinduKDw5Urxj-4qU9rtWKXIRMMANqrGrVXBcg'; // replace with your actual token
    const query = encodeURIComponent(trackName);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tracks = data.tracks.items;

        // Loop through and log each track's details
        tracks.forEach(track => {
            console.log(`Track: ${track.name}`);
            console.log(`Artist: ${track.artists.map(artist => artist.name).join(', ')}`);
            console.log(`Album: ${track.album.name}`);
            console.log(`Preview URL: ${track.preview_url}`);
            console.log(`Spotify URL: ${track.external_urls.spotify}`);
            console.log('-------------------------');
        });
    } catch (error) {
        console.error('Error fetching track:', error);
    }
};

// Example usage
searchTrack('breaking bad');
