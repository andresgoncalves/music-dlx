import requests
from mutagen.id3 import ID3, Frames
from mutagen.mp3 import EasyMP3
from mutagen.easyid3 import EasyID3

from models.track import Track

EasyID3.RegisterTextKey("year", "TYER")


def write_metadata(file: str, track: Track):
    audio = ID3(file)
    audio.clear()

    audio.add(Frames["APIC"](
        encoding=3,
        mime='image/jpeg',
        type=3,
        desc='Cover',
        data=requests.get(track.album.cover).content
    ))

    if track.lyrics != None:
        audio.add(Frames["USLT"](
            encoding=3,
            text=track.lyrics.text))
        audio.add(Frames["SYLT"](
            encoding=3,
            type=1,
            format=2,
            text=[
                (line.line, line.milliseconds)
                for line in track.lyrics.sync_text
            ]
        ))

    audio.save()

    audio = EasyMP3(file)
    audio["title"] = track.title
    audio["album"] = track.album.title
    audio["albumartist"] = track.artist.name
    audio["artist"] = ", ".join(
        [contributor.name for contributor in track.contributors])
    audio["length"] = str(track.duration)
    audio["discnumber"] = str(track.disk_number)
    audio["tracknumber"] = str(track.track_number)
    audio["date"] = track.release_date
    audio["year"] = str(track.album.year)
    audio["genre"] = track.album.genres
    audio.save()
