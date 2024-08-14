const searchSpotify = async (query, searchForAlbum = false) => {
    const accessToken = 'BQBPXxVn9139e9RgAIxr5Vp2GKoFJiLoLB2qVcQOEDbJXQJDXllHZQ5EqpHIEdWkyFQ1VFalLmd26GinduKDw5Urxj-4qU9rtWKXIRMMANqrGrVXBcg'; // replace with your actual token
    const encodedQuery = encodeURIComponent(query);
    const searchType = searchForAlbum ? 'album' : 'track';
    const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${searchType}`;  
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
        const items = data[`${searchType}s`].items;

        items.forEach(item => {
            if (searchForAlbum) {
                console.log(`Album: ${item.name}`);
                console.log(`Artist: ${item.artists.map(artist => artist.name).join(', ')}`);
            } else {
                console.log(`Track: ${item.name}`);
                console.log(`Artist: ${item.artists.map(artist => artist.name).join(', ')}`);
                console.log(`Album: ${item.album.name}`);
            }
            console.log(`Spotify URL: ${item.external_urls.spotify}`);
            console.log('-------------------------');
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Example usage
searchSpotify('Into the Endless Night ???? Live', false); // Search for a track
// searchSpotify('remaster artist:Miles Davis', true); // Search for an album
