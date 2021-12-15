import React from 'react'
import { Card, Divider, Icon, Image, Label } from 'semantic-ui-react'
import { format } from 'date-fns'
import 'animate.css'


const ProductCard = ({ index, item }) => {

  const transactions = item.transactions
  const date = new Date(transactions.slice(-1)[0].createdAt)
  const formattedDate = format(date, 'dd MMMM yy H: mm')
  const transactionText = transactions.slice(-1)[0].type
  const formattedText = transactionText.charAt(0).toUpperCase() + transactionText.slice(1)
  const address = item._id
  
  
  return (
    <Card  as='a' href={`/browse/${address}`} key={index} className='animate__animated animate__slideInRight animate__slow'>
      <Image 
        src={item.image}
        rounded
        size='large'
      />
      <Card.Content>
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>{item.category}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Label><Icon name='bitcoin'/>Price: {item.available ? item.currentPrice : 'Unlisted'}</Label>
        <Divider />
        <Label>
          <Icon name='barcode' />
          <Label.Detail>Last transaction: {formattedText} at {formattedDate}</Label.Detail>
        </Label>
      </Card.Content>
    </Card>
  )
}

export default ProductCard