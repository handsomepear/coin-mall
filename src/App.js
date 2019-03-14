import React, { Component } from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as userActions from '@actions/userActions'

import ScrollTop from '@components/ScrollTop'
import Index from '@pages/Index/Index'
import GoodsDetail from '@pages/GoodsDetail/GoodsDetail'
import Address from '@pages/Address/AddressEdit'
import OrderList from '@pages/OrderList/OrderList'
import OrderDetail from '@pages/OrderDetail/OrderDetail'
import ClassifyList from '@pages/ClassifyList/ClassifyList'


class App extends Component {
  async componentWillMount() {
    // 获取用户信息
    if (window.app_interface) {
      this.props.userActions.checkLoggingStatus()
    }
    await this.props.userActions.getUserInfo()
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/classify-list/:positionId" component={ClassifyList} />
          <Route path="/goods-detail/:goodsId" component={GoodsDetail} when="always" />
          <Route path="/address" component={Address} />
          <Route path="/order-list" component={OrderList} />
          <Route path="/order-detail/:orderNumber" component={OrderDetail} />
        </Switch>
      </HashRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
