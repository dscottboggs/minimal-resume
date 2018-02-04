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
}

if [ -f ./index.html ] && [ -f ./Dockerfile] && [ -f package.json ]; then
  npm help
  xc=$?
  if [ $xc > 0 ]; then
    echo "npm must be installed."
    exit $ec
  fi
  buildpkg  # function call
  xc=$?
  if [[ $xc > 0 ]]; then
    dockerPrerequisites  # function call
    if [[ -v $nginx_container && -v $nginx_container ]]; then
      dockerDeployment  # function call
    fi
  fi
