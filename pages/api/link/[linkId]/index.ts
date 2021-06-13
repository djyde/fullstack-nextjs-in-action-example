import {
  apiHandler,
  authMiddleware,
  linkCreatorGuard,
  prisma,
} from "../../../../utils.server";

export default apiHandler().put(
  authMiddleware(),
  linkCreatorGuard((req) => req.query.linkId),
  async (req, res) => {
    const body = req.body as {
      title?: string;
      url?: string;
    };

    await prisma.link.update({
      where: {
        id: req.query.linkId,
      },
      data: {
        title: body.title,
        url: body.url,
      },
    });

    res.json({
      message: "success",
    });
  }
);
