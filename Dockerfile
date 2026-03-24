FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# DEBUG
RUN ls -R dist

FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html

COPY --from=build /app/dist/contaaqui-ui/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
