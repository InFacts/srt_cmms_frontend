docker build -t 127.0.0.1:5000/frontend:14 .
docker push 127.0.0.1:5000/frontend:14
docker stack deploy -c docker-compose.yml frontend
ssh root@192.168.200.103 /bin/bash << EOF
docker pull 127.0.0.1:5000/frontend:14
EOF
sleep 10;