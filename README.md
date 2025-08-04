# MusicDLX

A simple web server and CLI tool for searching and downloading music from YouTube, powered by Deezer API and yt-dlp.

## Setup

### Build web app

```sh
# Change directory
cd web

# Install dependencies
npm install

# Build web app
npm run build

# Change directory
cd ..
```

### Install server dependencies

```sh
# Change directory
cd server

# Install dependencies
pip3 install -r requirements.txt
```

## Running

### Run web server

You must build the web app before running the server

```sh
# Change directory
cd server

# Run server
gunicorn --bind 0.0.0.0:4000 server:app
```

### Run CLI server

```sh
# Change directory
cd server

# Run CLI app
python3 app.py
```

#### Supported CLI commands

Help command (display this command list)

- `help`

Start web server

- `start-server`

Get details about an element (track/album/artist)

- `get-artist [id]`
- `get-artist-albums [id]`
- `get-artist-tracks [id]`
- `get-album [id]`
- `get-album-tracks [id]`
- `get-track [id]`
- `get-lyrics [id]`
- `get-sync-lyrics [id]`

Search elements with a query string

- `search-artists [query]`
- `search-albums [query]`
- `search-tracks [query]`
- `search-videos [query]`

Download audio/lyrics

- `download-audio [track_id] [video_id]`
- `download-lyrics [id]`

Configure refresh token for fetching lyrics

- `set-refresh-token [token]`
