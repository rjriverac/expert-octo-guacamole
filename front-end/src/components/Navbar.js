/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Container,
  Image,
  Menu,
  Icon,
  Button
} from 'semantic-ui-react'


const Navbar = () => {


  return (
    <Menu size='large' inverted>
      <Container>
        <Menu.Item as='a' href='/' header>
          <Image style={{ marginRight: '10px' }} size='mini' src='https://i.imgur.com/QC1O8bP.png'/>
          <h3 style={{ marginTop: 'unset' }}>Tokenizer</h3>
        </Menu.Item>
        <Menu.Item as='a' href='/browse'>Browse</Menu.Item>
        <Menu.Item as='a' position='right' href='/register'><Button as='a' href='/register'>Register</Button></Menu.Item>
        <Menu.Item as='a'><Icon name='user circle' size='large' /></Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar