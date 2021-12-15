import React, { PureComponent } from 'react'
import { Header, Segment, Icon, Message } from 'semantic-ui-react'
import { AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, Tooltip } from 'recharts'
import { format } from 'date-fns'

const PricingDetails = ({ item }) => {


  const dataArray = item.transactions.filter(item => item.type === 'sale').map(sale => {
    const date = new Date(sale.createdAt)
    const formattedDate = format(date, 'd MMM yy H:m')
    const price = sale.price
    return { date: formattedDate, price: price }
  })


  class CustomLabel extends PureComponent {
    render() {
      // eslint-disable-next-line no-unused-vars
      const { x, y, stroke, payload } = this.props
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={10} fontSize={10} fill="#666" transform="rotate(-25)">
            <tspan textAnchor='end' x='0'>{payload.value.split(' ').slice(0, 3).join(' ')}</tspan>
            <tspan textAnchor='end' x='0' dy='20'>{payload.value.split(' ').slice(-1).join('')}</tspan>
          </text>
        </g>
      )
    }
  }

  return (
    <Segment style={{ width: '100%', height: 390 }} textAlign='center'>
      {item.currentPrice ?
        <Header as='h3'>
          Current Price {<Icon name='bitcoin' />} {item.currentPrice}
        </Header>
        : <Message
          attached='top'
          size='mini'
          compact
          warning
          content='This NFT is not currently listed for sale by its owner'
        />
      }
      {dataArray.length ?
        <ResponsiveContainer>
          <AreaChart
            data={dataArray}
            margin={{
              top: 10,
              right: 15,
              left: 0,
              bottom: 40
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis interval={0} dataKey='date' tick={<CustomLabel />} />
            <YAxis dataKey='price' />
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