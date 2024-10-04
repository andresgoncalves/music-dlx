from dataclasses import dataclass

from .artist import Artist, ArtistResult


@dataclass
class Album:
    id: int
    title: str
    release_date: str
    year: int
    genres: list[str]
    artist: Artist
    cover: str


@dataclass
class AlbumResult:
    id: int
    title: str
    artist: ArtistResult
    cover: str
