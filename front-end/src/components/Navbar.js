/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Container,
  Image,
  Menu
} from 'semantic-ui-react'


const Navbar = () => {


  return (
    <Menu size='mini' inverted>
      <Container>
        <Menu.Item as='a' href='/' header>
          <Image style={{ marginRight: '10px' }} size='mini' src='https://i.imgur.com/QC1O8bP.png'/>
          <h1 style={{ marginTop: 'unset' }}>Tokenizer</h1>
        </Menu.Item>
        <Menu.Item as='a' href='/browse'>Browse</Menu.Item>
        <Menu.Item as='a' position='right' href='/register'>Register</Menu.Item>
        <Menu.Item as='a'>Login</Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar