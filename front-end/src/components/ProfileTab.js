import React from 'react'
import { Grid, Card, Tab, Dimmer, Loader } from 'semantic-ui-react'
import { userIsAuthenticated } from './helpers/auth'

import ProductCard from './ProductCard'

const ProfileTab = (user) => {

  const panes = [
    { 
      menuItem: 'Owned', render: () => (
        <Tab.Pane>
          <Card.Group centered>
            {user.owned ?
              user.owned.map((item, index) => (
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
        </Tab.Pane>
      ) 
    },
    {
      menuItem: 'About', render: () => ( 
        <Tab.Pane>
          <Card>
            <Card.Content>
              <Card.Header>
                {`User Id: ${user._id}`}
              </Card.Header>
              <Card.Meta>
                {`${user.owned.length} NFTs owned`}
              </Card.Meta>
              <Card.Description>
                {`Current Email: ${user.email}`}
              </Card.Description>
            </Card.Content>
          </Card>
        </Tab.Pane>
      )
    }
  ]
  return (
    <Grid.Column>
      <h3>{user.image}</h3>
      {userIsAuthenticated() && <Tab menu={{ vertical: true, tabular: true, pointing: true, secondary: true }} panes={panes}/>}
    </Grid.Column>
  )
}

export default ProfileTab