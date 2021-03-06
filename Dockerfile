FROM node:8.14.1

WORKDIR /var/www

COPY . /var/www

ARG NODE_ENV=productiom
ARG PORT
ARG SECRET_KEY=justanotherrandomstring
ARG DATABASE_ONLINE
ARG JWT_EXPIRES_IN=90d

EXPOSE ${PORT}

RUN npm install

CMD ["npm", "start"]