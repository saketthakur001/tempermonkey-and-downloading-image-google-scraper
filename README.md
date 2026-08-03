# Tampermonkey Scripts + Google Image Scraper

A small personal grab-bag of scripts: a few Tampermonkey userscripts for RateYourMusic/Spotify/YouTube, and a Python image scraper (using `icrawler`) for downloading bulk artwork from Google Images. These were written as one-off personal tools rather than a packaged product, so they're loosely organized and some files are exploratory/commented-out drafts.

## What's in here

**Python (image scraping & sorting)**
- `main.py` / `main.ipynb` — uses [`icrawler`](https://github.com/hellock/icrawler)'s `GoogleImageCrawler` to bulk-download images for a hardcoded list of painters/paintings (e.g. "Jan van Eyck landscape HD art"), saving each artist's results into its own subfolder under a local `storage_dir`. Most of `main.py` is earlier commented-out variants of the same idea (different artist lists, different query phrasing) left in place as history/reference.
- `move.py` — post-processing script that walks a folder of downloaded images and sorts each one into `portrait/` or `landscape/` subfolders (per artist) based on its width/height.

**Tampermonkey userscripts (`.js`)**
- `tempermonkey.js` — "RateYourMusic Spotify Track ID Fetcher with API Search": scrapes track/artist names off a RateYourMusic charts page, searches the Spotify Web API for each, logs matches to the console, and adds a floating button to copy the results to the clipboard.
- `temper.js` — an older/alternate version of the same idea (mostly commented out), plus a separate experiment that scrapes Spotify's web search results page directly and copies the first matching track URL to the clipboard. Also includes a small Tampermonkey snippet for auto-toggling play/pause on Spotify/YouTube tabs.
- `get token.js` — helper for fetching a Spotify API access token via the client-credentials flow, given a client ID/secret.
- `rym to spotify playlist.js` — standalone script for searching the Spotify API for a track or album by name and logging matches.

**Other**
- `test.ipynb` — empty notebook, unused.

## Usage

### Image scraper
```bash
pip install icrawler pillow
```
Edit the artist list and `storage_dir` path in `main.py` (currently hardcoded to a local `/home/saket/...` path) to suit your machine, then run:
```bash
python main.py
```
Afterwards, `move.py` can sort the downloaded images by orientation (again, edit the hardcoded paths at the top of the file first).

### Tampermonkey scripts
Install [Tampermonkey](https://www.tampermonkey.net/) in your browser, create a new script, and paste in the contents of `tempermonkey.js` (or one of the others). You'll need to supply your own Spotify API access token/client credentials — see [Spotify's Web API docs](https://developer.spotify.com/documentation/web-api) for how to obtain one.

## Limitations / notes

- Several scripts have file paths (`/home/saket/downloads/...`) and Spotify API credentials hardcoded — these need to be edited before use, and **`get token.js` and `rym to spotify playlist.js` contain real-looking Spotify client secrets/access tokens committed in plain text**, which should be rotated/removed if they were ever live.
- Spotify access tokens obtained via the client-credentials flow expire after about an hour; the scripts don't handle refreshing them.
- `main.py`/`main.ipynb` largely duplicate each other and contain large blocks of commented-out earlier attempts rather than a single clean entry point.
- There's no dependency manifest (`requirements.txt`); `icrawler` and `Pillow` must be installed manually.
- This is a personal toolbox, not a maintained library — expect rough edges and manual editing before scripts will run on a new machine.
