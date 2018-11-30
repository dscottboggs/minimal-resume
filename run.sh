#!/bin/sh
set -e
# this script is what the sytemd unit executes, so changing this changes how the
# service is deployed.

cd `[ -n "$PROJECT_DIR" ] && printf "$PROJECT_DIR" || printf /media/deployments/minimal-resume/`
git pull
minimal_resume_docker_image="`
docker build --pull \
             --quiet \
             --tag minimal-resume \
             /media/deployments/minimal-resume/`"
docker run --attach=STDOUT \
		   --attach=STDERR \
		   --log-driver=journald \
		   --network=web \
		   "$minimal_resume_docker_image"
cd -
