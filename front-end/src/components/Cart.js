import React, { useEffect, useState } from 'react'
import {  getTokenFromLocalStorage } from './helpers/auth'
import axios from 'axios'
import { Button, Card, Container, Header, Icon, Image, Segment } from 'semantic-ui-react'


const Cart = () => {

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

  const handleRemoveOne = async (cartItem) => {
    try {
      const { data: { cart } } = await axios.delete('/api/profile/cart',
        { 
          headers: { Authorization: `Bearer ${token}` },
          data: { item: { _id: cartItem } }
        }
      )
      const populated = await Promise.all(cart.map( async (item) => {
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

  const handleClearCart = async () => {
    try {
      await axios.post('/api/profile/cart',{},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setuserInfo([])
    } catch (error) {
      console.log(error)
    }
  }


  console.log(userInfo)
  return (
    <>
      <Header 
        as='h1'
        size='large'
      >
        Cart
      </Header>
      <Segment
        raised
        style={{ minHeight: '50vh' }}
      >

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
                      onClick={(() => handleRemoveOne(cartItem._id))}
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
      </Segment>
      <Segment
        raised
        style={{ 'height': '65px' }}
        textAlign='left'
      >
        <p style={{ display: 'inline-block' }}>
          Total: {(()=> userInfo.reduce((acc,cur) => {
            return acc + cur.currentPrice
          },0).toFixed(2))()}
        </p>
        <Button.Group
          floated='right'
        >
          <Button
            negative
            animated='fade'
            onClick={handleClearCart}
          >
            <Button.Content visible>
              <Icon name='trash'/>
              Clear Cart
            </Button.Content>
            <Button.Content hidden>
              <Icon name='arrow cart down'/>
            </Button.Content>
          </Button>

          <Button.Or></Button.Or>

          <Button
            positive
            animated='fade'

          >
            <Button.Content visible>
              <Icon name='credit card outline'/>
              Confirm Purchase
            </Button.Content>
            <Button.Content hidden>
              <Icon name='payment'/>
            </Button.Content>
          </Button>

        </Button.Group>
      </Segment>
    </>
  )
}

export default Cart