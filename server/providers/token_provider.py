import requests
import os


_bearer_token = ""
_refresh_token: str | None = os.getenv("REFRESH_TOKEN")


def get_bearer_token():
    global _refresh_token
    global _bearer_token

    if _refresh_token == None:
        raise Exception("TokenError: Refresh token not configured")

    res = requests.post("https://auth.deezer.com/login/renew?jo=p&rto=c&i=c",
                        cookies={"refresh-token": _refresh_token})
    data = res.json()

    set_bearer_token(data["jwt"])
    if len(data["refresh_token"]) > 0:
        set_refresh_token(data["refresh_token"])

    return _bearer_token


def set_bearer_token(bearer_token: str):
    global _bearer_token
    _bearer_token = bearer_token


def set_refresh_token(refresh_token: str):
    global _refresh_token
    _refresh_token = refresh_token
