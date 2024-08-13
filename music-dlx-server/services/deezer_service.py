import requests_cache
import urllib.parse

from providers import token_provider

session = requests_cache.CachedSession("deezer_cache")


def fetch_api(endpoint: str, params: dict[str, str] | None = None, **kwargs):
    url = urllib.parse.urljoin("https://api.deezer.com", endpoint)
    res = session.get(url=url, params=params, **kwargs)

    if not res.ok:
        raise Exception(f"API Error: fetch_api failed with status {
                        res.status_code}")

    return res.json()


def fetch_ajax(method: str, token: str = "", params: dict[str, str] = {}):
    res = session.get(url="https://www.deezer.com/ajax/gw-light.php", params={
        "method": method,
        "api_version": "1.0",
        "api_token": token,
        **params
    })

    if not res.ok:
        raise Exception(f"API Error: fetch_ajax failed with status {
                        res.status_code}")

    return res.json()


def fetch_gql(name: str, query: str, variables: dict = {}):
    res = session.post(url="https://pipe.deezer.com/api",
                       headers={"authorization": f"Bearer {
                           token_provider.get_bearer_token()}"},
                       json={
                           "operationName": name,
                           "query": query,
                           "variables": variables
                       })

    if not res.ok:
        raise Exception(f"API Error: fetch_gql failed with status {
                        res.status_code}")

    return res.json()
