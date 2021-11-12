/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, Grid, Image, Header, Container, Segment, Card, Icon, Label, Tab, List } from 'semantic-ui-react'
import { getTokenFromLocalStorage } from './helpers/auth'

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
  }, [token])
  console.log(userInfo)

  return (
    <Grid.Column>
      <Menu
        items={[
          { key: '1', name: 'link-1', content: 'Created' },
          { key: '2', name: 'link-2', content: 'Liked' },
          { key: '3', name: 'link-3', content: 'Bought' }
        ]}
        tabular
      />
      <h3>{userInfo.image}</h3>
    </Grid.Column>
  )
}









export default ProfileTab