import React, { Component } from 'react'
import { Menu, Grid, Image, Header, Container } from 'semantic-ui-react'

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

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
        </div>
        <Container>
          <Menu pointing secondary size='huge'>
            <Container style={{ justifyContent: 'center' }}>
              <Menu.Item textAlign='center'
                name='collected'
                active={activeItem === 'collected'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='created'
                active={activeItem === 'created'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='favourited'
                active={activeItem === 'favourited'}
                onClick={this.handleItemClick} />
            </Container>
          </Menu>
        </Container>
      </div>
    )
  }
}