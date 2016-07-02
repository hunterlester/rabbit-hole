FROM centos:latest

RUN yum -y update
RUN yum install -y epel-release
RUN curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -
RUN yum install -y nodejs


COPY package.json /app/package.json
RUN cd /app; npm install --production
COPY . /app

EXPOSE 3001
EXPOSE 3000
WORKDIR app

CMD ["npm", "run", "server"]
