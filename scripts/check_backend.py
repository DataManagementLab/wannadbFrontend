import requests

from utils import get_server_url

def main():
    url = get_server_url()
    print('Checking backend availability on ' + url +'...')
    success = False
    try:
        response = requests.get(url)
        if response.status_code == 200:
            success = True
    except:
        pass
    if success:
        print('Backend is up ✅')
        return;
    
    print('🚨🚨🚨 WARNING: Backend is down 🚨🚨🚨')
    print()
    print('The software will not work properly without the backend running!')
    
    ready = input('Do you want to continue anyway? (y/N) ')
    
    if ready.lower() == 'y' or ready.lower() == 'yes':
        print('YES')
        print('Exiting...')
        print('Starting the software...')
        return;
    
    print('NO')
    print('Please start the backend and try again.')
    print('View for more details: https://github.com/lw86ruwo/wannadbBackend')
    print('Exiting...')    
    exit(1)

if __name__ == '__main__':
    main()