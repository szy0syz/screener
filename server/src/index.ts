import {natsService} from './services/nats-service'
import {cloudinaryService} from './services/cloudinary-service'
import { ScreenshotCreatedEventListener } from './events/listeners/screenshot-created-listener'
import shell from 'shelljs'

const start = async () => {
  shell.mkdir('-p', 'assets/images')

  if(!process.env.NATS_CLUSTER_ID){
      throw new Error('process.env.NATS_CLUSTER_ID must be defined')
  }

  if(!process.env.NATS_CLIENT_ID){
      throw new Error('process.env.NATS_CLIENT_ID must be defined')
  }

  if(!process.env.NATS_URL){
      throw new Error('process.env.NATS_URL must be defined')
  }

  try {
    await natsService.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    natsService.client.on('close', () => {
      console.log('NATS connection close');
      process.exit();
    })
    process.on('SIGINT', () => { natsService.client.close() })
    process.on("SIGTERM", () => { natsService.client.close() })

    cloudinaryService.connect();

    new ScreenshotCreatedEventListener(natsService.client).listen();
  } catch (err) {
    console.error(err);
  }
}
