/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Container, Form, Header, Icon, Message, Segment, Grid } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () => {

  const history = useHistory()
  const [displayMessage, setMessage] = useState(false)
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
      setTimeout(() => {
        history.push('/login')
      }, 2000)
    } catch (err) {
      console.log(err)
    }
    setMessage(true)
  }

  const handleChange = (event) => {
    const newData = { ...formData, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    setFormData(newData)
    setErrors(newErrors)
  }

  return (
    <div className='register'>
      <Grid each style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Row centered style={{ margin: '70px 50px', alignItems: 'center', justifyContent: 'space-around' }}>
          <Grid.Column width={10} textAlign='center' style={{ margin: '10px', maxWidth: 800, height: '40vh' }}>
            <Header
              color='inverted'
              as='h1'
              content='Register to Tokenizer!'
              size='huge'
            />
            <br />
            <br />
            <Form inverted onSubmit={handleSubmit} size='big' success>
              <Form.Group unstackable widths={2}>
                <Form.Input label='Username' iconPosition='right'>
                  
                  {/* <label> <Icon name='user' /> Username </label> */}
                  <input

                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Enter a username'
                  />
                  <Icon name='user' />
                </Form.Input>
                {/* {errors.username && <p>Username is required</p>} */}
                <Form.Input label='Email' iconPosition='right'>
                  {/* <label> <Icon name='mail' /> Email </label> */}
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter your email'
                  />
                  <Icon name='mail' />
                </Form.Input>
              </Form.Group>
              <Form.Group widths={2}>
            
              
                <Form.Input label='Password' iconPosition='right'>
                  {/* <label> <Icon name='lock' /> Password </label> */}
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter password'
                    type="password"
                  />
                  <Icon name='lock' />
                </Form.Input>
                <Form.Input label='Re-Enter Password' iconPosition='right'>
                  {/* <label> <Icon name='lock' /> Re-Enter Password </label> */}
                  <input
                    
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    placeholder='Enter password again'
                    type="password"
                  />
                  <Icon name='lock' />
                </Form.Input>
                
              </Form.Group>
              <br/>
              <Button size='big' color='teal' type='submit'>Click to Register!</Button>
              
              {displayMessage ? (
                <Message 
                  success
                  header='Registration successful!'
                  content='You will now be directed to the login page.'
                /> 
              ) : '' }

            </Form>
          </Grid.Column>
          {/* <Message color='yellow'>
            <Icon name='help' />
            already have an account? <a href='/login'>Login</a>
          </Message> */}
        </Grid.Row>
      </Grid>

    </div>
  )
}
export default Register