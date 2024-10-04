from dataclasses import dataclass


@dataclass
class Artist:
    id: int
    name: str
    picture: str


@dataclass
class ArtistResult:
    id: int
    name: str
    picture: str
