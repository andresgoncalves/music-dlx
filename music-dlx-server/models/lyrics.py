from dataclasses import dataclass


@dataclass
class Lyrics:
    @dataclass
    class Line:
        line: str
        timestamp: str
        milliseconds: int
        duration: int

    text: str
    sync_text: list[Line]
