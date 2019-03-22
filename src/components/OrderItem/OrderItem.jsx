import React, { Component } from 'react'
import { withRouter } from 'react-router/'


import './orderItem.scss'

class OrderItem extends Component {
  constructor(props) {
    super(props)
    this.goOrderDetailPage = this.goOrderDetailPage.bind(this)
  }

  goOrderDetailPage() {
    this.props.history.push('/order-detail/' + this.props.orderNumber)
  }


  render() {
    const rowData = this.props
    return (
      rowData ?
        <section className="order-item-component" onClick={this.goOrderDetailPage}>
          <div className="goods-img">
            <img src={rowData.goodsImage} alt="" />
          </div>
          <div className="goods-info">
            <p className="goods-name">{rowData.goodsName}</p>
            {
              rowData.orderStatus === 0 ?
                <p className="order-status pending">待发货</p>
                :
                rowData.orderStatus === 1 ?
                  <p className="order-status">失败</p>
                  :
                  rowData.orderStatus === 2 ?
                    <p className="order-status">已发货</p>
                    :
                    rowData.orderStatus === -1 ?
                      <p className="order-status pending">待支付</p>
                      :
                      rowData.orderStatus === -2 ?
                        <p className="order-status ">关闭</p>
                        :
                        rowData.orderStatus === -3 ?
                          <p className="order-status ">支付失败</p>
                      : null
            }
          </div>
          <div className="iconfont arrow-right" />
        </section>
        : null
    )
  }
}


export default withRouter(OrderItem)