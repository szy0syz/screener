import { Publisher, Subjects, ScreenshotCreatedEvent } from "@jscreener/common";

export class ScreenshotCreatedEventPublisher extends Publisher<ScreenshotCreatedEvent> {
  subject: Subjects.ScreenshotCreated = Subjects.ScreenshotCreated;
}
