#!/usr/bin/env bash
CONTAINER_NAME="postgres"
IMAGE_NAME="postgres16-demo"
HOST_PORT="127.0.0.1:5432"
CONTAINER_PORT="5432"

docker build -t $IMAGE_NAME ./postgres16-demo
# Check if the container already exists
if [ $(docker ps -aq -f name=$CONTAINER_NAME) ]; then
    echo "Container with name $CONTAINER_NAME already exists."

    # Check if the container is running
    if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
        echo "Restarting running container $CONTAINER_NAME..."
        docker restart $CONTAINER_NAME
    else
        echo "Starting stopped container $CONTAINER_NAME..."
        docker start $CONTAINER_NAME
    fi
else
    echo "Running a new container named $CONTAINER_NAME..."
    docker run --name $CONTAINER_NAME -dp $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME
fi
