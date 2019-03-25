import React, { Component } from 'react'
import { withRouter } from 'react-router/'


import './goodsItem.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as homeActions from '@actions/homeActions'

class GoodsItem extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.goGoodsDetailPage = this.goGoodsDetailPage.bind(this)
  }

  goGoodsDetailPage() {
    const scrollPositionY = document.body.scrollTop
    this.props.homeActions.setIndexScrollPosition(scrollPositionY)
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
              {
                rowData.paymentType === 1
                  ? <p className="coin-num">{rowData.coinPrice}金币</p>
                  :
                  <p className="coin-num">{rowData.coinPrice}金币 + {rowData.exchangeCashPrice}元</p>
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
        </section>
        : null
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}


export default withRouter(connect(() => ({}), mapDispatchToProps)(GoodsItem))