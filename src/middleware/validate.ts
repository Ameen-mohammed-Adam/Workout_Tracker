import { NextFunction, Request, Response } from "express";

import Joi from "joi";

export const validate = (Schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Schema.validateAsync(req.body);
    next;
  };
};
