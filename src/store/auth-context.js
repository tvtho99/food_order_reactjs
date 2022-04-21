import React, { useCallback, useEffect, useState } from 'react'

let logoutTimer

const AuthContext = React.createContext({
  token: '',
  email: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingDuration = adjExpirationTime - currentTime

  return remainingDuration
}

const retrieveStoredData = () => {
  const storedEmail = localStorage.getItem('email')
  const storedToken = localStorage.getItem('token')
  const storedExpirationTime = localStorage.getItem('expirationTime')

  const remainingDuration = calculateRemainingTime(storedExpirationTime)

  if (remainingDuration < 1000) {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    return null
  }

  return { email: storedEmail, token: storedToken, duration: remainingDuration }
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredData()

  let initialToken
  let initialEmail
  if (tokenData) {
    initialEmail = tokenData.email
    initialToken = tokenData.token
  }
  const [email, setEmail] = useState(initialEmail)
  const [token, setToken] = useState(initialToken)

  const useIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    setEmail(null)

    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, email, expirationTime) => {
    setToken(token)
    setEmail(email)
    localStorage.setItem('email', email)
    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)

    const remainingTime = calculateRemainingTime(expirationTime)
    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
      console.log(tokenData.duration)
    }
  }, [tokenData, logoutHandler])

  const contextValue = {
    token,
    email,
    isLoggedIn: useIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
