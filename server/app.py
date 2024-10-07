import os
import sys
import gnureadline
from dotenv import load_dotenv

from providers import token_provider
from services import data_service, search_service, video_service, download_service, metadata_service
from server import start_server


def run_command(cmd: str, args=list[str]) -> bool:
    cmd = cmd.lower()

    if cmd == "help":
        print("""Supported commands:
> help
> start-server
> get-artist [id]
> get-artist-albums [id]
> get-artist-tracks [id]
> get-album [id]
> get-album-tracks [id]
> get-track [id]
> get-lyrics [id]
> get-sync-lyrics [id]
> search-artists [query]
> search-albums [query]
> search-tracks [query]
> search-videos [query]
> download-audio [track_id] [video_id]
> download-lyrics [id]
> set-refresh-token [token]""")

    elif cmd == "start-server":
        start_server()

    elif cmd == "get-artist":
        id = int(args[0])
        artist = data_service.get_artist(id)
        print(artist)

    elif cmd == "get-artist-albums":
        id = int(args[0])
        albums = data_service.get_artist_albums(id)
        print(*albums.results, sep="\n\n")

    elif cmd == "get-artist-tracks":
        id = int(args[0])
        tracks = data_service.get_artist_tracks(id)
        print(*tracks.results, sep="\n\n")

    elif cmd == "get-album":
        id = int(args[0])
        album = data_service.get_album(id)
        print(album)

    elif cmd == "get-album-tracks":
        id = int(args[0])
        tracks = data_service.get_album_tracks(id)
        print(*tracks.results, sep="\n\n")

    elif cmd == "get-track":
        id = int(args[0])
        track = data_service.get_track(id)
        print(track)

    elif cmd == "get-lyrics":
        id = int(args[0])
        lyrics = data_service.get_lyrics(id)
        print(lyrics.text)

    elif cmd == "get-sync-lyrics":
        id = int(args[0])
        lyrics = data_service.get_lyrics(id)
        print(*[
            f"{line.timestamp} {line.line}" for line in lyrics.sync_text], sep="\n\n")

    elif cmd == "search-artists":
        query = " ".join(args)
        artists = search_service.search_artists(query)
        print(*artists.results, sep="\n\n")

    elif cmd == "search-albums":
        query = " ".join(args)
        albums = search_service.search_albums(query)
        print(*albums.results, sep="\n\n")

    elif cmd == "search-tracks":
        query = " ".join(args)
        tracks = search_service.search_tracks(query)
        print(*tracks.results, sep="\n\n")

    elif cmd == "search-videos":
        query = " ".join(args)
        videos = video_service.search_videos(query)
        print(*videos.results, sep="\n\n")

    elif cmd == "download-audio":
        track_id = int(args[0])
        video_id = args[1]

        track = data_service.get_track(track_id)
        file = download_service.download_audio(video_id)
        metadata_service.write_metadata(file, track)

        print("Track downloaded:", file)

    elif cmd == "download-lyrics":
        track_id = int(args[0])

        lyrics = data_service.get_lyrics(track_id)
        file = download_service.download_lyrics(track_id, lyrics)

        print("Lyrics downloaded:", file)

    elif cmd == "set-refresh-token":
        refresh_token = args[0]
        token_provider.set_refresh_token(refresh_token)

    elif cmd == "exit":
        return False

    else:
        print(f"Unknown command: {cmd}")

    return True


if __name__ == "__main__":
    load_dotenv()

    if len(sys.argv) > 1:
        print()
        run_command(sys.argv[1], sys.argv[2:])
        print()
    else:
        while True:
            print()
            [cmd, *args] = input("> ").split()
            print()

            if not run_command(cmd, args):
                break
