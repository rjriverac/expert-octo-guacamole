import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Image, Header, Container } from 'semantic-ui-react'
import ProfileTab from './ProfileTab'
import { getTokenFromLocalStorage,getPayload } from './helpers/auth'
import { format } from 'date-fns'

const UserProfile = () => {

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

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  const isEmpty = (object) => Object.keys(object).length === 0

  return (
    <div>
      <div style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          {/* <Icon name='share alternate square' size='big' color='violet' floated='right' ></Icon> */}
          <Grid.Row>
            <Grid.Column floated='right' width={6}>
              <Image circular rounded size='large' src='https://static3.refinery29.com/bin/entry/7ba/x/1058234/8boqnt6yswk.jpg' />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                { !isEmpty(userInfo) && userInfo.username}
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                { !isEmpty(userInfo) && (() => { 
                  const date = new Date(userInfo.createdAt)
                  const formattedDate = format(date, 'dd MMM yyyy')
                  return `Member since ${formattedDate}`
                })() }
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
        </Grid>
        <Container >
          {userIsAuthenticated() ? 
            <ProfileTab
              {...userInfo}
            />
            :
            <h1>Please log in</h1>
            /* // ! just put this in as a placeholder, we can refactor/add to this */
          }
          
          
        </Container>
      </div>
    </div>
  )

}

export default UserProfile