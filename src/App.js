import './App.css'
import Home from './views/Home'
import isLoggedIn from './components/isLoggedIn'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { GH_PAGES_URL } from './config'

function App () {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')

  const pingBackend = () => {
    axios.get(GH_PAGES_URL).then(res => {
      setIsLoading(false)
    }).catch(err => {
      if (err.response.status !== 200) {
        pingBackend()
      } else {
        setIsLoading(false)
      }
    })
  }
  useEffect(() => {
    pingBackend()
  })

  return (
    isLoggedIn(Home, isLoading, setIsLoading, token, setToken)
  )
}

export default App
