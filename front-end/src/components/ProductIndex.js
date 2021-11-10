import React from 'react'
import { Card, Container, Dimmer, Grid, Loader, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { useState,useEffect } from 'react'

import ProductCard from './ProductCard'

const ProductIndex = () => {

  const [nft,setNft] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/all')
        if (!data) throw new Error()
        setNft(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[])

  return (
    <Container>
      <Grid columns='equal' divided>
        <Grid.Column width={3}>
          <Segment>
            <Container text>filters will go here</Container>
          </Segment>
        </Grid.Column>
        <Grid.Column width={13} color='teal'>
          <Card.Group>
            { nft.length ? 
              nft.map((item,index) => (
                <ProductCard
                  key={ index }
                  item = { item }
                />
              )
              )
              :
              <Dimmer inverted active>
                <Loader content='Loading'/>
              </Dimmer>
            }
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
export default ProductIndex