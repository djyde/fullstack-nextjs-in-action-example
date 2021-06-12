import nc from "next-connect";
import * as Boom from "@hapi/boom";
import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

import jwt from 'jsonwebtoken'

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

export const getUserFromReq = async (req) => {
  // get JWT `token` on cookies
  const token = req.cookies['token']
  try {
    // if token is invalid, `verify` will throw an error
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // find user in database
    const user = await prisma.user.findUnique({
      where: {
        name: payload.username
      }
    })

    return user
  } catch (e) {
    return null
  }
}