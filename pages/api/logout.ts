import { apiHandler } from "../../utils.server";
import cookie from 'cookie'

export default apiHandler()
  .get(async (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('token', 'deleted', {
      httpOnly: true,
      path: '/'
    }))

    res.redirect('/')
  })
