from . import deezer_service

from models.album import Album, AlbumResult
from models.artist import Artist
from models.track import Track, TrackResult
from models.lyrics import Lyrics
from models.search import Search


def get_artist(id: int) -> Artist:
    data = deezer_service.fetch_api(f"/artist/{id}")

    artist = Artist(
        id=data["id"],
        name=data["name"],
        picture=data["picture_xl"])

    return artist


def get_album(id: int) -> Album:
    data = deezer_service.fetch_api(f"/album/{id}")

    artist = Artist(
        id=data["artist"]["id"],
        name=data["artist"]["name"],
        picture=data["artist"]["picture_xl"])
    release_date: str = data["release_date"]
    year = int(release_date[:4])

    album = Album(
        id=data["id"],
        title=data["title"],
        artist=artist,
        genres=[genre["name"] for genre in data["genres"]["data"]],
        release_date=release_date,
        year=year,
        cover=data["cover_xl"])

    return album


def get_album_tracks(id: int) -> Search[TrackResult]:
    data = deezer_service.fetch_api(f"/album/{id}/tracks")

    album = get_album(id)

    tracks = [TrackResult(
        id=track["id"],
        title=track["title"],
        album=album,
        artist=album.artist,
        duration=track["duration"]) for track in data["data"]]

    results = Search(query=id,
                     page=0,
                     limit=len(tracks),
                     total=len(tracks),
                     has_next=False,
                     results=tracks)

    return results


def get_artist_tracks(id: int, page: int = 0, limit: int = 25) -> Search[TrackResult]:
    data = deezer_service.fetch_api(f"/artist/{id}/top", params={
        "limit": limit,
        "index": page * limit
    })

    artist = get_artist(id)

    tracks = [TrackResult(
        id=track["id"],
        title=track["title"],
        album=AlbumResult(
            id=track["album"]["id"],
            title=track["album"]["title"],
            artist=artist,
            cover=track["album"]["cover_xl"]
        ),
        artist=artist,
        duration=track["duration"]) for track in data["data"]]

    results = Search(query=id,
                     page=page,
                     limit=limit,
                     total=data["total"],
                     has_next="next" in data,
                     results=tracks)

    return results


def get_lyrics(id: int) -> Lyrics:
    data = deezer_service.fetch_gql(
        name="Lyrics",
        query="""
query Lyrics($trackId: String!) {
    track(trackId: $trackId) {
        lyrics {
            text
            synchronizedLines {
                line
                lrcTimestamp
                duration
                milliseconds
            }
        }
    }
}""",
        variables={
            "trackId": str(id)
        }
    )["data"]

    if not data["track"] or not data["track"]["lyrics"]:
        return None

    sync_text = [Lyrics.Line(
        line=line["line"],
        timestamp=line["lrcTimestamp"],
        duration=line["duration"],
        milliseconds=line["milliseconds"]
    ) for line in data["track"]["lyrics"]["synchronizedLines"]]

    lyrics = Lyrics(
        text=data["track"]["lyrics"]["text"],
        sync_text=sync_text)

    return lyrics


def get_track(id: int) -> Track:
    data = deezer_service.fetch_api(f"/track/{id}")

    artist = Artist(
        id=data["artist"]["id"],
        name=data["artist"]["name"],
        picture=data["artist"]["picture_xl"])
    album = get_album(data["album"]["id"])
    contributors = [Artist(
        id=contributor["id"],
        name=contributor["name"],
        picture=contributor["picture_xl"])
        for contributor in data["contributors"]]
    lyrics = get_lyrics(id)

    track = Track(
        id=data["id"],
        title=data["title"],
        album=album,
        artist=artist,
        contributors=contributors,
        duration=data["duration"],
        disk_number=data["disk_number"],
        track_number=data["track_position"],
        release_date=data["release_date"],
        lyrics=lyrics)

    return track
