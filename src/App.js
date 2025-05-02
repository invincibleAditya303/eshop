import {BrowserRouter, Switch, Route} from 'react-router-dom'

import React from 'react';

import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import { CartProvider } from './context/cartContext';
import FullCart from './components/FullCart';


const App = ()  => {

  return (
    <CartProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/products/:id' component={ProductDetails} />
          <Route exact path='/cart' component={FullCart} />
        </Switch>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App;
