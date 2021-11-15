import React, { useState } from 'react'
import { Button, Form, Icon, Header, Container } from 'semantic-ui-react'
import axios from 'axios'
import { getTokenFromLocalStorage } from './helpers/auth'

const NftForm = () => {

  const token = getTokenFromLocalStorage()
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    category: ''
  })


  const handleChange = (event) => {
    const newFormData = { ...formData, available: true, [event.target.name]: event.target.value }
    console.log('NEW FORM DATA ->', newFormData)
    console.log(event.target.value)
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/all',
        formData, {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <>
      <Container>
        <Header 
          as='h1'
          content='Add your NFT here!'
          textAlign='center'
        />
        <Form size='big' onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name </label>
            <input 
              required
              placeholder='name your NFT'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Field>

          {errors.name && <p>{errors.name}</p>}

          <Form.Field>
            <label>Image <Icon name='image'/></label>
            <input 
              required
              placeholder='image of your NFT'
              name='image'
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Field>
            
          <Form.Field label='Category' name='category' control='select' onChange={handleChange}>
            <option value='' disabled selected>Choose a category</option>
            <option value='Art'>Art</option>
            <option value='Cards'>Cards</option>
            <option value='Collectibles'>Collectibles</option>
            <option value='Sports'>Sports</option>
            <option value='Utility'>Utility</option>
            <option value='Virtual Worlds'>Virtual Worlds</option>
          </Form.Field>

          {/* {handleSubmit ? (
            <Message 
              success
              header='Added'
              content='Your NFT has been added!'
            />
          ) : (<p>Enter something</p>)
          } */}

          <Button type='submit'>Add my NFT!</Button>
        </Form>
      </Container>
    </>
  )
}
export default NftForm