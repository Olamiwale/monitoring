# monitoring

### Application Monitoring Stack

A containerized monitoring and observability project built with Docker Compose, Prometheus, Grafana, Loki, Promtail, Alertmanager, and Node Exporter.

The project demonstrates how to monitor application availability, collect application logs, visualize infrastructure metrics, trigger alerts, and investigate failures using a monitoring stack similar to those used in DevOps environments.

## Overview

This project monitors an Express.js application and its supporting infrastructure.

It provides:

- Application availability monitoring.
- HTTP request metrics and error-rate monitoring.
- CPU, memory, disk, and network metrics.
- Centralized application log collection.
- Grafana dashboards for visualizing metrics.
- Prometheus alert rules.
- Alert routing through Alertmanager.
- Email notifications through SMTP.
- Failure simulation for testing monitoring and alerting.

## Architecture

### How the components work together

1. Express.js exposes application metrics through `/metrics`.
2. Prometheus scrapes the application and Node Exporter.
3. Node Exporter exposes host-level metrics.
4. Grafana queries Prometheus to visualize metrics.
5. Promtail collects container logs and sends them to Loki.
6. Grafana queries Loki to display and filter logs.
7. Prometheus evaluates alert rules.
8. Alertmanager routes firing and resolved alerts to configured receivers.
9. The SMTP server delivers email notifications.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Application runtime |
| Express.js | HTTP application |
| Docker | Application containerization |
| Docker Compose | Local multi-container orchestration |
| Prometheus | Metrics collection and alert evaluation |
| Node Exporter | Host-level metrics |
| Grafana | Dashboards and observability interface |
| Loki | Log storage and querying |
| Promtail | Log collection and shipping |
| Alertmanager | Alert grouping, routing, and notifications |
| SMTP | Email delivery protocol |



## Services and Ports

| Service | Address | Purpose |
|---|---|---|
| Express application | `http://localhost:3000` | Application endpoints |
| Prometheus | `http://localhost:9090` | Metrics and alert rules |
| Grafana | `http://localhost:3001` | Dashboards and log exploration |
| Loki | `http://localhost:3100` | Log ingestion and querying |
| Alertmanager | `http://localhost:9093` | Alert management |
| Node Exporter | `http://localhost:9100/metrics` | Host metrics |


## Prometheus Metrics

Prometheus collects metrics from the Express application and Node Exporter.


### Scrape configuration

The Prometheus configuration includes jobs similar to:

```yaml
scrape_configs:
  - job_name: express-app
    static_configs:
      - targets: ["app:3000"]

  - job_name: node-exporter
    static_configs:
      - targets: ["node-exporter:9100"]
```

The target names use Docker Compose service names, allowing containers on the same Compose network to communicate.
