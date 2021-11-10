/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('/api/register', formData)
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (event) => {
    const newData = { ...formData, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    setFormData(newData)
    setErrors(newErrors)
  }

  return (
    <>
      <Container>

        <Header 
          as='h1'
          content='Register'
          textAlign='center'
        />

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Username</label>
            <input 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='Enter a username'
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange} 
              placeholder='Enter password'
              type="password"
            />
          </Form.Field>
          <Form.Field>
            <label>Re-Enter Password</label>
            <input
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange} 
              placeholder='Enter password again'
              type="password"
            />
          </Form.Field>
          <Button type='submit'>Click to Register!</Button>
        </Form>

      </Container>
    </>
  )
}
export default Register