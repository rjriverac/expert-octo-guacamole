/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Grid, Image, Header, Container, Segment, Card, Icon, Label, Tab, List } from 'semantic-ui-react'


const panes = [
  {
    menuItem: 'Collected',
    pane: { key: 'tab1', content: 'Here comes what NFT the User has Ourchased', size: 'massive' }
  },
  {
    menuItem: 'Tab 2',
    pane: {
      key: 'tab2',
      content: 'This tab has center-aligned text',
      textAlign: 'center'
    }
  },
  {
    menuItem: 'Tab 3',
    pane: {
      key: 'tab3',
      content: (
        <div>
          This tab contains a <Label>JSX</Label> element
        </div>
      )
    }
  }
]

const ProfileTab = () => (
  <Tab panes={panes} renderActiveOnly={false} />
)


export default ProfileTab