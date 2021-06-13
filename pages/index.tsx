// pages/index.tsx
import axios from 'axios'
import React, { useRef } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getUserFromReq } from '../utils.server'
import { queryClient } from './_app'

async function submitLink(body: {
  title: string,
  url: string
}) {
  await axios.post(`/api/link`, body)
}

function SubmitLinkForm() {

  const $title = React.useRef(null)
  const $url = React.useRef(null)

  const submitLinkMutation = useMutation(submitLink, {
    onSuccess() {
      queryClient.invalidateQueries('fetchAllLinks')
    }
  })

  function onClickSubmit() {
    submitLinkMutation.mutate({ title: $title.current.value, url: $url.current.value })
  }

  return (
    <>
      <h2>Submit link</h2>
      <div>
        <label>URL: </label>
        <input ref={$url} type="text" />
      </div>
      <div>
        <label>Title: </label>
        <input ref={$title} type="text" />
      </div>

      <button disabled={submitLinkMutation.isLoading} onClick={onClickSubmit}>Submit</button>
    </>
  )
}

async function fetchAllLinks() {
  const result = await axios.get(`/api/link`)
  return result.data.data
}

function IndexPage(props: {
  user?: {
    name: string
  }
}) {

  const fetchAllLinksQuery = useQuery('fetchAllLinks', fetchAllLinks)

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

      <div>
        {fetchAllLinksQuery.isLoading && <div>Loading...</div>}
        {fetchAllLinksQuery.data?.map(link => {
          return (
            <div key={link.id}>
              <a href={link.url}>{link.title}</a>
            </div>
          )
        })}
      </div>
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