import React, { Component } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as userActions from '@actions/userActions'

import Index from '@pages/Index/Index'
import GoodsDetail from '@pages/GoodsDetail/GoodsDetail'
import Address from '@pages/Address/AddressEdite'
import OrderList from '@pages/OrderList/OrderList'
import OrderDetail from '@pages/OrderDetail/OrderDetail'
import { bindActionCreators } from 'redux'

class App extends Component {
  componentWillMount(){
    // 获取用户信息
    this.props.userActions.getUserInfo()
    // this.props.userActions.doLogin()
  }
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

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
