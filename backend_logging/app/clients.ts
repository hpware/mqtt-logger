import * as mqttt from "mqtt";
import { SQL } from "bun";

export const mqtt = mqttt.connect(
  `${process.env.MQTT_PROTOCOL}://${process.env.MQTT_URL}`,
  {
    clientId: "mqtt_js_logger",
    resubscribe: true,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  },
);

export const sql = new SQL({
  url: process.env.POSTGRES_URL,
});
