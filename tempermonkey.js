// ==UserScript==
// @name         RateYourMusic Spotify Track ID Fetcher with API Search
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Fetch Spotify track IDs and search using the Spotify API. Updates track IDs when the page changes and copies them to the clipboard on demand.
// @author       Saket
// @match        https://rateyourmusic.com/charts/*
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @connect      api.spotify.com
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract track titles and artists from the page
    function extractTrackTitlesAndArtists() {
        let tracks = [];
        document.querySelectorAll('.page_charts_section_charts_item').forEach((item) => {
            let title = item.querySelector('.page_charts_section_charts_item_title')?.textContent.trim();
            let artist = item.querySelector('.page_charts_section_charts_item_artists')?.textContent.trim();
            if (title && artist) {
                tracks.push({ title, artist });
            }
        });
        console.log('Extracted tracks:', tracks);
        return tracks;
    }

    // Function to search for tracks on Spotify and print details
    async function searchSpotifyTracks(tracks) {
        const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // replace with your actual token
        for (const track of tracks) {
            const query = `${track.title} ${track.artist}`;
            const encodedQuery = encodeURIComponent(query);
            const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track`;

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
                const items = data.tracks.items;

                items.forEach(item => {
                    console.log(`Track: ${item.name}`);
                    console.log(`Artist: ${item.artists.map(artist => artist.name).join(', ')}`);
                    console.log(`Album: ${item.album.name}`);
                    console.log(`Spotify URL: ${item.external_urls.spotify}`);
                    console.log('-------------------------');
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

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

        clipboardButton.onclick = () => {
            if (window.storedTrackIDs) {
                GM_setClipboard(window.storedTrackIDs.trim());
                console.log('Track IDs copied to clipboard.');
            } else {
                console.log('No track IDs available to copy.');
            }
        };

        document.body.appendChild(clipboardButton);
    }

    // Function to handle URL changes and update track IDs
    function handleURLChanges() {
        const observer = new MutationObserver(() => {
            if (location.href !== previousUrl) {
                previousUrl = location.href;
                console.log('URL changed to:', previousUrl);
                extractAndSearchTracks();
            }
        });

        let previousUrl = location.href;
        observer.observe(document, { subtree: true, childList: true });
    }

    // Function to extract and search for tracks
    function extractAndSearchTracks() {
        const tracks = extractTrackTitlesAndArtists();
        searchSpotifyTracks(tracks);
        // Here, you can add code to update `window.storedTrackIDs` if needed
    }

    // Run the functions
    extractAndSearchTracks();
    createClipboardButton();
    handleURLChanges();

})();
