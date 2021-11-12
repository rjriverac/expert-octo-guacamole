/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { getPayload } from './helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Container,
  Image,
  Menu,
  Icon,
  Button,
  Item
} from 'semantic-ui-react'


const Navbar = () => {

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {

  }, [location.pathname])

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <Menu color='grey' secondary inverted size='large' >
      <Container>
        <Menu.Item header as='a' href='/'>
          <Image style={{ marginRight: '10px' }} size='mini' src='https://i.imgur.com/QC1O8bP.png'/>
          <h3 style={{ marginTop: 'unset' }}>Tokenizer</h3>
        </Menu.Item>
        <Menu.Item as='a' href='/browse'>Browse</Menu.Item>
        {!userIsAuthenticated() ? 
          <>
            <Menu.Item position='right'><Button as='a' basic inverted href='/register'>Register</Button></Menu.Item>
            <Menu.Item><Button as='a' basic inverted href='/login'>Login</Button></Menu.Item>
          </>
          :
          <>
            <Menu.Item position='right' as='a' onClick={handleLogout}>Log Out</Menu.Item>
            <Menu.Item as='a' href='/profile'><Icon name='user circle' size='large' /></Menu.Item>
          </>
        }
        
      </Container>
    </Menu>
  )
}

export default Navbar