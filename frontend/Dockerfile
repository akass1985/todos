# FROM node:10.17.0-alpine
# WORKDIR /usr/src/app
# COPY package.json ./
# COPY yarn.lock ./
# RUN yarn install
# # RUN npm ci --only=production
# COPY . .
# EXPOSE 3000
# CMD ["yarn", "start"]

FROM nginx:alpine
COPY nginx_default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
