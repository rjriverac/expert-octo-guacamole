/* eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Divider, Grid, Header, Image, Label, Placeholder, Segment, Table } from 'semantic-ui-react'

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
  console.log(item)
  return (
    
    <>
      <Header
        as='h1'
        content='Token Detail'
        textAlign='center'
      />
      <Grid 
        divided 
        columns={2}
        container={true}
        stackable
      >
        <Grid.Row>
          <Grid.Column>
            {item ? 

              <Image
                src={item.image}
                size='large'
              />
              :
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
              </Placeholder>
            }
          </Grid.Column>
          <Grid.Column>
            <Placeholder>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
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
            <Segment raised>
              <Label attached='top'>Details</Label>
              <Table definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={2}>Name</Table.Cell>
                    <Table.Cell>{item && item.name}</Table.Cell>
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