import { apiHandler, prisma } from "../../utils.server";
import bcrypt from 'bcrypt'

export default apiHandler()
  .post(async (req, res) => {
    const body = req.body as {
      username: string,
      password: string
    }

    const created = await prisma.user.create({
      data: {
        name: body.username,
        password: bcrypt.hashSync(body.password, 10)
      }
    })

    res.json({
      message: 'success'
    })
  })