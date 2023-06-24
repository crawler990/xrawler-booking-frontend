import React, { useState } from 'react'
import { CAlert } from '@coreui/react'
import showcase from '../assets/images/showcase.jpg'
import '../css/Login.css'
import AuthService from 'src/services/AuthService'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [view, changeView] = useState('login')
  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()
    const result = await AuthService.login(credentials.username, credentials.password)
    console.log(result)
    result.value ? navigate('/dashboard', { replace: true }) : setLoginError(result.data)
  }

  const signup = async (event) => {
    event.preventDefault()
    const result = await AuthService.signup(
      credentials.email,
      credentials.username,
      credentials.password,
    )
    result.value ? navigate('/dashboard', { replace: true }) : setLoginError(result.data)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prevcredentials) => ({ ...prevcredentials, [name]: value }))
  }

  return (
    <div className="login">
      <div className="row">
        <div className="col-6">
          {loginError && (
            <CAlert color="danger" dismissible onClose={() => setLoginError('')}>
              {loginError}
            </CAlert>
          )}
          {view === 'login' ? (
            <form onSubmit={login}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username or Email
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="check" />
                <label className="form-check-label" htmlFor="check">
                  Remember Me
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p className="text-center mt-3">
                Don&apos;t have an account?
                <span
                  style={{ cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => changeView('signup')}
                >
                  {' '}
                  Create one.
                </span>{' '}
              </p>
            </form>
          ) : (
            <form onSubmit={signup}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="check" />
                <label className="form-check-label" htmlFor="check">
                  Remember Me
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
              <p className="text-center mt-3">
                Already have an account?
                <span
                  style={{ cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => changeView('login')}
                >
                  {' '}
                  Login here.{' '}
                </span>
              </p>
            </form>
          )}
        </div>
        <div className="col-6">
          <img src={showcase} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login
