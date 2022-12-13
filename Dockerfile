FROM node:18-alpine as base

# Reduce npm log spam and colour during install within Docker
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

WORKDIR /home/node/app
# Copy the source code over
COPY . /home/node/app/

# Build the Docusaurus app
# RUN npm install
# RUN npm run build
RUN yarn install --frozen-lockfile
RUN yarn build

## Deploy ######################################################################
# Use a stable nginx image
FROM nginx:stable-alpine as deploy
WORKDIR /home/node/app
COPY --from=base /home/node/app/build /usr/share/nginx/html/