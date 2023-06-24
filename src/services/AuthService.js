import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { backendURL } from 'src/app.constants'

class AuthService {
  validateToken() {
    const token = localStorage.getItem('token')
    if (!token) return false
    const decode = jwtDecode(token)
    return Date.now() >= decode.exp * 1000 ? false : true
  }

  async login(emailorusername, password) {
    try {
      const response = await axios.post(backendURL + '/user/login', { emailorusername, password })
      localStorage.setItem('token', response.data)
      return { value: true }
    } catch (error) {
      console.log(error)
      return { value: false, data: error.response.data.message }
    }
  }

  async signup(email, username, password) {
    try {
      const response = await axios.post(backendURL + '/user/signup', { email, username, password })
      localStorage.setItem('token', response.data)
      return { value: true }
    } catch (error) {
      console.log(error)
      return { value: false, data: error.response.data.message }
    }
  }

  setHeaders() {
    const token = localStorage.getItem('token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    return options
  }

  removeToken() {
    localStorage.removeItem('token')
  }
}

export default new AuthService()
