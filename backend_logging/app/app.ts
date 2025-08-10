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
  await sql`INSERT INTO errorsys (uuid, source, errormsg) VALUES (${randomUUIDv7()}, "mqtt", ${err})`;
  console.error("MQTT error:", err);
});

mqtt.on("message", async (topic, message) => {
  const raw = message.toString();
  const displayed = raw.replace(/\r/g, "\\r").replace(/\n/g, "\\n");
  process.stdout.write(`Topic: ${topic}, Message: ${displayed}\n`);

  let isJson = false;
  let data = raw;
  try {
    JSON.parse(raw);
    isJson = true;
    data = JSON.stringify(raw);
  } catch (e) {
    isJson = false;
  }
  try {
    await sql`INSERT INTO mqtt_data (uuid, topic, data, isjson)
             VALUES (${randomUUIDv7()}, ${topic}, ${raw}, ${isJson})`;
  } catch (e) {
    console.log(e);
  }
});

// ON PROCESS QUIT
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
