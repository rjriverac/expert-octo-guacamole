/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {  getTokenFromLocalStorage } from './helpers/auth'
import axios from 'axios'
import { Button, Card, Container, Header, Icon, Image, Segment } from 'semantic-ui-react'


const Cart = () => {

  const history = useHistory()
  const token = getTokenFromLocalStorage()

  const [userInfo,setuserInfo] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { cart } } = await axios.get('/api/profile',
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        const cartItems = [...cart]
        const populated = await Promise.all(cartItems.map( async (item) => {
          try {
            const { data } = await axios.get(`/api/all/${item.item}`)
            return data
          } catch (error) {
            console.log(error)
          }
        }))
        setuserInfo(populated)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[token])

  console.log(userInfo)
  return (
    <>
      <Header 
        as='h1'
        size='large'
      >
        Cart
      </Header>
      <Container>
        <Card.Group
          doubling
          stackable
        >
          {
            userInfo.map((cartItem, index) => (
              <Card key={index}>
                <Card.Content>
                  <Image
                    floated='left'
                    size='mini'
                    src={cartItem.image}
                  />
                  <Card.Header>{cartItem.name}</Card.Header>
                  <Card.Description>
                    {`Price: ${cartItem.currentPrice}`}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    negative
                    size='small'
                    compact
                    animated='fade'
                  >
                    <Button.Content visible>
                      <Icon name='trash alternate outline'/>
                      Remove Item 
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow cart down'/>
                    </Button.Content>
                  </Button>
                </Card.Content>
              </Card>
            ))
          }

        </Card.Group>
      </Container>
      <Segment raised>
        Total: {(()=> userInfo.reduce((acc,cur) => {
          return acc + cur.currentPrice
        },0))()}
      </Segment>
    </>
  )
}

export default Cart