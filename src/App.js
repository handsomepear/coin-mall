import React, { Component } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'


import Index from '@pages/Index/Index'
import GoodsDetail from '@pages/GoodsDetail/GoodsDetail'
import Address from '@pages/Address/AddressEdite'
import OrderList from '@pages/OrderList/OrderList'
import OrderDetail from '@pages/OrderDetail/OrderDetail'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/goods-detail/:goodsId" component={GoodsDetail} />
            <Route path="/address" component={Address} />
            <Route path="/order-list" component={OrderList} />
            <Route path="/order-detail" component={OrderDetail} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
