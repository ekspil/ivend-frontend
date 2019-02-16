FROM node:11
RUN mkdir -p /app/src
RUN mkdir -p /app/public
COPY package-lock.json /app
COPY package.json /app
COPY index.html /app
COPY main.js /app
COPY src /app/src
COPY layout /app/layout
COPY public /app/public
WORKDIR /app
RUN npm install
CMD ["npm", "start"]
