/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, Grid, Image, Header, Container, Segment, Card, Icon, Label, Tab, List, Dimmer, Loader } from 'semantic-ui-react'
import { getTokenFromLocalStorage } from './helpers/auth'
import ProductCard from './ProductCard'

const ProfileTab = () => {

  const token = getTokenFromLocalStorage()

  const [userInfo, setuserInfo] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/profile',
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        setuserInfo(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])


  const panes = [
    { menuItem: 'Owned', render: () => <Tab.Pane>
      <Card.Group centered>
        {userInfo.owned ?
          userInfo.owned.map((item, index) => (
            <ProductCard
              key={index}
              item={item}
            />
          )
          )
          :
          <Dimmer inverted active>
            <Loader content='Loading' />
          </Dimmer>
        }
      </Card.Group>
    </Tab.Pane> },
    {
      menuItem: 'Cart', render: () => <Tab.Pane>
        <Card.Group>
          <h1>cart will go here</h1>
        </Card.Group>
      </Tab.Pane>
    }
  ]

  return (
    <Grid.Column>
      <h3>{userInfo.image}</h3>
      <Tab panes={panes}/>
    </Grid.Column>
  )
}









export default ProfileTab