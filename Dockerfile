FROM node:14.17.3-alpine
WORKDIR /usr/src/app
COPY ./ ${WORKDIR}
RUN npm install
EXPOSE 3000
CMD npm run dev