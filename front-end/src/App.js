import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import NftForm from './components/NftForm'
import ProductDetail from './components/ProductDetail'
import ProductIndex from './components/ProductIndex'
import Register from './components/Register'
import UserProfile from './components/UserProfile'

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/browse' component={ProductIndex} />
        <Route exact path='/browse/:id' component={ProductDetail}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/profile' component={UserProfile}/>
        <Route exact path='/cart' component={Cart}/>
        <Route exact path='/profile/add' component={NftForm}/>
      </Switch>
      <Footer className='footer'/>
    </BrowserRouter>
  )
}

export default App