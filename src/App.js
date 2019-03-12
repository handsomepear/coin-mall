import React, { Component } from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as userActions from '@actions/userActions'

import ScrollTop from '@components/ScrollTop'
import Index from '@pages/Index/Index'
import GoodsDetail from '@pages/GoodsDetail/GoodsDetail'
import Address from '@pages/Address/AddressEdite'
import OrderList from '@pages/OrderList/OrderList'
import OrderDetail from '@pages/OrderDetail/OrderDetail'
import ClassifyList from '@pages/ClassifyList/ClassifyList'
import { bindActionCreators } from 'redux'

class App extends Component {
  componentWillMount() {
    // 获取用户信息
    if (window.app_interface) {
      this.props.userActions.checkLoggingStatus()
    }
    this.props.userActions.getUserInfo()
    // this.props.userActions.doLogin()
  }

  render() {
    return (
      <HashRouter>
        <ScrollTop>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/goods-detail/:goodsId" component={GoodsDetail} />
            <Route path="/address" component={Address} />
            <Route path="/order-list" component={OrderList} />
            <Route path="/classify-list/:positionId" component={ClassifyList} />
            <Route path="/order-detail/:orderNumber" component={OrderDetail} />
            <Redirect to="/" />
          </Switch>
        </ScrollTop>
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
