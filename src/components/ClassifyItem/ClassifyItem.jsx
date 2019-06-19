import React, { Component } from 'react'
import { withRouter } from 'react-router'


import './classifyItem.scss'
import { _send1_1 } from '@/common/js/tool'

class ClassifyItem extends Component {
  constructor(props) {
    super(props)
    this.goGoodsDetailPage = this.goGoodsDetailPage.bind(this)
  }

  // 跳转到商品详情页
  goGoodsDetailPage() {
    _send1_1('goods-click')
    _send1_1(`goods-click-${this.props.goodsId}`)
    this.props.history.push('/goods-detail/' + this.props.goodsId)
  }


  render() {
    const rowData = this.props
    return (
      rowData ?
        <section className="classify-goods-item-component" onClick={this.goGoodsDetailPage}>
          <div className="goods-img">
            <img src={rowData.mainImage} alt="" />
          </div>
          <div className="goods-info">
            <p className="goods-name">{rowData.goodsName}</p>
            <div className="tag-list">
              {
                rowData.iconList && rowData.iconList.length ?
                  rowData.iconList.map((iconItem, iconIndex) => <p key={iconIndex}>{iconItem}</p>) : null
              }
            </div>
            <div className="price">
              {
                rowData.paymentType === 1
                  ? <p>{rowData.coinPrice}金币</p>
                  :
                  <p>{rowData.coinPrice}金币 + {rowData.exchangeCashPrice}元</p>
              }

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
          <div className="exchange-con">
            {
              rowData.zeroInventory ?
                <div className="exchange-btn no-exchange">兑完</div>
                :
                <div className="exchange-btn">兑换</div>
            }
          </div>
        </section>
        : null
    )
  }
}


export default withRouter(ClassifyItem)