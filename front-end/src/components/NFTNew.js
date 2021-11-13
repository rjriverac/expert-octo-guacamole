import axios from 'axios'
import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import { getTokenFromLocalStorage } from './helpers/auth'
import NftForm from './NftForm'

const NftNew = () => {

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
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/all',
        formData, {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
        }
      )
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <>
      <Container>
        <NftForm 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          errors={errors}
        />
      </Container>
    </>
  )
}
export default NftNew