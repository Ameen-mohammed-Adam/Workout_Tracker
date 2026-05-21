import { Request, Response, NextFunction } from "express";
type ll = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export const catchAsync = (fn: ll) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
