FROM node:14 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.3

COPY --from=build /app/dist/car-n /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
