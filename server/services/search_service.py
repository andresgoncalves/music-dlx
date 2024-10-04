from . import deezer_service

from models.album import AlbumResult
from models.artist import ArtistResult
from models.track import TrackResult
from models.search import Search


def search_artists(query: str, page: int = 0, limit: int = 25) -> Search[ArtistResult]:
    data = deezer_service.fetch_api(f"/search/artist",
                                    params={
                                        "q": query,
                                        "limit": limit,
                                        "index": page * limit
                                    })

    artists = [
        ArtistResult(
            id=artist["id"],
            name=artist["name"],
            picture=artist["picture_xl"]
        ) for artist in data["data"]]

    results = Search(query=query,
                     page=page,
                     limit=limit,
                     total=data["total"],
                     has_next="next" in data,
                     results=artists)

    return results


def search_albums(query: str, page: int = 0, limit: int = 25) -> Search[AlbumResult]:
    data = deezer_service.fetch_api(f"/search/album",
                                    params={
                                        "q": query,
                                        "limit": limit,
                                        "index": page * limit
                                    })

    albums = [
        AlbumResult(
            id=album["id"],
            title=album["title"],
            artist=ArtistResult(
                id=album["artist"]["id"],
                name=album["artist"]["name"],
                picture=album["artist"]["picture_xl"]),
            cover=album["cover_xl"]
        ) for album in data["data"]]

    results = Search(query=query,
                     page=page,
                     limit=limit,
                     total=data["total"],
                     has_next="next" in data,
                     results=albums)

    return results


def search_tracks(query: str, page: int = 0, limit: int = 25) -> Search[TrackResult]:
    data = deezer_service.fetch_api(f"/search/track",
                                    params={
                                        "q": query,
                                        "limit": limit,
                                        "index": page * limit
                                    })

    tracks = [
        TrackResult(
            id=track["id"],
            title=track["title"],
            album=AlbumResult(
                id=track["album"]["id"],
                title=track["album"]["title"],
                artist=ArtistResult(
                    id=track["artist"]["id"],
                    name=track["artist"]["name"],
                    picture=track["artist"]["picture_xl"]),
                cover=track["album"]["cover_xl"]
            ),
            artist=ArtistResult(
                id=track["artist"]["id"],
                name=track["artist"]["name"],
                picture=track["artist"]["picture_xl"]),
            duration=track["duration"],
        ) for track in data["data"]]

    results = Search(query=query,
                     page=page,
                     limit=limit,
                     total=data["total"],
                     has_next="next" in data,
                     results=tracks)

    return results
