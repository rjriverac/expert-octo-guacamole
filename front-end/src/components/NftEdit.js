/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Container, Form, Message } from 'semantic-ui-react'
import { getTokenFromLocalStorage } from './helpers/auth'
import axios from 'axios'
import { useParams } from 'react-router-dom'



const NftEdit = (_item) => {

  const { id } = useParams()
  const [displayMessage, setMessage] = useState(false)
  const [formData, setFormData] = useState({
    available: undefined,
    currentPrice: undefined
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('NEW FORM DATA ->', newFormData)

    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/all/${id}`,
        formData, {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
        }
      )
    } catch (err) {
      console.log(err.response.data)
    }
    setMessage(true)
    setFormData({ available: undefined, currentPrice: undefined })
  }

  console.log(id)
  return (
    <Container>
      <Form onSubmit={handleSubmit} success>
        <Form.Field required label='List for Sale?' name='available' control='select' onChange={handleChange}>
          <option as='Dropdown Header'>Please select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Field>
        <Form.Field>
          <Form.Field 
            label='Input your sale price' 
            control='input' 
            name='currentPrice'
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Field>

        {displayMessage ? (
          <Message 
            success
            header='Price Updated!'
            content='Your NFT has now been listed for sale'
          />
        ) : '' }
        <Button type='submit'>Update</Button>
      </Form>

    </Container>
  )
}

export default NftEdit