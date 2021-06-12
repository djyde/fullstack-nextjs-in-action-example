import axios from "axios"
import { useRef } from "react"
import { useMutation } from "react-query"

async function login({ username, password }) {
  const result = await axios.post(`api/login`, {
    username, password
  })
  return result.data
}

function LoginForm() {

  const loginMutation = useMutation(login)

  const $username = useRef(null)
  const $password = useRef(null)

  function onClickLogin() {
    const username = $username.current.value
    const password = $password.current.value
    loginMutation.mutate({ username, password })
  }

  return (
    <>
      {loginMutation.error && <div style={{ color: 'red' }}>{loginMutation.error.response.data.message}</div>}
      <div>
        <label>Username: </label>
        <input ref={$username} type="text" />
      </div>
      <div>
        <label>Password: </label>
        <input ref={$password} type="password" />
      </div>
      <button onClick={onClickLogin}>Login</button>
    </>
  )
}

async function createAccount({ username, password }) {
  await axios.post(`/api/signup`, {
    username, password
  })
}

function SignUpForm() {

  const $username = useRef(null)
  const $password = useRef(null)

  const createAccountMutation = useMutation(createAccount, {
    onSuccess() {
      alert('created!')
    }
  })

  function onClickCreateAccount() {
    const username = $username.current.value
    const password = $password.current.value
    createAccountMutation.mutate({ username, password })
  }

  return (
    <>
      {createAccountMutation.error && <div style={{ color: 'red' }}>{createAccountMutation.error.response.data.message}</div>}
      <div>
        <label>Username: </label>
        <input ref={$username} type="text" />
      </div>
      <div>
        <label>Password: </label>
        <input ref={$password} type="password" />
      </div>
      <button disabled={createAccountMutation.isLoading} onClick={onClickCreateAccount}>create account</button>
    </>
  )
}

function LoginPage() {
  return (
    <>
      <div>
        <h1>Login</h1>
        <LoginForm />

        <h1>Create account</h1>
        <SignUpForm />
      </div>
    </>
  )
}

export default LoginPage