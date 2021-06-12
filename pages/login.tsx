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

function SignUpForm() {
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
      <button>create account</button>
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