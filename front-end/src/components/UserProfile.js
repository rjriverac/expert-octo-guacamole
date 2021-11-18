import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Image, Header, Container } from 'semantic-ui-react'
import ProfileTab from './ProfileTab'
import { getTokenFromLocalStorage, userIsAuthenticated } from './helpers/auth'
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

  const isEmpty = (object) => Object.keys(object).length === 0

  return (
    <div className='browse'>
      <Container>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row style={{ margin: '60px 0px 30px 0'  }}>
            <Grid.Column floated='right' width={6}>
              <Image 
                className='animate__animated animate__rotateInDownLeft animate__slow' 
                circular 
                rounded 
                size='large' 
                src='https://static3.refinery29.com/bin/entry/7ba/x/1058234/8boqnt6yswk.jpg' 
              />
            </Grid.Column>
            <Grid.Column className='animate__animated animate__rotateInDownRight animate__slow' width={6}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                {!isEmpty(userInfo) && userInfo.username}
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {!isEmpty(userInfo) && (() => {
                  const date = new Date(userInfo.createdAt)
                  const formattedDate = format(date, 'dd MMM yyyy')
                  return `Member since ${formattedDate}`
                })()}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={18}>
              {userIsAuthenticated() ?
                <ProfileTab
                  {...userInfo}
                />
                :
                <h1>Please log in</h1>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )

}

export default UserProfile