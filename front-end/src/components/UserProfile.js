/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Grid, Image, Header, Container, Segment, Card, Icon, Label, Tab } from 'semantic-ui-react'
import ProfileTab from './ProfileTab'

const UserProfile = () => {


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
                User Name
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Joined Nov 2021
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
        </Grid>
        <Container >
          <ProfileTab />
        </Container>
      </div>
    </div>
  )

}

export default UserProfile