import React, { Component } from 'react'
import { withRouter } from 'react-router/'


import './goodsItem.scss'

class GoodsItem extends Component {
  constructor(props) {
    super(props)
    this.goGoodsDetailPage = this.goGoodsDetailPage.bind(this)
  }

  goGoodsDetailPage() {
    this.props.history.push('/goods-detail/' + this.props.goodsId)
  }


  render() {
    const rowData = this.props
    return (
      rowData ?
        <section className="home-goods-item-component" onClick={this.goGoodsDetailPage}>
          <div className="goods-img">
            <img src={rowData.mainImage} alt="" />
            {
              rowData.icon ?
                <div className={['goods-mark', rowData.icon === '兑完' ? 'bg-gray' : ''].join(' ')}>{rowData.icon}</div>
                : null
            }
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