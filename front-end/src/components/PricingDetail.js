import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, Tooltip } from 'recharts'
import { format } from 'date-fns'

const PricingDetails = ({ item }) => {


  const dataArray = item.transactions.filter(item => item.type === 'sale').map(sale => {
    const date = new Date(sale.createdAt)
    const formattedDate = format(date, 'dd/MM/yy hh:mm')
    const price = sale.price
    return { date: formattedDate, price: price }
  })


  return (
    <Segment style={{ width: '100%', height: 380 }} textAlign='center'>
      {dataArray.length ?
        <ResponsiveContainer>
          <AreaChart
            data={dataArray}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 20
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='price' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
        </ResponsiveContainer>
        :
        <Header as='h2'>No transactions yet!</Header>
      }
    </Segment>

  )
}

export default PricingDetails