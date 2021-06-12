import axios from "axios"
import { useRef } from "react"
import { useMutation } from "react-query"

function LoginForm() {
  return (
    <>
      <div>
        <label>Username: </label>
        <input type="text" />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" />
      </div>
      <button>Login</button>
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