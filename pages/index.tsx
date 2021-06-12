// pages/index.tsx
import React from 'react'
import { getUserFromReq } from '../utils.server'

function SubmitLinkForm() {
  return (
    <>
      <h2>Submit link</h2>
      <div>
        <label>URL: </label>
        <input type="text" />
      </div>
      <div>
        <label>Title: </label>
        <input type="text" />
      </div>
    </>
  )
}

function IndexPage(props: {
  user?: {
    name: string
  }
}) {

  return (
    <>
      <div>
        {props.user ? <>
          <span>Hi, {props.user.name}, </span>
          <a href="/api/logout">Logout</a>
        </> : <>
          <a href="/login">Login</a>
        </>}
      </div>

      {/* Only signed in user can see the submit link form */}
      {props.user && <div>
        <SubmitLinkForm />
      </div>}
    </>
  )
}

export async function getServerSideProps(ctx) {
  const user = await getUserFromReq(ctx.req)

  return {
    props: {
      user: user ? { name: user?.name } : null
    }
  }
}

export default IndexPage