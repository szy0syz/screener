import { natsService } from "./services/nats-service";
import { ScreenshotFinishedEventListener } from "./events/listeners/screenshot-finished-listener";
import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("process.env.MONGO_URI must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("process.env.NATS_CLUSTER_ID must be defined");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("process.env.NATS_CLIENT_ID must be defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("process.env.NATS_URL must be defined");
  }

  try {
    await natsService.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsService.client.on("close", () => {
      console.log("NATS connection close");
      process.exit();
    });
    process.on("SIGINT", () => {
      natsService.client.close();
    });
    process.on("SIGTERM", () => {
      natsService.client.close();
    });

    new ScreenshotFinishedEventListener(natsService.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => console.log("Listening on port 3000"));
};

start();
