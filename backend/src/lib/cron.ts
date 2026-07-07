import { CronJob } from "cron";
import http from "node:http";

// every 14 minutes send a GET request to the health endpoint
const job = new CronJob("*/14 * * * *", function () {
  const port = process.env.PORT ?? "3001";
  const url = `http://localhost:${port}/health`;

  http
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("Keepalive OK");
      else console.log("Keepalive failed", res.statusCode);
    })
    .on("error", (e) => console.error("Keepalive error", e));
});

export default job;