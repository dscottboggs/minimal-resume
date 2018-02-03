FROM node:9.5-alpine
WORKDIR /app
ADD package.json ./
RUN npm install
ADD index.js ./
ADD index.html ./
ADD components.js ./
ADD content.js ./
ADD stylesheet.css ./
ADD printable-stylesheet*.css ./
ADD printable-version*.html ./
ADD printable-version*.pdf ./
RUN ./node_modules/.bin/browserify index.js -t babelify -o page.js
