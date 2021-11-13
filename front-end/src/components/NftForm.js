import React from 'react'
import { Button, Form, Icon, Header } from 'semantic-ui-react'

const NftForm = ({ handleSubmit, handleChange, formData, errors, buttonText }) => {

  return (
    <>
      <Header 
        as='h1'
        content='Add your NFT here!'
        textAlign='center'
      />
      <Form size='big' onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name </label>
          <input 
            placeholder='name your NFT'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Field>

        {errors.name && <p>{errors.name}</p>}

        <Form.Field>
          <label><Icon name='image'/> Image</label>
          <input 
            placeholder='image of your NFT'
            name='image'
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Field>

        <Form.Field label='Category' control='select'>
          <option name='art' value={formData.category}>Art</option>
          <option name='sports' value={formData.category}>Sports</option>
        </Form.Field>
       

        <Button type='submit'>{buttonText}</Button>
      </Form>
    </>
  )
}
export default NftForm