// ==UserScript==
// @name         RateYourMusic Spotify Track ID Fetcher
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Fetch Spotify track IDs and add a button to copy them to the clipboard on demand.
// @author       Saket
// @match        https://rateyourmusic.com/charts/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract track IDs and store them
    async function extractTrackIDs() {
        let trackIDs = '';

        document.querySelectorAll('.page_charts_section_charts_item').forEach(async (item) => {
            const trackNameElement = item.querySelector('.page_charts_section_charts_item_title a');
            const artistElement = item.querySelector('.page_charts_section_charts_item_credited_text a.artist');

            if (trackNameElement && artistElement) {
                const trackName = trackNameElement.textContent.trim();
                const artistName = artistElement.textContent.trim();

                console.log(`Processing item: ${trackName} by ${artistName}`);

                const searchQuery = `${trackName} ${artistName}`;
                console.log(`Search Query: ${searchQuery}`);

                const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`;

                try {
                    const response = await fetch(searchUrl, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer YOUR_ACCESS_TOKEN` // Replace with your actual token
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    const tracks = data.tracks.items;

                    if (tracks.length > 0) {
                        tracks.forEach(track => {
                            console.log(`Track Name: ${track.name}`);
                            console.log(`Artist Names: ${track.artists.map(artist => artist.name).join(', ')}`);
                            console.log(`Spotify URL: ${track.external_urls.spotify}`);
                            console.log('-------------------------');

                            trackIDs += `Track: ${track.name}\nArtist: ${track.artists.map(artist => artist.name).join(', ')}\nSpotify URL: ${track.external_urls.spotify}\n\n`;
                        });
                    } else {
                        console.log('No tracks found for query:', searchQuery);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        });

        // Store the track IDs in the global scope
        window.storedTrackIDs = trackIDs;
    }

    // Function to create a button for copying track IDs
    function createClipboardButton() {
        let clipboardButton = document.createElement('div');
        clipboardButton.innerHTML = 'Copy Track Data';
        clipboardButton.style.position = 'fixed';
        clipboardButton.style.bottom = '10px';
        clipboardButton.style.right = '10px';
        clipboardButton.style.fontSize = '14px';
        clipboardButton.style.cursor = 'pointer';
        clipboardButton.style.backgroundColor = '#ffffff';
        clipboardButton.style.border = '1px solid #000000';
        clipboardButton.style.padding = '5px';
        clipboardButton.style.borderRadius = '5px';

        clipboardButton.onclick = () => {
            if (window.storedTrackIDs) {
                GM_setClipboard(window.storedTrackIDs.trim());
                console.log('Track data copied to clipboard.');
            }
        };

        document.body.appendChild(clipboardButton);
    }

    // Run the functions
    extractTrackIDs();
    createClipboardButton();

    // Monitor for URL changes and re-extract IDs if necessary
    const observer = new MutationObserver(() => {
        if (location.href !== previousUrl) {
            previousUrl = location.href;
            extractTrackIDs();
        }
    });

    let previousUrl = location.href;
    observer.observe(document, { subtree: true, childList: true });
})();
