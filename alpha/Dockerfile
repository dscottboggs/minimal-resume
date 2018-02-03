FROM node:9.5-alpine
WORKDIR /app
ADD index.js ./
ADD index.html ./
ADD components.js ./
ADD content.js ./
ADD stylesheet.css ./
ADD package.json ./
ADD printable-stylesheet*.css ./
ADD printable-version*.html ./
ADD printable-version*.pdf ./
RUN npm install
RUN browserify index.js -t babelify -o page.js
