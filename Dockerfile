FROM nginx:latest
ADD ./ /usr/share/nginx/html
LABEL traefik.domain=scott.madscientists.co \
      traefik.docker.network=web \
      traefik.enable=true \
      traefik.scott_resume.frontend.rule=Host:scott.tams.tech,scott.madscientists.co \
      traefik.scott_resume.port=80 \
      traefik.scott_resume.protocol=http \
      tech.tams.dns_host=scott.tams.tech,scott.madscientists.co
