import Boom from "@hapi/boom";
import { apiHandler, prisma } from "../../utils.server";
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import cookie from 'cookie'

async function validate(username, password) {
  // validate the username and password
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });

  if (!user) {
    throw Boom.unauthorized("user not found");
  }

  if (bcrypt.compareSync(password, user.password)) {
    return user
  } else {
    throw Boom.unauthorized('username or password not correct')
  }
}

export default apiHandler()
  .post(async (req, res) => {
     const body = req.body as {
       username: string;
       password: string;
     };
     
    const user = await validate(body.username, body.password)

    // generate jwt

    const token = jwt.sign({
      username: user.name
    }, process.env.JWT_SECRET, { expiresIn: '3 days' })

    res.setHeader("Set-Cookie", cookie.serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 3
    }));

    res.json({})
  })