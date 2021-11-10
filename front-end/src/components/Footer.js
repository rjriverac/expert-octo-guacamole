/* eslint-disable no-unused-vars */
import React from 'react'
import { Segment, Grid, Image, Button, List, Icon, Divider, Container, Header } from 'semantic-ui-react'


const Footer = () => {

  return (
    <Segment inverted horizontal style={{ padding: '2em 0em 0 0' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header inverted as='h4' content='Get To Know Us' />
              <List link inverted>
                <List.Item as='a' href='https://github.com/gayatrirajgor'>Gayatri</List.Item>
                <List.Item as='a' href='https://github.com/rjriverac'>Ricardo</List.Item>
                <List.Item as='a' href='https://github.com/lukacspapp'>Lukacs</List.Item>
                <List.Item as='a'>Project <Icon name='github' size='large' /></List.Item>
                <List.Item as='a' href='https://sustainability.aboutamazon.com/modern-slavery-statement-2020.pdf'>UK Modern Slavery Statment</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header inverted as='h4' content='Make Money With Us' />
              <List link inverted>
                <List.Item as='a' href='/register'>Register</List.Item>
                <List.Item as='a' href='/login'>Login</List.Item>
                <List.Item as='a'>Upload Your Nft</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header inverted as='h4' content='Marketplace' />
              <List link inverted>
                <List.Item as='a' href='/browse'>All Nfts</List.Item>
                <List.Item as='a' href='/browse'>New</List.Item>
                <List.Item as='a'>Trending</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container textAlign='center'>
          <Segment inverted>
            <List horizontal relaxed style={{ padding: '10px 0em' }}>
              <List.Item>
                <List.Item as='a' href='https://twitter.com/home'><Icon name='twitter' size='big' color='blue' /></List.Item>
              </List.Item>
              <List.Item>
                <List.Item as='a' href='https://www.reddit.com/'><Icon name='reddit' size='big' color='orange' /></List.Item>
              </List.Item>
              <List.Item>
                <List.Item as='a' href='https://discord.com/'><Icon name='discord' size='big' color='violet' /></List.Item>
              </List.Item>
              <List.Item>
                <List.Item as='a' href='https://www.instagram.com/'><Icon name='instagram' size='big' color='yellow' /></List.Item>
              </List.Item>
              <List.Item>
                <List.Item as='a' href='https://www.facebook.com/'><Icon className='facebookicon' name='facebook' size='big' /></List.Item>
              </List.Item>
            </List>
            <p style={{ margin: '5px 0em 5px 0em' }}>© 2021, The Website Name.com, General Assembely Porject 3</p>
          </Segment>
        </Container>
      </Container>
    </Segment>
  )
}
export default Footer