// ==UserScript==
// @name         RateYourMusic Spotify Track ID Fetcher with API Search
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Fetch Spotify track IDs using API and add a button to copy them to the clipboard on demand.
// @author       Saket
// @match        https://rateyourmusic.com/charts/*
// @grant        GM_setClipboard
// ==/UserScript==

(async function() {
    'use strict';

    const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // replace with your actual token

    // Function to search Spotify for a track or album
    const searchSpotify = async (query, searchForAlbum = false) => {
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
            const spotifyURLs = [];

            items.forEach(item => {
                spotifyURLs.push(item.external_urls.spotify);
            });

            return spotifyURLs;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    // Function to extract track titles and artists
    const extractTrackTitlesAndArtists = () => {
        const tracks = [];

        document.querySelectorAll('.page_charts_section_charts_item').forEach((item) => {
            const trackTitleElement = item.querySelector('.page_charts_section_charts_item_title');
            const artistElement = item.querySelector('.page_charts_section_charts_item_credited_links a');

            if (trackTitleElement && artistElement) {
                const trackTitle = trackTitleElement.textContent.trim();
                const artist = artistElement.textContent.trim();
                tracks.push(`${trackTitle} ${artist}`);
            }
        });

        return tracks;
    };

    // Function to create a button for copying track IDs
    function createClipboardButton() {
        let clipboardButton = document.createElement('div');
        clipboardButton.innerHTML = '📋 Copy Track IDs';
        clipboardButton.style.position = 'fixed';
        clipboardButton.style.bottom = '10px';
        clipboardButton.style.right = '10px';
        clipboardButton.style.fontSize = '24px';
        clipboardButton.style.cursor = 'pointer';
        clipboardButton.style.backgroundColor = '#ffffff';
        clipboardButton.style.border = '1px solid #000000';
        clipboardButton.style.padding = '10px';
        clipboardButton.style.borderRadius = '5px';

        clipboardButton.onclick = async () => {
            const tracks = extractTrackTitlesAndArtists();
            let spotifyURLs = '';

            for (let track of tracks) {
                const urls = await searchSpotify(track);
                if (urls.length > 0) {
                    spotifyURLs += `${urls[0]}\n`;
                }
            }

            if (spotifyURLs) {
                GM_setClipboard(spotifyURLs.trim());
                // Alert removed to avoid pop-ups
            }
        };

        document.body.appendChild(clipboardButton);
    }

    // Create the button on page load
    createClipboardButton();

})();
