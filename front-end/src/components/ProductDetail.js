import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tab, Button, Grid, Header, Icon, Image, Label, Placeholder, Segment, Table, Container, Message } from 'semantic-ui-react'
import PricingDetails from './PricingDetail'
import { getTokenFromLocalStorage, userIsAuthenticated, userIsOwner } from './helpers/auth'
import { useHistory } from 'react-router-dom'
import NftEdit from './NftEdit'
import { format } from 'date-fns'


const ProductDetail = () => {
  const { id } = useParams()
  const [item,setItem] = useState({})
  const [added,setAdded] = useState(false)
  const history = useHistory()


  const [thecart,settheCart] = useState()
  const isEmpty = (object) => Object.keys(object).length === 0

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
      if (userIsAuthenticated()) {
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


  const handleClick = async () => {
    if (!userIsAuthenticated()) {
      history.push('/login')
    }
    if (!added){
      try {
        await axios.put('/api/profile/cart',
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

  const panes = [
    {
      menuItem: 'Price History', render: () => (
        <Tab.Pane>
          {
            !isEmpty(item) ? 
              <PricingDetails item={ item }/>
              :
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
              </Placeholder>
          }
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Edit Details', render: () => (
        <Tab.Pane>
          { userIsOwner(item.owner.id) ?
            <NftEdit
              {...item}
              id={id}
            />
            :
            <Message  
              error
              icon
            >
              <Icon name='meh outline' />
              <Message.Content>
                <Message.Header>
                  Permission Denied!
                </Message.Header>
                You do not have permission to edit this NFT.
              </Message.Content>
            </Message>
          }
        </Tab.Pane>
      )
    }
  ]


  
  return (
    
    <>
      <Header
        className='animate__animated animate__bounceInDown animate__slow'
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
          <Grid.Column className='animate__animated animate__bounceInLeft animate__slow'>
            {!isEmpty(item) ? 
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
          <Grid.Column className='animate__animated animate__bounceInRight animate__slow'>
            <Container>
              <Tab menu={{ pointing: true, secondary: true }} panes={panes}/>
            </Container>          
            { !isEmpty(item) &&
              (!userIsOwner(item.owner.id) && (item.available === true) &&
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
                  </Segment>)
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ margin: '10px' }}>
          <Grid.Column className='animate__animated animate__bounceInLeft animate__slow'>
            <Header
              as='h2'
              content={!isEmpty(item) && `${item.name}`}
            />
            <Segment raised attached compact>
              <Label attached='top'>Details</Label>
              <Table definition compact columns={2} color='grey'>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Contract ID</Table.Cell>
                    <Table.Cell>{!isEmpty(item) && item.token}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Current Owner</Table.Cell>
                    <Table.Cell>{!isEmpty(item) && item.owner.username}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Last Transaction</Table.Cell>
                    <Table.Cell>
                      {(()=> {
                        if (isEmpty(item)) return
                        const date = new Date(item.transactions.slice(-1)[0].createdAt)
                        const formattedDate = format(date, 'do MMMM yy H:mm OOOO')
                        const transactionText = item.transactions.slice(-1)[0].type
                        const formattedText = transactionText.charAt(0).toUpperCase() + transactionText.slice(1)
                        return `${formattedText} at ${formattedDate}`
                      })()}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Last Price</Table.Cell>
                    <Table.Cell>{!isEmpty(item) && <Icon name='bitcoin'/>}{!isEmpty(item) && item.transactions.slice(-1)[0].price}</Table.Cell>
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