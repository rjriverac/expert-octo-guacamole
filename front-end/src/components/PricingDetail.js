/* eslint-disable no-unused-vars*/
import React, { PureComponent } from 'react'
import { Accordion } from 'semantic-ui-react'
import { LineChart,Line,XAxis,YAxis,CartesianGrid,ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

const PricingDetails = ({ transactions }) => {


  const priceData = transactions.filter(item => item.type === 'sale')

  // transactions.map(item => {
  //   const date = new Date(item.createdAt)
  //   const formattedDate = format(date, 'dd/mm/yy')
  //   const price = 
  // })

  console.log(priceData)
  return (
    <>
      <h1>hello world</h1>

    </>
  )
}

export default PricingDetails