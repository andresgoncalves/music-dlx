from dataclasses import dataclass


@dataclass
class Search[T]:
    query: str
    page: int
    limit: int
    total: int
    has_next: bool
    results: list[T]
