import { mqtt, sql } from "./clients";
import { randomUUIDv7 } from "bun";
mqtt.on("connect", () => {
  mqtt.subscribe("#", { qos: 0 }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
});

mqtt.on("reconnect", () => console.log("Reconnecting..."));
mqtt.on("error", async (err) => {
  await sql`INSERT INTO mqtt_errors (uuid, errormsg) VALUE (${randomUUIDv7()}, ${err}`;
  console.error("MQTT error:", err);
});

mqtt.on("message", (topic, message) => {
  const raw = message.toString();
  const displayed = raw.replace(/\r/g, "\\r").replace(/\n/g, "\\n");
  process.stdout.write(`Topic: ${topic}, Message: ${displayed}\n`);
});

process.on("SIGINT", () => {
  console.log("Closing MQTT connection...");
  mqtt.end(false, {}, () => {
    console.log("MQTT connection closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Closing MQTT connection...");
  mqtt.end(false, {}, () => {
    console.log("MQTT connection closed");
    process.exit(0);
  });
});
