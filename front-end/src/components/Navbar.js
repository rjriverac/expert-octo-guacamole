/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Container,
  Image,
  Menu,
  Icon,
  Button,
  Item
} from 'semantic-ui-react'


const Navbar = () => {


  return (
    <Menu color='grey' secondary inverted size='large' >
      <Container>
        <Menu.Item header as='a' href='/'>
          <Image style={{ marginRight: '10px' }} size='mini' src='https://i.imgur.com/QC1O8bP.png'/>
          <h3 style={{ marginTop: 'unset' }}>Tokenizer</h3>
        </Menu.Item>
        <Menu.Item as='a' href='/browse'>Browse</Menu.Item>
        <Menu.Item as='a' href='/loggedin'>Loggedin</Menu.Item>
        <Menu.Item position='right'><Button as='a' basic inverted href='/register'>Register</Button></Menu.Item>
        <Menu.Item as='a' href='/login'><Icon name='user circle' size='large' /></Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar