import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'

import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isPending} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    // useLogin hook
    login(email, password)
  }
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
    <h2>Login</h2>
    <label>
      <span>Email:</span>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
    </label>
    <label>
      <span>Password:</span>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
    </label>
    {!isPending && <button className='btn'>Login</button>}
    {isPending && <button className='btn' disabled>loading</button>}
    {error && <div className="error">{error}</div>}
  </form>
  )
}
