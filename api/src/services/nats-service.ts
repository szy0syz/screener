import nats, { Stan } from "node-nats-streaming";

class NatsService {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }
    return this._client;
  }

  connect(clustedId: string, clientId: string, url: string) {
    this._client = nats.connect(clustedId, clientId, { url });

    return new Promise((resolve, reject) => {
      // @ts-ignore
      this._client!.on("connect", () => {
        console.log("Connected to NATS");
        resolve(true);
      });
      // @ts-ignore
      this._client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsService = new NatsService();
