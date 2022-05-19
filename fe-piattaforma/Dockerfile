FROM node:14.18-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build

FROM nginx:alpine as production
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
