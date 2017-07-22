FROM node:8-alpine

# install caddy
ARG plugins=http.git

RUN apk add --no-cache openssh-client git tar curl

RUN curl --silent --show-error --fail --location \
	--header "Accept: application/tar+gzip, application/x-gzip, application/octet-stream" -o - \
	"https://caddyserver.com/download/linux/amd64?plugins=${plugins}" \
	| tar --no-same-owner -C /usr/bin/ -xz caddy \
	&& chmod 0755 /usr/bin/caddy \
	&& /usr/bin/caddy -version

EXPOSE 80 443 2015
VOLUME /root/.caddy
WORKDIR /srv

ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout"]

# setup caddy
COPY source/Caddyfile /etc/Caddyfile

# build
WORKDIR /srv

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY source source
COPY webpack.config.js webpack.config.js
RUN yarn run build

RUN rm -rf node_modules
RUN yarn install --production
