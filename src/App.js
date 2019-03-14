import React, { Component } from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@actions/userActions'
import Index from '@pages/Index/Index'
import GoodsDetail from '@pages/GoodsDetail/GoodsDetail'
import Address from '@pages/Address/AddressEdit'
import OrderList from '@pages/OrderList/OrderList'
import OrderDetail from '@pages/OrderDetail/OrderDetail'
import ClassifyList from '@pages/ClassifyList/ClassifyList'

import { getTkl } from '@/API/home'
import Clipboard from 'clipboard'
import { _send1_1 } from '@/common/js/tool'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticket: ''
    }
    this.copyTkl = this.copyTkl.bind(this)
  }

  async componentDidMount() {
    // 获取用户信息
    const resData = await this.props.userActions.getUserInfo().then(res => res.data).catch(err => err.data)
    if (resData.errCode === 0) {
      this.props.userActions.checkLoggingStatus(true)
    }
    if (resData.errCode === 1) {
      this.props.userActions.checkLoggingStatus(false)
    }
    // 获取淘口令
    const { ticket } = await getTkl().then(res => res.data).catch(res => res.data)
    this.setState({ ticket })
  }

  // 复制淘口令
  async copyTkl() {
    const _this = this
    console.log(this.state.ticket)
    const clipboard = new Clipboard('#clip-con', {
      text() {
        return _this.state.ticket
      }
    })
    clipboard.on('success', () => {
      _send1_1('mall-click', 'tbling')
    })
  }

  render() {
    return (
      <HashRouter>
        <div>
          <div id="clip-con" onClick={this.copyTkl}>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/classify-list/:positionId" component={ClassifyList} />
              <Route path="/goods-detail/:goodsId" component={GoodsDetail} when="always" />
              <Route path="/order-list" component={OrderList} />
              <Route path="/order-detail/:orderNumber" component={OrderDetail} />
            </Switch>
          </div>
          <Route path="/address" component={Address} />
        </div>
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
