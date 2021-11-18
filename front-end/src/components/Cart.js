import React, { useEffect, useState } from 'react'
import {  getTokenFromLocalStorage,getPayload } from './helpers/auth'
import axios from 'axios'
import { Button, Card, Container, Header, Icon, Image, Segment, List, Grid, Divider } from 'semantic-ui-react'


const Cart = () => {

  const token = getTokenFromLocalStorage()

  const [userInfo, setuserInfo] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { cart } } = await axios.get('/api/profile',
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        const cartItems = [...cart]
        const populated = await Promise.all(cartItems.map(async (item) => {
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
  }, [token])

  const handleRemoveOne = async (cartItem) => {
    try {
      const { data: { cart } } = await axios.delete('/api/profile/cart',
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { item: { _id: cartItem } }
        }
      )
      const populated = await Promise.all(cart.map(async (item) => {
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
      await axios.post('/api/profile/cart', {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setuserInfo([])
    } catch (error) {
      console.log(error)
    }
  }


  const handleCheckOut = async () => {
    let isError = false
    const currentUser = getPayload()
    await Promise.all(userInfo.map(async (nft)=> {
      try {
        await axios.put(`api/all/${nft._id}`,
          {
            owner: currentUser.sub,
            available: false,
            currentPrice: null,
            transactions: {
              type: 'sale',
              from: nft.owner._id,
              to: currentUser.sub,
              price: nft.currentPrice
            }
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
      } catch (error) {
        console.log(error)
        isError = true
      }
    }))
    if (!isError) handleClearCart()
  }

  return (


    <Grid divided className='cartpage'>

      <Grid.Row>
        <Container style={{ margin: '20px' }}>
          <Grid.Column >
            <Header dividing as='h2' className='animate__animated animate__lightSpeedInRight animate__slow'>
              <Icon name='cart' />
              Cart
            </Header>
            <List divided relaxed className='animate__animated animate__zoomInUp animate__slower'>
              {
                userInfo.map((cartItem, index) => (
                  <List.Item key={index} >
                    <Card.Content>
                      <Image
                        style={{ borderRadius: '10px' }}
                        floated='left'
                        size='small'
                        src={cartItem.image}
                      />
                      <Container>
                        <Card.Header
                          as='h2'>{cartItem.name}</Card.Header>
                      </Container>
                      <Container textAlign='left'>
                        <Card.Description style={{ marginTop: '10px' }}
                          as='h4'>
                          {`Price: ${cartItem.currentPrice}`}
                        </Card.Description>
                      </Container>
                    </Card.Content>
                    <Card.Content extra style={{}}>
                      <Container textAlign='right' className='animate__animated animate__zoomInDown animate__slower'>
                        <Button
                          negative
                          size='small'
                          compact
                          animated='fade'
                          onClick={(() => handleRemoveOne(cartItem._id))}
                        >
                          <Button.Content visible>
                            <Icon name='trash alternate outline' />
                            Remove Item
                          </Button.Content>
                          <Button.Content hidden>
                            <Icon name='arrow cart down' />
                          </Button.Content>
                        </Button>
                      </Container>
                    </Card.Content>
                  </List.Item>
                ))
              }
            </List>
            <Divider />
            <Segment compact floated='right'
              className='animate__animated animate__zoomInDown animate__slower'
              raised
              style={{ 'height': '65px', display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}
              textAlign='left'
            >
              <h5 style={{ display: 'inline-block', marginRight: '20px' }}>
                Total: <span style={{ fontWeight: 'bolder' }}>{(() => userInfo.reduce((acc, cur) => {
                  return acc + cur.currentPrice
                }, 0).toFixed(2))()}</span>
              </h5>
              <Button.Group
                floated='right'
              >
                <Button
                  negative
                  animated='fade'
                  onClick={handleClearCart}
                >
                  <Button.Content visible>
                    <Icon name='trash' />
                    Clear Cart
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow cart down' />
                  </Button.Content>
                </Button>
                <Button.Or></Button.Or>
                <Button
                  positive
                  animated='fade'
                  onClick={handleCheckOut}
                >
                  <Button.Content visible>
                    <Icon name='credit card outline' />
                    Confirm Purchase
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name='payment' />
                  </Button.Content>
                </Button>
              </Button.Group>
            </Segment>
          </Grid.Column>
        </Container>
      </Grid.Row>
    </Grid>
  )
}

export default Cart