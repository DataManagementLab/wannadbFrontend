#!/bin/bash

# check if the flag -b is set
while getopts b: flag
do
    case "${flag}" in
        b) branch=${OPTARG};;
    esac
done

if [ ! -z "$branch" ]
then
    echo "Updating to branch $branch"
fi

echo "Updating the frontend..."

cd /home/wannadb/frontend

if [ ! -z "$branch" ]
then
    git checkout $branch
fi

npm run server:update

echo "Updating the backend.."
cd /home/wannadb/backend

if [ ! -z "$branch" ]
then
    git checkout $branch
fi

git pull
docker restart $(docker ps -qa)

echo "Restarting NGINX..."
sudo /etc/init.d/nginx restart
sudo systemctl restart nginx

