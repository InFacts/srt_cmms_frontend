docker build -t 127.0.0.1:5000/test:3 .
docker push 127.0.0.1:5000/test:3
ssh root@192.168.200.101 /bin/bash << EOF
docker pull 127.0.0.1:5000/test:3
EOF
ssh root@192.168.200.103 /bin/bash << EOF
docker pull 127.0.0.1:5000/test:3
EOF
docker stack deploy -c docker-compose.yml frontend