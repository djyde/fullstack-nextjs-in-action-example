import nc from "next-connect";
import * as Boom from "@hapi/boom";
import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// @ts-expect-error
export const prisma: PrismaClient = global.prisma || new PrismaClient();
// @ts-expect-error
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const apiHandler = () =>
  nc<NextApiRequest, NextApiResponse>({
    onError(err, req, res) {
      if (Boom.isBoom(err)) {
        console.log(err);
        res.status(err.output.payload.statusCode);
        res.json({
          error: err.output.payload.error,
          message: err.output.payload.message,
        });
      } else {
        res.status(500);
        res.json({
          message: "Unexpected error",
        });
        console.error(err);
        // unexcepted error
      }
    },
  });
