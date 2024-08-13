from dataclasses import dataclass


@dataclass
class Video:
    id: str
    title: str
    owner: str
    thumbnail: str
