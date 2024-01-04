

def get_server_url():
    url = ''
    with open('.env.development', 'r') as f:
        line = f.readline()
        if line.startswith('VITE_API_URL'):
            url = line.split('=')[1].strip()
    
    return url
    
    
def main():
    print("Server URL: " + get_server_url())
    
    
if __name__ == '__main__':
    main()