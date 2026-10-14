# monitoring
express-monitoring/
├── app/
│   ├── package.json
│   └── server.js
│
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   └── loki/
│
├── Dockerfile
└── docker-compose.yml

# start docker packages
docker compose up -d --build