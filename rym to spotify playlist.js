// ==UserScript==
// @name         RateYourMusic Spotify Track ID Fetcher
// @namespace    http://tampermonkey.net/
// @version      1.10
// @description  Fetch Spotify track IDs, display details on the page, and add a button to copy them to the clipboard.
// @author       Saket
// @match        https://rateyourmusic.com/charts/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract track IDs and store them
    function extractTrackIDs() {
        let trackIDs = '';
        let trackDetails = '';

        document.querySelectorAll('.page_charts_section_charts_item').forEach((item) => {
            let spotifyData = item.querySelector('.page_charts_section_charts_item_media_links div[data-links]');
            let trackName = item.querySelector('.page_charts_section_charts_item_title')?.innerText.trim() || 'Unknown Track';
            let artistNames = item.querySelector('.page_charts_section_charts_item_artist')?.innerText.trim() || 'Unknown Artist';

            if (spotifyData) {
                let dataLinks = JSON.parse(spotifyData.getAttribute('data-links'));

                if (dataLinks && dataLinks.spotify) {
                    let spotifyTrackID = Object.keys(dataLinks.spotify)[0];
                    trackIDs += `https://open.spotify.com/track/${spotifyTrackID}\n`;

                    // Prepare track details for display
                    trackDetails += `<div style="padding: 5px; border-bottom: 1px solid #ddd;">
                        <strong>Track:</strong> ${trackName}<br>
                        <strong>Artist:</strong> ${artistNames}<br>
                        <strong>Spotify URL:</strong> <a href="https://open.spotify.com/track/${spotifyTrackID}" target="_blank">Open Track</a>
                    </div>`;
                }
            }
        });

        // Store the track IDs in the global scope
        window.storedTrackIDs = trackIDs;

        // Update track details display
        updateTrackDetailsDisplay(trackDetails);
    }

    // Function to create a button for copying track IDs
    function createClipboardButton() {
        let clipboardButton = document.createElement('div');
        clipboardButton.innerHTML = 'Copy Track IDs';
        clipboardButton.style.position = 'fixed';
        clipboardButton.style.bottom = '10px';
        clipboardButton.style.right = '10px';
        clipboardButton.style.fontSize = '14px';
        clipboardButton.style.cursor = 'pointer';
        clipboardButton.style.backgroundColor = '#007bff';
        clipboardButton.style.color = '#ffffff';
        clipboardButton.style.border = '1px solid #0056b3';
        clipboardButton.style.padding = '8px 12px';
        clipboardButton.style.borderRadius = '5px';
        clipboardButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        clipboardButton.style.textAlign = 'center';

        clipboardButton.onclick = () => {
            if (window.storedTrackIDs) {
                GM_setClipboard(window.storedTrackIDs.trim());
                console.log('Track IDs copied to clipboard.');
            }
        };

        document.body.appendChild(clipboardButton);
    }

    // Function to update the display of track details on the page
    function updateTrackDetailsDisplay(details) {
        let detailsContainer = document.getElementById('track-details-container');
        if (!detailsContainer) {
            detailsContainer = document.createElement('div');
            detailsContainer.id = 'track-details-container';
            detailsContainer.style.position = 'fixed';
            detailsContainer.style.top = '10px';
            detailsContainer.style.right = '10px';
            detailsContainer.style.width = '300px';
            detailsContainer.style.maxHeight = '500px';
            detailsContainer.style.overflowY = 'auto';
            detailsContainer.style.backgroundColor = '#f9f9f9';
            detailsContainer.style.border = '1px solid #ddd';
            detailsContainer.style.borderRadius = '5px';
            detailsContainer.style.padding = '10px';
            detailsContainer.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            document.body.appendChild(detailsContainer);
        }
        detailsContainer.innerHTML = details;
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
