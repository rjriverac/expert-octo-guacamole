/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Container,
  Image,
  Menu
} from 'semantic-ui-react'


const Navbar = () => {


  return (
    <Menu size='large' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image style={{ marginRight: '10px' }} circular size='tiny' src='https://i.insider.com/5d001393b7640142011751c9?width=1000&format=jpeg&auto=webp'/>
        </Menu.Item>
        <Menu.Item as='a' href='/'>Home</Menu.Item>
        <Menu.Item as='a' href='/browse'>Browse</Menu.Item>
        <Menu.Item as='a' href='/register'>Register</Menu.Item>
        <Menu.Item as='a'>Login</Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar