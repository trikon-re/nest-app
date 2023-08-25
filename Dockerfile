FROM node:18-alpine

# update npm to the latest minor version
RUN npm install -g npm

# install dependencies for node-gyp
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# CMD [ "npm", "run", "start:prod" ]
CMD [ "node", "dist/main.js" ]