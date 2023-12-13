
try:
    import requests
    url = 'http://localhost:8000/dev/createTables'
    response = requests.post(url)
    print(response.text)
except:
    print("Error while creating tables!")