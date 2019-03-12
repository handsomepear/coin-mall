import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Toast } from 'antd-mobile'

import * as orderActions from '../../store/actions/orderActions'
import * as goodsActions from '../../store/actions/goodsActions'

import './confirmModal.scss'
import { bindActionCreators } from 'redux'

class ConfirmModal extends Component {
  constructor(props) {
    super(props)
    this.makeOrder = this.makeOrder.bind(this)
    this.goAddressEditePage = this.goAddressEditePage.bind(this)
  }

  // 下单
  async makeOrder() {
    const goodsId = this.props.goodsId
    const skuId = this.props.skuId // 没有skuId默认传0
    Toast.loading('兑换中', 10)
    await this.props.orderActions.coinsMallMakeOrder({ goodsId, skuId })
    Toast.hide()
    this.props.hideConfirmModal()
    this.props.goOrderListPage()
  }

  goAddressEditePage() {
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
            <div className="adress" onClick={this.goAddressEditePage}>
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
            <div className="coin-price">{this.props.coinPrice}金币</div>
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