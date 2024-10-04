import requests
import json

from models.search import Search
from models.video import Video


def search_videos(query: str) -> Search[Video]:
    res = requests.get(
        url="https://youtube.com/search",
        params={
            "q": query})

    initial_data = json.loads(
        res.text
        .partition("var ytInitialData = ")[-1]
        .partition(";</script>")[0])

    data = initial_data["contents"]["twoColumnSearchResultsRenderer"]["primaryContents"][
        "sectionListRenderer"]["contents"][0]["itemSectionRenderer"]["contents"]

    videos = [
        Video(id=video["videoRenderer"]["videoId"],
              title=video["videoRenderer"]["title"]["runs"][-1]["text"],
              owner=video["videoRenderer"]["ownerText"]["runs"][0]["text"],
              thumbnail=video["videoRenderer"]["thumbnail"]["thumbnails"][0]["url"])
        for video in data if "videoRenderer" in video]

    results = Search(query=query,
                     page=0,
                     limit=len(videos),
                     total=len(videos),
                     has_next=False,
                     results=videos)

    return results
