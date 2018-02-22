
FROM ubuntu:16.04

# Create iirp-app directory
WORKDIR app

COPY package.json .
#COPY package-lock.json .

# Install NodeJs
RUN apt-get update && apt-get install -y apt-utils
RUN apt-get install -y build-essential
RUN apt-get install -y dialog apt-utils
RUN apt-get install --yes curl && curl --silent -- location https://deb.nodesource.com/setup_8.x | bash - && \
apt-get install -y nodejs  && npm i -g npm@5.3.0

# apt-get install -y nodejs && npm install -y -g 

# Bundle app source
COPY . .

# Install app dependencies
RUN rm -rf node_modules
RUN npm install -y

CMD ["npm", "start", "--port 4200"]
EXPOSE 4200
