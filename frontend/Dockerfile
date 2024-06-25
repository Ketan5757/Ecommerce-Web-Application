FROM node as build

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

ARG REACT_APP_STRIPE_KEY

ENV REACT_APP_STRIPE_KEY=$REACT_APP_STRIPE_KEY

RUN npm run build

FROM nginx:1.19-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'