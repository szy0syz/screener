import { Publisher, Subjects, ScreenshotFinishedEvent } from '@jscreener/common'

export class ScreenshotFinishedPublisher extends Publisher<ScreenshotFinishedEvent> {
  subject:Subjects.ScreenshotFinished = Subjects.ScreenshotFinished
}
