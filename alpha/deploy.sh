#!/bin/bash

DOCKER_LOCATION=/run/docker.sock
VERSION='2.0.0'

function dockerPrerequisites {
  nginx_container=$(docker run --detach --expose 80 \
    --volume $DOCKER_LOCATION:/tmp/docker.sock --expose 443 \
    jwilder/nginx-proxy)
  lenc_companion=$(docker run --detach --volumes-from $nginx_container \
    --volume $DOCKER_LOCATION:/var/run/docker.sock \
    jrcs/nginx-proxy-letsencrypt-companion)
  echo "NginX container ID: $nginx_container\nLetsEncrypt companion container ID: $lenc_companion"
}

function dockerDeployment {
    docker build --tag minimal-resume:$VERSION-dev .
    docker run --detach minimal-resume:$VERSION-dev
}

function buildpkg {
    npm run build-dev
    xc=$?
    if [[ $xc > 0 ]]; then
        echo error running NPM
        exit $xc
    fi
}

function notAllFilesFound {
    echo "File requirements not fulfilled. This script requires package.json,"
    echo "index.html, docker-compose.yml and Dockerfile. Found:"
    echo "      $(find . -type f -name Dockerfile)"
    echo "      $(find . -type f -name index.html)"
    echo "      $(find . -type f -name package.json)"
    echo "      $(find . -type f -name docker-compose.yml -or -name docker-compose.yaml)"
}

if [[ -f ./index.html ]] && [[ -f ./Dockerfile ]] && [[ -f package.json ]]; then
    npm help > /dev/null
    xc=$?
    if [ $xc > 0 ]; then
        echo "npm must be installed."
        echo "Type your password to give sudo permission to install it."
        sudo aptitude update && sudo aptitude install -y npm
    fi
    buildpkg  # function call
    if [[ -f docker-compose.yml || -f docker-compose.yaml ]]; then
        docker-compose up -d
    else
        notAllFilesFound
    fi
else
    notAllFilesFound
fi
