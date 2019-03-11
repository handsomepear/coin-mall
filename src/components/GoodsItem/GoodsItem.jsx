import React, { Component } from 'react'
import { withRouter } from 'react-router/'


import './goodsItem.scss'

class GoodsItem extends Component {
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
        <section className="home-goods-item-component" onClick={this.goOrderDetailPage}>
          <div className="goods-img">
            <img src={rowData.mainImage} alt="" />
          </div>
          <div className="goods-info">
            <p className="goods-name">{rowData.goodsName}</p>
            <div className="goods-price">
              <p className="coin-num">{rowData.coinPrice}金币</p>
              {
                rowData.vipDiscount ?
                  <div className="vip-tag">
                    <img src={require('../../common/images/vip-tag.png')} alt="" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </section>
        : null
    )
  }
}


export default withRouter(GoodsItem)