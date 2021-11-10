import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './components/Home'
import Navbar from './components/Navbar'
import ProductIndex from './components/ProductIndex'

const App = () => {

  return (
    // <h1> Hello World</h1>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/browse' component={ProductIndex} />
        <Route exact path='/' component={Home}/>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App