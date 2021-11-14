import React from 'react'
import { Grid, Card, Tab, Dimmer, Loader } from 'semantic-ui-react'

import ProductCard from './ProductCard'

const ProfileTab = (user) => {

  const panes = [
    { menuItem: 'Owned', render: () => (
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
      </Tab.Pane>) },
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
      <h3>{user.image}</h3>
      <Tab panes={panes}/>
    </Grid.Column>
  )
}

export default ProfileTab