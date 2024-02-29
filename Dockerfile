FROM node:20-alpine
WORKDIR /app
COPY package*.json .
COPY tsconfig*.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]



# # multistage build, for development and production, we got three image

# # base image
# FROM node:20-alpine AS base
# WORKDIR /app
# COPY package*.json .
# COPY tsconfig*.json .
# RUN npm install

# # devlopment image -> can be run independently
# FROM base AS development
# COPY . .
# EXPOSE 8000
# CMD [ "npm", "run", "dev" ]

# # production image -> can be run independently
# FROM base as production
# COPY . .
# RUN npm prune --production
# CMD [ "npm", "run", "start" ]

