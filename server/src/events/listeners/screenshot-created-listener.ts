import { Message } from 'node-nats-streaming';
import { Subjects, ScreenshotCreatedEvent, Listener } from '@jscreener/common';
import { natsService } from '../../services/nats-service';
import { takeScreenshot } from '../../services/screenshots-service';
import { cloudinaryService } from '../../services/cloudinary-service';
import { ScreenshotFinishedPublisher } from '../publishers/screenshot-finished-publisher';

export class ScreenshotCreatedEventListener extends Listener<ScreenshotCreatedEvent> {
  subject: Subjects.ScreenshotCreated = Subjects.ScreenshotCreated;

  async onMessage(data: ScreenshotCreatedEvent['data'], msg: Message) {
    const path = `./assets/images/screenshot_${data.id}.png`;

    try {
      await takeScreenshot(data.url, path);
    } catch (err) {
      throw new Error('Screenshot failed');
    }

    const resp = await cloudinaryService.client.uploader.upload(path);

    new ScreenshotFinishedPublisher(natsService.client).publish({
      id: data.id,
      cloudinary_id: resp.public_id,
      cloudinary_url: resp.url,
      cloudinary_version: resp.version,
      width: resp.width,
      height: resp.height,
      bytes: resp.bytes,
      format: resp.format,
    });
  }
}
