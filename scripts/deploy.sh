#!/bin/bash

# Environment variables

HOME_DIR="/home/wannadb"
FRONTEND_DIR="$HOME_DIR/frontend"
BACKEND_DIR="$HOME_DIR/backend"

# check if the flag -b is set
while getopts b: flag
do
    case "${flag}" in
        b) branch=${OPTARG};;
    esac
done

if [ ! -z "$branch" ]
then
    echo "Updating on branch $branch"
fi

echo "Updating the frontend..."

cd $FRONTEND_DIR

if [ ! -z "$branch" ]
then
    git checkout $branch
fi

npm run server:update

echo "Updating the backend.."
cd $BACKEND_DIR

if [ ! -z "$branch" ]
then
    git checkout $branch
fi

git pull
docker restart $(docker ps -qa)

echo "Restarting NGINX..."
sudo /etc/init.d/nginx restart
sudo systemctl restart nginx

