docker build -t 127.0.0.1:5000/test:1 .
docker push 127.0.0.1:5000/test:1
docker stack deploy -c docker-compose.yml frontend