import os
from flask import Flask, request, send_file
from flask_cors import CORS
import dataclasses

from providers import token_provider
from services import data_service, search_service, video_service, download_service, metadata_service

app = Flask(__name__)


@app.get("/artist/<id>")
def get_artist(id: str):
    id = int(id)
    artist = data_service.get_artist(id)
    return dataclasses.asdict(artist)


@app.get("/artist/<id>/tracks")
def get_artist_tracks(id: str):
    id = int(id)
    page = int(request.args.get("page", 0))
    limit = int(request.args.get("limit", 25))
    tracks = data_service.get_artist_tracks(id, page=page, limit=limit)
    return dataclasses.asdict(tracks)


@app.get("/album/<id>")
def get_album(id: str):
    id = int(id)
    album = data_service.get_album(id)
    return dataclasses.asdict(album)


@app.get("/album/<id>/tracks")
def get_album_tracks(id: str):
    id = int(id)
    tracks = data_service.get_album_tracks(id)
    return dataclasses.asdict(tracks)


@app.get("/track/<id>")
def get_track(id: str):
    id = int(id)
    track = data_service.get_track(id)
    return dataclasses.asdict(track)


@app.get("/lyrics/<id>")
def get_lyrics(id: str):
    id = int(id)
    lyrics = data_service.get_lyrics(id)
    return dataclasses.asdict(lyrics)["text"]


@app.get("/sync-lyrics/<id>")
def get_sync_lyrics(id: str):
    id = int(id)
    lyrics = data_service.get_lyrics(id)
    return dataclasses.asdict(lyrics)["sync_text"]


@app.get("/search/artists")
def search_artists():
    query = request.args.get("query")
    page = int(request.args.get("page", 0))
    limit = int(request.args.get("limit", 25))
    artists = search_service.search_artists(query, page=page, limit=limit)
    return dataclasses.asdict(artists)


@app.get("/search/albums")
def search_albums():
    query = request.args.get("query")
    page = int(request.args.get("page", 0))
    limit = int(request.args.get("limit", 25))
    albums = search_service.search_albums(query, page=page, limit=limit)
    return dataclasses.asdict(albums)


@app.get("/search/tracks")
def search_tracks():
    query = request.args.get("query")
    page = int(request.args.get("page", 0))
    limit = int(request.args.get("limit", 25))
    tracks = search_service.search_tracks(query, page=page, limit=limit)
    return dataclasses.asdict(tracks)


@app.get("/search/videos")
def search_videos():
    query = request.args.get("query")
    videos = video_service.search_videos(query)
    return dataclasses.asdict(videos)


@app.get("/download/audio")
def download_audio():
    track_id = int(request.args.get("track"))
    video_id = request.args.get("video")

    track = data_service.get_track(track_id)
    file = download_service.download_audio(video_id)
    metadata_service.write_metadata(file, track)

    return send_file(file, as_attachment=True, download_name=f"{track.title} - {track.artist.name}.mp3")


@app.get("/download/lyrics")
def download_lyrics():
    track_id = int(request.args.get("track"))

    track = data_service.get_track(track_id)
    lyrics = data_service.get_lyrics(track_id)
    file = download_service.download_lyrics(track_id, lyrics)

    return send_file(file, as_attachment=True, download_name=f"{track.title} - {track.artist.name}.lrc")


@app.post("/refresh-token")
def set_refresh_token():
    refresh_token = request.form.get("token")
    token_provider.set_refresh_token(refresh_token)


def start_server():
    CORS(app)
    app.run(
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "4000")),
        load_dotenv=True)
