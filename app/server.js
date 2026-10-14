const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 3000;


client.collectDefaultMetrics();


const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status_code"],
});


app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequests.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });

  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Express! This is a monitoring setup with Grafana, Prometheus, Loki and ...");
});

app.get("/test-error", (req, res) => {
  console.error("Simulated HTTP 500 error");
  res.status(500).send("Simulated failure");
});


app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Prometheus endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});