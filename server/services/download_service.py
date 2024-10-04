import os
from yt_dlp import YoutubeDL

from models.lyrics import Lyrics

_downloads_path = os.getenv("DOWNLOADS", "./.downloads")
_ytdl_opts = {
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
    'outtmpl': f'{_downloads_path}/%(id)s.%(ext)s'
}


def download_audio(id: str):
    filename = os.path.join(_downloads_path, id + ".mp3")

    if os.path.isfile(filename):
        return filename

    error = False

    def progress_hook(info):
        nonlocal error
        if info["status"] == "finished":
            error = False
        elif info["status"] == "error":
            error = True

    with YoutubeDL({**_ytdl_opts, "progress_hooks": [progress_hook]}) as ytdl:
        ytdl.download([f"https://youtube.com/watch?v={id}"])

    if error:
        raise Exception(f"DownloadError: couldn't download video {id}")

    return filename


def download_lyrics(id: int, lyrics: Lyrics):
    filename = os.path.join(_downloads_path, str(id) + ".lrc")

    with open(filename, "w", encoding="utf-8") as file:

        file.write("\n".join([
            f"{line.timestamp}{line.line}" for line in lyrics.sync_text]))

    return filename
