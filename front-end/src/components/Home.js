/* eslint-disable no-unused-vars */ 
import React from 'react'
import { Segment, Grid, Image, Button, Icon, Divider, Container, Header } from 'semantic-ui-react'

const Home = () => {
  return (
    <>
      <Container>
        <Segment inverted>
          <Header 
            as='h1'
            content='Welcome to Home!'
            textAlign='center'/>
        </Segment>
        
        <Header
          as='h3'
          content='Discover the world of NFTs'
          textAlign='center'
        />
        <Container textAlign='center'>
          <Button as='a' href='/browse'>
            <Icon name='search'/>
            Browse
          </Button>  
          <Button as='a' href='/login'>
            <Icon name='user'/>
            Login
          </Button>
        </Container>

        <Divider hidden/>

        <Grid columns={2} each>
          <Grid.Column>
            <Segment>
              <Header 
                as='h2'
                content='Trending...'
              />
            </Segment>  
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <Header 
                as='h2'
                content='Newest'
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}

export default Home