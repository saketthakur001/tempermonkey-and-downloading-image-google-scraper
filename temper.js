const searchSpotify = async (query, searchForAlbum = false) => {
    const accessToken = 'BQAiFWI3kyDEPBvthBHaCYERtFhka46z7WHJ07OLTZFSBFLwNo7PrC0grBGPRC8UIz36cRyPLh6hTd6AlVh4VuTEwI7nlhzoqoJKVMFiAeC6jyvZ350'; // replace with your actual token
    const encodedQuery = encodeURIComponent(query);
    const searchType = searchForAlbum ? 'album' : 'track';
    const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${searchType}`;

    console.log(`Searching Spotify with URL: ${url}`); // Debug print

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
        console.log('Response Data:', data); // Debug print

        const items = data[`${searchType}s`]?.items || [];

        if (items.length === 0) {
            console.log('No items found.');
        }

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
searchSpotify('Roundabout Yes', false); // Search for a track'

// searchSpotify('remaster artist:Miles Davis', true); // Search for an album
