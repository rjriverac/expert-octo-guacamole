/* eslint-disable no-unused-vars */ 
import React, { useEffect, useState } from 'react'
import { Segment, Grid, Button, Icon, Divider, Container, Header, Card } from 'semantic-ui-react'
import { CarouselProvider, Image, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import axios from 'axios'

const Home = () => {

  const [nftData, setNftData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/all')
        if (!data) throw new Error()
        setNftData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

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
            totalSlides={4}
          >
            <Slider>
              {nftData.filter((_item, index) => index < 4).map((product, index) => {
                return (
                  <Slide key={index}>
                    <Card>
                      <Image src={product.image}></Image>
                      <Card.Content>
                        <Card.Header>{product.name}</Card.Header>
                      </Card.Content>
                    </Card>
                  </Slide>
                )
              })}

              {/* <Slide index={0}>
                <Card>
                  <Image src='https://lh3.googleusercontent.com/zm5apJVmz2qLkwBsUfd4ZYBuyatp3SDvWwZVQyj2waG2OKNjFbGfWkM9ohVPgF8w_G0I0oJj6rxOM4D2WqEgAl9GigAbrAhadLAL=w600' />
                  <Card.Content>
                    <Card.Header>I am the first slider.</Card.Header>
                    <Card.Meta>Displaying info</Card.Meta>
                  </Card.Content>

                </Card>
              </Slide>
              <Slide index={1}>I am the second slider.</Slide>
              <Slide index={2}>I am the third slider.</Slide> */}
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