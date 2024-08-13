from dataclasses import dataclass

from .album import Album, AlbumResult
from .artist import Artist, ArtistResult
from .lyrics import Lyrics


@dataclass
class Track:
    id: int
    title: str
    album: Album
    artist: Artist
    contributors: list[Artist]
    duration: int
    disk_number: int
    track_number: int
    release_date: str
    lyrics: Lyrics | None


@dataclass
class TrackResult:
    id: int
    title: str
    album: AlbumResult
    artist: ArtistResult
    duration: int
