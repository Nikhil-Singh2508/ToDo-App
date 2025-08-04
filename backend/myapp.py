import requests
import json
url = "http://127.0.0.1:8000/api/"

def get_data():
    r = requests.get(url)
    data = r.json()
    print(data)

get_data()


def post_data():
    json_data = json.dumps({'data': 'Hello'})
    r = requests.post(url=url, data= json_data, headers={'content-Type': 'application/json'})
    data = r.json()
    print(data)
post_data()