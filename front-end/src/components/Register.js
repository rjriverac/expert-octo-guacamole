import React, { useState } from 'react'
import { Button, Form, Header, Icon, Message, Grid } from 'semantic-ui-react'
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
  const [error, setError] = useState(false)

  const handleChange = (event) => {
    const newData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('/api/register', formData)
      setTimeout(() => {
        history.push('/login')
      }, 2000)
      setMessage(true)
    } catch (err) {
      console.log(err)
      setError(true)
      setMessage(false)
    }
  }


  

  return (
    <div className='register'>
      <Grid each style={{ height: '80vh', paddinBottom: '10px' }} verticalAlign='middle'>
        <Grid.Row centered style={{ marginBottom: '70px', alignItems: 'center', justifyContent: 'space-around' }}>
          <Grid.Column width={10} textAlign='center' style={{ maxWidth: 800, height: '40vh' }}>
            <Header className='animate__animated animate__fadeInTopLeft animate__slow'
              color='inverted'
              as='h1'
              content='Register to Tokenizer!'
              size='huge'
            />
            <br />
            <br />
            <Form inverted onSubmit={handleSubmit} size='big' success error>
              <Form.Group unstackable widths={2}>
                <Form.Input 
                  label='Username' 
                  iconPosition='right' 
                  className='animate__animated animate__fadeInTopLeft animate__slow'
                >  
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Enter a username'
                  />
                  <Icon name='user' />
                </Form.Input>
                <Form.Input 
                  label='Email' 
                  iconPosition='right' 
                  className='animate__animated animate__fadeInTopLeft animate__slow'
                >
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
                <Form.Input 
                  label='Password' 
                  iconPosition='right' 
                  className='animate__animated animate__fadeInBottomRight animate__slow'
                >
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter password'
                    type="password"
                  />
                  <Icon name='lock' />
                </Form.Input>
                <Form.Input
                  label='Re-Enter Password' 
                  iconPosition='right' 
                  className='animate__animated animate__fadeInBottomRight animate__slow'
                >
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
              <Button
                className='animate__animated animate__fadeInBottomRight animate__slow' 
                size='big' 
                color='teal' 
                type='submit'
              >
                Click to Register!
              </Button>
              {displayMessage ? (
                <Message 
                  success
                  header='Registration successful!'
                  content='You will now be directed to the login page.'
                />
              ) : (error && <Message 
                error
                header='Action Forbidden'
                content='Please check all fields have been entered correctly.'
              />) }
              
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
export default Register