import React, { useState } from 'react'
import { Button, Form, Icon, Header, Grid, Message, Image } from 'semantic-ui-react'
import axios from 'axios'
import { getTokenFromLocalStorage } from './helpers/auth'

const NftForm = () => {

  const token = getTokenFromLocalStorage()
  const [displayMessage, setMessage] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: ''
  })

  const [errors, setErrors] = useState(false)

  const handleChange = (event) => {
    const newFormData = { ...formData, available: false, [event.target.name]: event.target.value }
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
      setMessage(true)
    } catch (err) {
      console.log(err)
      setErrors(true)
      setMessage(false)
    }
    setFormData({ name: '', image: '', category: '' })
  }

  return (
    <div className='addnft' >
      <Grid each style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Row centered style={{ margin: '70px 50px', alignItems: 'center', justifyContent: 'space-around' }}>
          <Grid.Column width={4}>
            <Image className='animate__animated animate__bounceInRight animate__slow' size='massive' src='https://www.kraken.com/_assets/files/2019-01/kraken_body02_final_02/400.webp'></Image>
          </Grid.Column>
          <Grid.Column width={6} textAlign='center' style={{ margin: '10px', maxWidth: 800 }}>
            <Header className='animate__animated animate__bounceInLeft animate__slow'
              color='inverted'
              as='h1'
              content='Add your NFT here!'
              textAlign='center'
              style={{ marginBottom: '40px', textWeight: 'bold' }}
            />
            <Form size='big' inverted onSubmit={handleSubmit} success error className='animate__animated animate__bounceInLeft animate__slow'>
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
              <Form.Field>
                <label>Image <Icon name='image' /></label>
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
              {displayMessage ? (
                <Message
                  success
                  header='Added'
                  content='Your NFT has been added!'
                />
              ) : (errors && <Message
                error
                header='Uh Ho!'
                content='🆘 Something went wrong... Please try again later.'
              />
              )}
              <Button style={{ marginTop: '20px' }}type='submit' size='large' color='teal' animated='vertical'>
                <Button.Content hidden><Icon name='add' /></Button.Content>
                <Button.Content visible>Add my NFT!</Button.Content>
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
export default NftForm