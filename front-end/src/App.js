import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ProductIndex from './components/ProductIndex'
import Register from './components/Register'

const App = () => {

  return (
    // <h1> Hello World</h1>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/browse' component={ProductIndex} />
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App