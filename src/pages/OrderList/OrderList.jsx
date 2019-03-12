import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { ListView } from 'antd-mobile'

import * as orderActions from '../../store/actions/orderActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import OrderItem from '@/components/OrderItem/OrderItem'
import './orderList.scss'

class OrderList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageNo: 1,
      pageSize: 10,
      isLoading: false, // 是否正在加载中
      hasMoreOrder: true // 是否还有更多订单
    }
    this.getOrderList = this.getOrderList.bind(this)
  }

  componentWillMount() {
    this.getOrderList()
  }

  // 获取订单详情
  async getOrderList() {

    let pageNo = this.state.pageNo
    const pageSize = this.state.pageSize
    // 正在加载中 || 没有更多订单
    if (this.state.isLoading || !this.state.hasMoreOrder) {
      return false
    }
    this.setState({
      isLoading: true
    })
    const { data } = await this.props.orderActions.getOrderList(pageNo, pageSize)
    this.setState({
      isLoading: false
    })
    if (data.hasMoreOrder) {
      this.setState({
        pageNo: ++pageNo
      })
    } else {
      // 表示已经没有更多数据了
      this.setState({
        hasMoreOrder: false
      })
    }
  }



  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    const orderList = dataSource.cloneWithRows(this.props.orderList)

    return (
      <div className="order-list-page">
        {
          this.props.orderList.length ?
            <ListView
              dataSource={orderList} // 渲染的数据
              renderRow={OrderItem} // 单条数据
              initialListSize={10} // 初次渲染的数据条数
              scrollRenderAheadDistance={500} // 接近屏幕范围多少像素开始渲染
              onEndReached={this.getOrderList} // 上拉加载事件
              pageSize={this.state.pageSize}
              useBodyScroll
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.hasMoreOrder ? '加载中...' : '已经没有更多了'}
              </div>)}
            />
            :
            <div className="no-order">暂无记录，快去兑换吧</div>
        }
        <div className="activity-btn" onClick={() => {
          window.location.href = 'https://bbs.j.cn/#/change'
        }}>查看活动领奖</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderList: state.orderReducer.orderList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    orderActions: bindActionCreators(orderActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderList))