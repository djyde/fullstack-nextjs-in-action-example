import Boom from "@hapi/boom";
import { apiHandler, prisma } from "../../utils.server";
import bcrypt from 'bcrypt'

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

    res.json({})
  })