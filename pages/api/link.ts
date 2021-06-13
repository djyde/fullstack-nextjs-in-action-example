import { apiHandler, authMiddleware, prisma } from "../../utils.server";

export default apiHandler()
  .get(async (req, res) => {
    const links = await prisma.link.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json({
      data: links
    })
  })
  .post(authMiddleware(), async (req, res) => {
    const body = req.body as {
      url: string,
      title: string
    }

    const user = req.user

    await prisma.link.create({
      data: {
        url: body.url,
        title: body.title,
        creatorName: user.name
      }
    })

    res.json({
      message: 'Success'
    })
  })