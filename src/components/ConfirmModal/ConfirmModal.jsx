import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Toast } from 'antd-mobile'

import * as orderActions from '../../store/actions/orderActions'
import * as goodsActions from '../../store/actions/goodsActions'

import './confirmModal.scss'
import { bindActionCreators } from 'redux'
import { _getQueryString } from '@/common/js/tool'
//
class ConfirmModal extends Component {
  // isIos = _getQueryString('jcnsource') === 'ios'
  isIos = false
  constructor(props) {
    super(props)
    this.makeOrder = this.makeOrder.bind(this)
    this.goAddressEditPage = this.goAddressEditPage.bind(this)
  }

  // 下单
  async makeOrder() {
    const goodsId = this.props.goodsId
    const skuId = this.props.skuId // 没有skuId默认传0
    const paymentType = this.props.paymentType // 支付类型 1=金币支付 2=金币+现金支付
    this.props.hideConfirmModal()
    if(this.isIos) {
      // IOS 不支持微信支付
      return this.props.showErrorModal()
    }
    Toast.loading('兑换中', 2)
    const { exchangeRes } = await this.props.orderActions.coinsMallMakeOrder({ goodsId, skuId, os:_getQueryString('jcnsource')  })
    Toast.hide()
    if (0 === exchangeRes.data.errCode) {
      if (0 === exchangeRes.data.orderErrorCode) {
        // 下单成功
        if (paymentType === 1) {
          this.props.goOrderListPage()
        } else if (paymentType === 2) {
          //  组合支付
          sessionStorage.setItem('payInfo', encodeURIComponent(JSON.stringify({
            payRedirectUrl: exchangeRes.data.payRedirectUrl, // H5支付URL
            payOrderNumber: exchangeRes.data.payOrderNumber, // 支付订单号
            orderNumber: exchangeRes.data.orderNumber,
            orderExpireTime: exchangeRes.data.orderExpireTime, // 订单过期时间 ms
            coinPrice: this.props.coinPrice, // 金币价格
            exchangeCashPrice: this.props.exchangeCashPrice // 实付现金价格
          })))
          this.props.history.push({
            pathname: '/pay',
            state: {from: 'goods-detail'}
          })
        }
      } else {
        Toast.fail(exchangeRes.data.orderErrorMsg, 2)
      }
      await this.props.goodsActions.getBtnStatus(goodsId)
    } else {
      Toast.fail(exchangeRes.data.orderErrorMsg, 2)
    }
  }

  goAddressEditPage() {
    this.props.history.push('/address')
  }

  render() {
    const address = this.props.address
    return (
      <div className="confirm-modal-wrap wrap" onClick={() => {
        this.props.hideConfirmModal()
      }}>
        <div className="confirm-modal" onClick={e => e.stopPropagation()}>
          <div className="title">确认兑换</div>
          {/* 收货地址 */}
          <div className="receipt-address">
            <div className="label">收货信息：</div>
            <div className="adress" onClick={this.goAddressEditPage}>
              <div className="user">
                {address.userName} <span>{address.cellNumber}</span>
              </div>
              <div className="region">{address.area} {address.detailLocation}</div>
            </div>
            <div className="iconfont arrow-right" />
          </div>
          {/* sku信息 */}
          <div className="sku-info">
            <div className="label">规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：</div>
            {
              <div className="sku">{this.props.goodsName}</div>
            }
          </div>
          {/* 兑换金额 */}
          <div className="exchange-coin">
            <div className="label">兑换金额：</div>
            <div className="coin-price">{this.props.coinPrice}金币{this.props.exchangeCashPrice > 0 &&
            <span> + <span>{this.props.exchangeCashPrice}元</span></span>}</div>
          </div>
          {/* 按钮组 */}
          <div className="button-con">
            <div className="cancel" onClick={() => {
              this.props.hideConfirmModal()
            }}>取消
            </div>
            <div className="confirm" onClick={this.makeOrder}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    address: state.userReducer.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    orderActions: bindActionCreators(orderActions, dispatch),
    goodsActions: bindActionCreators(goodsActions, dispatch)
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmModal))