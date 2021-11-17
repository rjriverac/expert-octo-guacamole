/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getPayload, getTokenFromLocalStorage } from './helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Image, Menu, Icon, Button, Item, Dropdown } from 'semantic-ui-react'
import axios from 'axios'

const Navbar = () => {

  const [getUsername, setUsername] = useState([])
  const history = useHistory()
  const location = useLocation()
  const token = getTokenFromLocalStorage()

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

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('api/profile',
  //         {
  //           headers: { Authorization: `Bearer ${token}` }
  //         })
  //       setUsername(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [token])

  return (

    <Menu color='violet' secondary inverted size='large'>
      <Container>
        <Menu.Item header as='a' href='/'>
          <Image style={{ marginRight: '10px' }} size='mini' src='https://i.imgur.com/yCvLNgk.png' />
          <h3 style={{ marginTop: 'unset' }}>Tokenizer</h3>
        </Menu.Item>
        <Menu.Item as='a' href='/browse'>Browse</Menu.Item>
        {!userIsAuthenticated() ?
          <>
            <Menu.Item position='right'><Button as='a' color='teal' href='/register'>Create an Account</Button></Menu.Item>
            <Menu.Item><Button as='a' inverted color='teal' href='/login'>Sign In</Button></Menu.Item>
          </>
          :
          <>
            <Menu.Item position='right' as='a' onClick={handleLogout}>Log Out</Menu.Item>
            <Menu.Item as='a' href='/cart'><Icon name='shopping cart' />Cart</Menu.Item>
            <Menu.Item><Icon name='user circle' size='large' />
              <Dropdown floating closeOnChange inline direction='left'>
                <Dropdown.Menu>
                  <Dropdown.Header>Signed in as: {getUsername.username} </Dropdown.Header>
                  <Dropdown.Item as='a' href='/profile' icon='user circle' text='Go to your profile' />
                  <Dropdown.Item as='a' href='/profile/add' icon='add' text='Add NFT' />
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