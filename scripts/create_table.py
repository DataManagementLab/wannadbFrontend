from utils import get_server_url

try:
    import requests
    url = get_server_url()
    print('Creating tables on ' + url +'...')
    url += '/dev/createTables'
    response = requests.post(url)
    print(response.text)
except:
    print("Error while creating tables!")