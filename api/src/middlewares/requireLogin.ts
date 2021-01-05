import { Request, Response, NextFunction } from "express";

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.session!.passport.user) {
    return res.status(401).send({ error: "You muse login" });
  }
  next();
};

export { requireLogin };
