import React, { Component } from 'react'
import Index from './pages/Index/Index'
import GoodsDetail from './pages/GoodsDetail/GoodsDetail'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/goods-detail/:goodsId" component={GoodsDetail} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
