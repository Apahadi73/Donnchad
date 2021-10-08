# FROM node:alpine

# WORKDIR /app
# COPY package.json .
# RUN npm install --force
# COPY . .

# RUN npm install -g concurrently
# CMD ["concurrently","npm:start", "npm:migrate"]
