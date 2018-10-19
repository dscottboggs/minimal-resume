#!/bin/sh
set -e

cd `[ -n "$PROJECT_DIR" ] && printf "$PROJECT_DIR" || printf /media/deployments/minimal-resume/`
git pull
docker build --pull \
             --quiet \
             --tag minimal-resume \
             /media/deployments/minimal-resume/
cd -
