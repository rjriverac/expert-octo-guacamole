import React from 'react'
import { Card, Container, Dimmer, Grid, Loader, Menu, Dropdown, Icon, Button } from 'semantic-ui-react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import Sound, { handleSongPlaying,handleSongLoading,handleSongFinishedPlaying } from 'react-sound'
import Music from '../assets/elevator-Music.opus'

const ProductIndex = () => {

  const options = [
    { key: 1, text: 'Low to High', value: 1, icon: 'sort amount down' },
    { key: 2, text: 'High to Low', value: 2, icon: 'sort amount up' }

  ]
  const category = [
    { key: 1, text: 'Art', value: 'Art', icon: 'paint brush' },
    { key: 2, text: 'Cards', value: 'Cards', icon: 'vcard' },
    { key: 3, text: 'Collectibles', value: 'Collectibles', icon: 'briefcase' },
    { key: 4, text: 'Sports', value: 'Sports', icon: 'football ball' },
    { key: 5, text: 'Utility', value: 'Utility', icon: 'game' },
    { key: 6, text: 'Virtual Worlds', value: 'Virtual Worlds', icon: 'computer' }

  ]
  const [nft, setNft] = useState([])
  const [filteredNfts, setFilteredNfts] = useState([])
  const [isPlaying,setIsPlaying] = useState(false)

  const handleDropDownCategory = (_event, data) => {
    if (!data.value) {
      setFilteredNfts([...nft])
    } else {
      const filterArray = nft.filter(nft => {
        return nft.category === data.value
      })
      setFilteredNfts(filterArray)
    }
  }

  const handleDropDownPrice = (_event, data) => {
    const workingArray = [...filteredNfts]
    if (data.value === 1) {
      const sortedArray = workingArray.sort((a, b) => a.currentPrice - b.currentPrice)
      setFilteredNfts(sortedArray)
    } else if (data.value === 2) {
      const sortedArray = workingArray.sort((a, b) => b.currentPrice - a.currentPrice)
      setFilteredNfts(sortedArray)
    } else setFilteredNfts([...nft])
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/all')
        if (!data) throw new Error()
        setNft(data)
        setFilteredNfts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])


  return (
    
    <Container>
      <Grid columns='two'>
        <Grid.Row>
          <Grid.Column className='animate__animated animate__slideInLeft' width={3} textAlign='left'>
            <Container >
              <Grid.Column >
                <h1 style={{ margin: '10px 0em' }}> <Icon name='filter' size='small'></Icon>Filters</h1>
              </Grid.Column>
            </Container>
            <Container className='animate__animated animate__slideInLeft' >
              <Menu compact style={{ margin: '10px 0em' }}>
                <Dropdown placeholder='By Category' clearable onChange={handleDropDownCategory} options={category} simple item />
              </Menu>
              <Menu compact>
                <Dropdown placeholder='By Price' clearable onChange={handleDropDownPrice} options={options} simple item />
              </Menu>
            </Container>
            <Sound
              url={Music}
              playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
              playFromPosition={300}
              onLoading={handleSongLoading}
              onPlaying={handleSongPlaying}
              onFinishedPlaying={handleSongFinishedPlaying}
              loop={true}
            />
            <Button size='small' color='violet' icon toggle active={isPlaying} circular style={{ margin: '5px' }}
              onClick={()=>setIsPlaying(!isPlaying) }
            >
              <Icon name={!isPlaying ? 'music' : 'mute'} />
            </Button>
          </Grid.Column>
          <Grid.Column style={{ marginBottom: '10px' }} width={13} className='browse' floated='right'  >
            <Card.Group className='animate__animated animate__slideInRight' style={{ justifyContent: 'center' }}>
              {filteredNfts.length ?
                filteredNfts.map((item, index) => (
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}
export default ProductIndex