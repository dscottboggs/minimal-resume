#!/bin/sh
set -e

cd `[ -n $PROJECT_DIR ] && printf $PROJECT_DIR || printf /home/scott/Documents/code/web/minimal_resume/`
git pull
docker build --pull \
             --quiet \
             --tag minimal_resume \
             /home/scott/Documents/code/minimal_resume/
cd -
