import { getUserFromReq } from "../utils.server"

function UserPage(props: {
  user: {
    name: string
  }
}) {
  return (
    <>
      <div>
        Hello, {props.user.name}

        <div>
          <a href="/api/logout">Logout</a>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const user = await getUserFromReq(ctx.req)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  return {
    props: {
      user: {
        name: user.name
      }
    }
  }
}

export default UserPage