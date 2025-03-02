git clone https://github.com/rollun-com/devops-docker-limits.git /usr/lib/docker-limits

# nvm hack
ln -fs `which node` /usr/bin/node

npm i --prefix /usr/lib/docker-limits

cp /usr/lib/docker-limits/systemd-service/docker-limits.service /etc/systemd/system/docker-limits.service

systemctl daemon-reload
service docker-limits start
systemctl docker-limits enable
