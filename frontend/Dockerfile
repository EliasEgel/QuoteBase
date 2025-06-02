# Stage 1: Build
FROM node:20 AS build
WORKDIR /app
COPY . .

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_PATH

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_PATH=$VITE_API_PATH

RUN npm install
RUN npm run build


# Stage 2: Serve
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]