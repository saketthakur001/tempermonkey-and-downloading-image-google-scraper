// // ==UserScript==

// // @name         RateYourMusic Spotify Track ID Fetcher

// // @namespace    http://tampermonkey.net/

// // @version      1.16

// // @description  Fetch Spotify track IDs and add a button to copy them to the clipboard on demand.

// // @author       Saket

// // @match        https://rateyourmusic.com/charts/*

// // @grant        GM_setClipboard

// // ==/UserScript==



// (function() {

//     'use strict';



//     // Function to extract track IDs and details

//     function extractTrackIDs() {

//         let trackData = '';

//         console.log('Starting extraction of track IDs and details...');



//         document.querySelectorAll('.page_charts_section_charts_item').forEach((item, index) => {

//             console.log(`Processing item ${index + 1}...`);



//             let spotifyData = item.querySelector('.page_charts_section_charts_item_media_links div[data-links]');

//             let trackName = item.querySelector('.page_charts_section_charts_item_title a')?.innerText.trim() || 'Unknown Track';

//             let artistElements = item.querySelectorAll('.page_charts_section_charts_item_credited_links_primary .artist');

//             let artistNames = Array.from(artistElements).map(el => el.innerText.trim()).join(', ') || 'Unknown Artist';



//             console.log('Track Name:', trackName);
//             console.log(spotifyData, '.dick 📋📋📋📋📋📋📋📋📋📋📋📋📋📋')
//             console.log(artistElements)
//             console.log('Artist Names:', artistNames);



//             if (!spotifyData) {

//                 console.log('No Spotify data found for this item.');

//                 return;

//             }



//             let dataLinks;

//             try {

//                 dataLinks = JSON.parse(spotifyData.getAttribute('data-links'));

//                 console.log('Parsed data-links:', dataLinks);

//             } catch (error) {

//                 console.log('Error parsing data-links:', error);

//                 return;

//             }



//             // Logging the search query

//             console.log('Search Query:', `track:${trackName} artist:${artistNames}`);



//             if (dataLinks && dataLinks.spotify && Object.keys(dataLinks.spotify).length > 0) {

//                 let spotifyTrackID = Object.keys(dataLinks.spotify)[0];

//                 let spotifyURL = `https://open.spotify.com/track/${spotifyTrackID}`;

//                 trackData += `${trackName} by ${artistNames}: ${spotifyURL}\n`;



//                 // Print track details to the console

//                 console.log(`Track: ${trackName}`);

//                 console.log(`Artist: ${artistNames}`);

//                 console.log(`Spotify URL: ${spotifyURL}`);

//                 console.log('-------------------------');

//             } else {

//                 console.log('No valid Spotify link found in data-links or data-links is empty.');

//             }

//         });



//         return trackData;

//     }



//     // Function to create a button for copying track data

//     function createClipboardButton() {

//         let existingButton = document.getElementById('copyTrackDataButton');

//         if (existingButton) {

//             console.log('Removing existing button...');

//             existingButton.remove(); // Remove any existing button to avoid duplicates

//         }



//         let clipboardButton = document.createElement('div');

//         clipboardButton.id = 'copyTrackDataButton';

//         clipboardButton.innerHTML = 'Copy Track Data';

//         clipboardButton.style.position = 'fixed';

//         clipboardButton.style.bottom = '10px';

//         clipboardButton.style.right = '10px';

//         clipboardButton.style.fontSize = '14px';

//         clipboardButton.style.cursor = 'pointer';

//         clipboardButton.style.backgroundColor = '#007bff';

//         clipboardButton.style.color = '#ffffff';

//         clipboardButton.style.border = '1px solid #0056b3';

//         clipboardButton.style.padding = '8px 12px';

//         clipboardButton.style.borderRadius = '5px';

//         clipboardButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

//         clipboardButton.style.textAlign = 'center';



//         clipboardButton.onclick = () => {

//             console.log('Button clicked. Extracting track data...');

//             let trackData = extractTrackIDs();

//             if (trackData) {

//                 console.log('Copying track data to clipboard...');

//                 GM_setClipboard(trackData.trim());

//                 console.log('Track data copied to clipboard.');

//             } else {

//                 console.log('No track data available to copy.');

//             }

//         };



//         document.body.appendChild(clipboardButton);

//         console.log('Clipboard button created.');

//     }



//     // Run the function to create the clipboard button

//     createClipboardButton();



//     // Monitor for URL changes and re-create button if necessary

//     const observer = new MutationObserver(() => {

//         if (location.href !== previousUrl) {

//             previousUrl = location.href;

//             console.log('URL changed. Re-creating clipboard button...');

//             createClipboardButton();

//         }

//     });



//     let previousUrl = location.href;

//     observer.observe(document, { subtree: true, childList: true });

//     console.log('Mutation observer initialized.');

// })();





async function searchSpotify(query) {
    const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(query)}`;

    // Fetch the HTML of the search results page
    const response = await fetch(searchUrl, {
        headers: {
            'Accept': 'text/html',
            'Content-Type': 'text/html'
        }
    });

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract the first song result
    const firstResult = doc.querySelector('a[href*="/track/"]');
    if (firstResult) {
        const trackUrl = 'https://open.spotify.com' + firstResult.getAttribute('href');
        console.log(`Found track: ${trackUrl}`);
        return trackUrl;
    } else {
        console.log('No track found.');
        return null;
    }
}

// Example usage:
searchSpotify('golden heart neal young').then(trackUrl => {
    if (trackUrl) {
        // Copy the track URL to the clipboard
        navigator.clipboard.writeText(trackUrl).then(() => {
            console.log('Track URL copied to clipboard:', trackUrl);
        }).catch(err => {
            console.error('Could not copy text to clipboard', err);
        });
    } else {
        console.log('No track found.');
    }
});
