import React from 'react'
import LoadSpinner from './LoadSpinner'
import Login from '../views/Login'
const loggedIn = (WrappedComponent, isLoading, setIsLoading, token, setToken) => {
  return (isLoading
    ? <LoadSpinner />
    : token
      ? <WrappedComponent token={token} />
      : <Login setIsLoading={setIsLoading} isLoading={isLoading} setToken={setToken} />
  )
}

export default loggedIn
