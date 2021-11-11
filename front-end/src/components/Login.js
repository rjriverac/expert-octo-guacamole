// /* eslint-disable no-unused-vars */ 
import React, { useState } from 'react'
import { Button, Form, Container, Header, Grid, Icon, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {

  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false)

  const setToken = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleChange = (event) => {
    const newData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      setToken(data.token)
      history.push('/browse')
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <Container>
      <Segment>
        <Grid columns={2} each style={{ height: '50vh' }} verticalAlign='middle' divided>
          <Grid.Column textAlign='center' style={{ maxWidth: 800 }}>
            <Header 
              as='h1'
              content='Login'
              textAlign='center'
            />

            <Form onSubmit={handleSubmit} size='big'>
              <Form.Field>
                <label> <Icon name='user'/> Email </label>
                <input 
                  name='email'
                  value={formData.email} 
                  placeholder='Enter your email' 
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label> <Icon name='lock'/> Password </label>
                <input
                  name="password"
                  value={formData.password} 
                  type='password' 
                  placeholder='Enter your password' 
                  onChange={handleChange}
                />
              </Form.Field>

              {error && <p>Your email or password is incorrect, please try again!</p> }
            
              <Button color='teal' type='submit' animated>
                <Button.Content visible>Log In!</Button.Content>
                <Button.Content hidden>
                  <Icon name='sign in'/>
                </Button.Content>
              </Button>
            </Form>
          </Grid.Column>

          <Grid.Column>
            <Header 
              as='h2'
              textAlign='center'
              content='Not registered yet? Click here to register!'
            />
            <Container textAlign='center'>
              <Button color='teal' as='a' href='/register' animated>
                <Button.Content visible>Register</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right'/>
                </Button.Content>
              </Button>
            </Container>
          </Grid.Column>

        </Grid>
      </Segment>
    </Container>
  )
}
export default Login