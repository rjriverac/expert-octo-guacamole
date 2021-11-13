import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

const NftForm = ({ handleSubmit, handleChange, formData, errors, buttonText }) => {

  return (
    <>
      <h1>Hello world</h1>
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

        <Form.Field>
          <label>Category</label>
          <input 
            placeholder='select a category for your NFT'
            name='category'
            value={formData.category}
            onChange={handleChange}
          />

          <Form.Select>
            <option value={formData.category} name='art'>Art</option>
          </Form.Select>
        </Form.Field>

        <Button type='submit'>{buttonText}</Button>
      </Form>
    </>
  )
}
export default NftForm