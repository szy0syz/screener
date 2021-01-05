import express, { Request, Response } from "express";
import { Screenshot } from "../models/screenshot";
import { natsService } from "../services/nats-service";
import { ScreenshotCreatedEventPublisher } from "../events/publishers/screenshot-created-publisher";
import { requireLogin } from "../middlewares/requireLogin";

const router = express.Router();

router.get("/api/screenshots", requireLogin, async (req: Request, res: Response) => {
  // @ts-ignore
  const screenshots = await Screenshot.find({ _user: req.session!.passport.user });
  res.send(screenshots);
});

router.delete("/api/screenshots/:id", requireLogin, async (req: Request, res: Response) => {
  const screenshot = await Screenshot.findByIdAndRemove(req.params.id);
  if (!screenshot) {
    throw new Error("Screenshot not found");
  }
  res.send(screenshot);
});

router.post("/api/screenshots", requireLogin, async (req: Request, res: Response) => {
  const { url } = req.body;

  const screenshot = Screenshot.build({ _user: req.user });
  await screenshot.save();
  await new ScreenshotCreatedEventPublisher(natsService.client).publish({
    id: screenshot.id,
    url,
  });

  res.status(201).send(screenshot);
});

export { router as indexRouter };
