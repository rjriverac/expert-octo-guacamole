/* eslint-disable no-unused-vars */ 
import React from 'react'
import { Segment, Grid, Button, Icon, Divider, Container, Header } from 'semantic-ui-react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const Home = () => {
  return (
    <>
      <Container>
        <Segment inverted>
          <Header 
            as='h1'
            content='Welcome to Tokenizer!'
            textAlign='center'/>
        </Segment>
        
        <Header
          as='h3'
          content='Discover the world of NFTs'
          textAlign='center'
        />

        <Container textAlign='center'>
          <CarouselProvider 
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
          >
            <Slider>
              <Slide index={0}>I am the first slider.</Slide>
              <Slide index={1}>I am the second slider.</Slide>
              <Slide index={2}>I am the third slider.</Slide>
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </CarouselProvider>
        
        </Container>

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

        <Grid columns={2}>
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