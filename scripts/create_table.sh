#!/bin/bash

server_url="http://localhost:8000"

echo "Creating tables on $server_url..."
curl -X POST $server_url/dev/createTables/public

echo ""
