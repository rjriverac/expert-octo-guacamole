/* eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Divider, Grid, Header, Icon, Image, Label, Placeholder, Segment, Table } from 'semantic-ui-react'
import PricingDetails from './PricingDetail'
import { getTokenFromLocalStorage,getPayload } from './helpers/auth'


const ProductDetail = () => {
  const { id } = useParams()
  const [item,setItem] = useState(null)
  // const token = getTokenFromLocalStorage()
  const [added,setAdded] = useState(false)

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }
  const [thecart,settheCart] = useState()


  useEffect(() => {
    const getData = async() => {
      try {
        const { data } = await axios.get(`/api/all/${id}`)
        setItem(data)
      } catch (error) {
        console.log(error)
      }
    }
    const getUser = async () => {
      try {
        const { data: { cart } } = await axios.get('/api/profile',
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
          }
        ) 
        settheCart(cart)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    getUser()
  },[id])

  useEffect(() => {
    if (thecart) {
      if (thecart.map(item=> item.item).filter(item => item === id).length) {
        setAdded(true)
      } else setAdded(false)
    }
  },[thecart])


  // console.log('added',thecart.map(item=> item.item).filter(item => item === id).length)

  const handleClick = async () => {
    if (!added){
      try {
        const addToCart = await axios.put('/api/profile/cart',
          {
            'cart': {
              item
            }
          },
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
          })
        setAdded(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  
  return (
    
    <>
      <Header
        as='h1'
        content='Token Detail'
        textAlign='center'
      />
      <Grid  
        columns={2}
        container={true}
        stackable
        relaxed={'very'}
      >
        <Grid.Row>
          <Grid.Column>
            {item ? 
              <Image
                src={item.image}
                size='large'
                rounded
                inline
              />
              :
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
              </Placeholder>
            }
          </Grid.Column>
          <Grid.Column>
            <Placeholder>
              <Segment raised>
                
                <PricingDetails { ...item }/>
              </Segment>
              <Divider horizontal/>
              <Segment raised>
                <Button
                  className={!added ? 'positive' : 'disabled' }
                  animated 
                  fluid
                  color='red'
                  onClick={handleClick}
                >
                  <Button.Content visible>{!added ? 'Add to Cart' : 'Already in Cart'}</Button.Content>
                  <Button.Content hidden>
                    <Icon name='shopping cart' />
                  </Button.Content>
                </Button>
              </Segment>
            </Placeholder>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header
              as='h2'
              content={item && `${item.name}`}
              textAlign='justified'
            />
            <Segment raised attached compact>
              <Label attached='top'>Details</Label>
              <Table definition compact columns={2} color='grey'>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Contract ID</Table.Cell>
                    <Table.Cell>{item && item.token}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Current Owner</Table.Cell>
                    <Table.Cell>{item && item.owner.username}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Last Price</Table.Cell>
                    <Table.Cell>{item && item.transactions.slice(-1)[0].price}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
export default ProductDetail