import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import LoadSpinner from '../components/LoadSpinner'
import { GH_PAGES_NAME, GH_PAGES_URL } from '../config'

function Login ({ setLoading, isLoading, setToken }) {
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(false)

  const handleChangeUsername = e => {
    if (e.target.value === '') {
      setUsernameError('Username is empty')
    } else {
      setUsernameError('')
    }
    setUsername(e.target.value)
  }

  const handleChangePassword = e => {
    if (e.target.value === '') {
      setPasswordError('Password is empty')
    } else {
      setPasswordError('')
    }
    setPassword(e.target.value)
    setUsernameError('')
  }

  const handleSubmit = () => setSubmit(true)

  const handleKeyDown = e => (e.code === 'Enter') && handleSubmit()

  useEffect(() => {
    if (submit) {
      axios.post(`${GH_PAGES_URL}/token`, {
        username,
        password
      }).then(async res => {
        setToken(res.data.token)
      }).catch(err => {
        if (err.response && err.response.status === 400) {
          setUsernameError('Check input values')
          setPasswordError('Check input values')
        } else {
          console.log(err)
        }
      })
      setSubmit(false)
    }
  }, [submit, username, password, setToken])

  return (
    <Container>
      <Row>
        <Col>
          <h2>
            GitHub Pages comments dashboard Login for {GH_PAGES_NAME}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className='md-4' />
        <Col style={{ border: '1px solid black', padding: '2em' }}>
          <Form.Group className='mb-3 needs-validation'>
            <Form.Label>Username</Form.Label>
            <div className='invalid-feedback d-block'>
              {usernameError}
            </div>
            <Form.Control className={(usernameError === '') ? ((username !== '') && 'is-valid') : 'is-invalid'} autoFocus value={username} onChange={handleChangeUsername} type='text' placeholder='Enter username...' />
            <Form.Label>Password</Form.Label>
            <div className='invalid-feedback d-block'>
              {passwordError}
            </div>
            <Form.Control className={(passwordError === '') ? ((password !== '') && 'is-valid') : 'is-invalid'} autoFocus onKeyDown={handleKeyDown} value={password} onChange={handleChangePassword} type='password' placeholder='Enter password...' />
          </Form.Group>
          {submit
            ? <LoadSpinner />
            : <Button onClick={handleSubmit} variant='success'>Login</Button>}
        </Col>
        <Col className='md-4' />
      </Row>
    </Container>
  )
}

export default Login
