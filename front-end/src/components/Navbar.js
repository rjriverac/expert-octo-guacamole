/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { getPayload } from './helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Image, Menu, Icon, Button, Item, Dropdown } from 'semantic-ui-react'


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
            {/* <Dropdown icon='user circle' floating closeOnChange >
              <Dropdown.Menu>
                <Dropdown.Item as='a' icon='add' text='Add NFT'/>
              </Dropdown.Menu>
            </Dropdown> */}
            <Menu.Item><Icon name='user circle' size='large' />
              <Dropdown>
                <Dropdown.Menu>
                  <Dropdown.Item as='a' href='/profile' icon='user circle' text='Go to your profile'/>
                  <Dropdown.Item as='a' href='/profile/add' icon='add' text='Add NFT'/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </>
        }
        
      </Container>
    </Menu>
  )
}

export default Navbar