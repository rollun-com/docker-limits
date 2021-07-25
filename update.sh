git -C /usr/lib/docker-limits pull

npm i --prefix /usr/lib/docker-limits

cp /usr/lib/docker-limits/systemd-service/docker-limits.service /etc/systemd/system/docker-limits.service

systemctl daemon-reload
service docker-limits restart
