/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Grid, Image, Header, Container, Segment, Card, Icon, Label, Tab, List } from 'semantic-ui-react'
import { getTokenFromLocalStorage } from './helpers/auth'

const ProfileTab = (index, name) => (
  <Tab panes={panes} renderActiveOnly={false} />
)
const panes = [
  {
    menuItem: 'Collected',
    pane: { key: 'tab1', content: 'Here comes what NFT the User has Purchased', size: 'massive' }
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
          This tab contains a <Label>Liked</Label> element
        </div>
      )
    }
  }
]

console.log(getTokenFromLocalStorage())



export default ProfileTab