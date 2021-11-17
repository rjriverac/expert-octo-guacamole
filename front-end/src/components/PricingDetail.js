/* eslint-disable no-unused-vars*/
import React, { PureComponent } from 'react'
import { Accordion } from 'semantic-ui-react'
import { LineChart,Line,XAxis,YAxis,CartesianGrid,ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

const PricingDetails = ({ item }) => {

  // const isEmpty = (object) => Object.keys(object).length === 0

  


  const priceData = item.transactions.filter(item => item.type === 'sale')
  
  // const dataArray = priceData.transactions.map(sale => {
  //   const date = new Date(sale.createdAt)
  //   const formattedDate = format(date, 'dd/mm/yy')
  //   const price = sale.price
  //   return [formattedDate,price]
  // })
  // console.log('dataArray',dataArray)
  


  console.log(priceData)
  console.log(item)
  return (
    <>
      <h1>hello world</h1>

    </>
  )
}

export default PricingDetails