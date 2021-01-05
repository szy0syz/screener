import express, { Request, Response } from "express";
import { passport } from "../services/passport-service";

const router = express.Router();

router.get(
  "/api/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/api/login/callback",
  passport.authenticate("google", (req: Request, res: Response) => {
    res.redirect("/");
  })
);

router.get("/api/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/api/me", (req, res) => {
  res.send(req.user);
});

export { router as authRouter };
