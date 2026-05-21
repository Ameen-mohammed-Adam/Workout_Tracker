import { Response } from "express";

export const ResFunc = (
  res: Response,
  statusCode: number,
  info: any,
  limit?: number,
  total?: number,
) => {
  if (limit !== undefined && total !== undefined) {
    res.status(statusCode).json({
      data: info,
      meta: {
        limit,
        total,
      },
    });
    return;
  }
  res.status(statusCode).json({
    data: info,
  });
};
