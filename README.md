# screener

- `npm init -y`
- `npm i -D typescript`
- `tsc --init`
  - `"declaration": true`
- `src/index.ts`
- `npm i -D del-cli`
- `package.json`

```json
"scripts": {
  "clean": "del ./build",
  "build": "npm run clean && tsc"
}
```

- `npm i node-nats-streaming`
- `events`
  - `subjects.ts`
  - `base-listener.ts`
  - `base-publisher.ts`
  - `screenshot-created-event.ts`
  - `screenshot-finished-event.ts`

```ts
// [file] subjects.ts
export enum Subjects {
  ScreenshotCreated = "screenshot:created",
  ScreenshotFinished = "screenshot:finished",
}
```

```ts
// [file] base-listener.ts
import { Message, Stan } from 'node-nats-streaming'
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  protected client: Stan;

  abstract subject: T['subject']
  abstract onMessage(date: T['data'], msg: Message): void

  constructor(client: Stan) {
    this.client = client;
  }

  listen() {
    const subscription = this.client.subscribe(this.subject);
    subscription.on('message', (msg: Message) => {
      console.log(`Received event #${msg.getSequence()} ${msg.getSubject()}`);
      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    })
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
    ? JSON.parse(data)
    : JSON.parse(data.toString('utf-8'))
  }
}
```

```ts
// [file] base-publisher.ts
import { Subjects } from './subjects';
import { Stan } from 'node-nats-streaming';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  protected client: Stan;

  abstract subject: T['subject'];

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`Message published ${this.subject}`);
        resolve();
      })
    })
  }
}
```