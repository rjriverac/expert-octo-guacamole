/* eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Header, Image, Label, Placeholder, Segment, Table } from 'semantic-ui-react'
import PricingDetails from './PricingDetail'

const ProductDetail = () => {
  const { id } = useParams()
  const [item,setItem] = useState(null)


  useEffect(() => {
    const getData = async() => {
      try {
        const { data } = await axios.get(`/api/all/${id}`)
        setItem(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[id])

  
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
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
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