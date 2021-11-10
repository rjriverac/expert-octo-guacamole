import React from 'react'
import { Card, Container, Grid, Icon, Image, Label, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { useState,useEffect } from 'react'

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
              nft.map((item,index)=> {
                const transactions = item.transactions
                console.log('***',transactions.slice(-1)[0].type)
                return (
                  <Card key={index}>
                    <Image
                      src={item.image}
                      rounded
                      size='medium'
                    />
                    <Card.Content>
                      <Card.Header>{item.name}</Card.Header>
                      <Card.Meta>{item.category}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Label>
                        <Icon name='barcode' />
                        <Label.Detail>Last transaction: {transactions.slice(-1)[0].type} at {transactions.slice(-1)[0].createdAt}</Label.Detail> 
                      </Label>
                    </Card.Content>
                  </Card>
                )
              })
              :
              <h1>something went wrong</h1>
            }
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
export default ProductIndex