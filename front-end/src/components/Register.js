/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Container, Form, Header, Icon, Message, Segment } from 'semantic-ui-react'
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
        <Segment textAlign='center' style={{ width: '70vw' }}>
      
          <Header 
            as='h1'
            content='Register'
          />

          <Form onSubmit={handleSubmit} size='big' success>
            <Form.Field>
              <label> <Icon name='user'/> Username </label>
              <input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder='Enter a username'
              />
            </Form.Field>
            {/* {errors.username && <p>Username is required</p>} */}
            <Form.Field>
              <label> <Icon name='mail'/> Email </label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
              />
            </Form.Field>
            <Form.Field>
              <label> <Icon name='lock'/> Password </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange} 
                placeholder='Enter password'
                type="password"
              />
            </Form.Field>
            <Form.Field>
              <label> <Icon name='lock'/> Re-Enter Password </label>
              <input
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange} 
                placeholder='Enter password again'
                type="password"
              />
            </Form.Field>

            {/* <Message 
              success
              header='Registration successful!'
              content='You may now login with the email you just signed up with'
            />  */}
            
            <Button color='teal' type='submit'>Click to Register!</Button>
          </Form>
          <Message color='yellow'>
            <Icon name='help' />
            already have an account? <a href='/login'>Login</a>
          </Message>
        </Segment>

      </Container>
    </>
  )
}
export default Register