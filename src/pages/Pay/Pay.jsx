import React, { Component } from 'react'
import CountDown from '@components/CountDown'

import './pay.scss'
import { coinsMallWechatH5PayQueryOrder } from '@API/order'

function ErrorPayModal(props) {
  return (
    <div className="error-pay-wrap">
      <div className="error-pay-modal">
        <div className="error-title">支付异常，请重试</div>
        <div className="error-opts">
          <div className="btn" onClick={props.contactCustomer}>联系客服</div>
          <div className="btn pay-again" onClick={props.payAgain}>重新支付</div>
        </div>
        <div className="iconfont close-x" onClick={props.onHideErrorModal} />
      </div>
    </div>
  )
}


class Pay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowErrorPayModal: false,
      coinPrice: 0, // 金币
      exchangeCashPrice: 0, // 现金
      orderNumber: 0, // 订单号
      payOrderNumber: 0, // 支付订单号
      orderExpireTime: 0, // 订单到期时间
      mwebUrl: ''
    }
  }

  componentDidMount() {
    const state = this.props.location.state
    const payInfo = JSON.parse(decodeURIComponent(sessionStorage.getItem('payInfo')))
    if (payInfo) {
      if (state && (state.from === 'order-detail' || state.from === 'goods-detail')) {
        // 去支付
        let mwebUrl = payInfo.payRedirectUrl

        mwebUrl && (window.location.href = mwebUrl)
      } else {
        this.setState({
          coinPrice: payInfo.coinPrice,
          mwebUrl: payInfo.payRedirectUrl || '',
          exchangeCashPrice: payInfo.exchangeCashPrice,
          orderExpireTime: payInfo.orderExpireTime,
          payOrderNumber: payInfo.payOrderNumber,
          orderNumber: payInfo.orderNumber
        })
      }
    }
  }


  handleTimeEnd = () => {
    //  超过支付时间后，跳去订单详情页
    this.props.history.replace('/order-list')
  }

  contactCustomer = () => {
    window.location.href = 'jcnhers://customer/imService={hers}'
  }

  payAgain = () => {
    window.location.href = this.state.mwebUrl
  }

  checkPayStatus = async () => {
    const statusRes = await coinsMallWechatH5PayQueryOrder({ payOrderNumber: this.state.payOrderNumber }).then(res => res.data).catch(err => err.data)
    if (statusRes.orderStatus) {
      //  支付成功
      sessionStorage.clear()
      this.props.history.replace('/order-list')
    } else {
      this.setState({ isShowErrorPayModal: true })
    }
  }

  hideErrorModal = () => {
    this.setState({ isShowErrorPayModal: false })
  }


  render() {
    return (
      <section className="pay-page">
        <section className="main">
          <header>您已支付{this.state.coinPrice}金币，请确认是否已支付<span>{this.state.exchangeCashPrice}</span>元</header>
          {/*支付剩余时间*/}
          {this.state.orderExpireTime > 0
          &&
          <section className="count-down">
            <div className="txt">支付剩余时间</div>
            {/*倒计时*/}
            <CountDown endTimeMs={this.state.orderExpireTime} onTimeEnd={this.handleTimeEnd} />
          </section>}
        </section>
        <div className="check-result-btn" onClick={this.checkPayStatus}>支付已完成</div>
        <div className="pay-problem">支付遇到问题，<span onClick={this.payAgain}>点击重新支付</span></div>
        <div className="customer" onClick={this.contactCustomer}>联系客服 >></div>
        {this.state.isShowErrorPayModal && <ErrorPayModal onHideErrorModal={this.hideErrorModal} payAgain={this.payAgain} contactCustomer={this.contactCustomer}  />}
      </section>
    )
  }
}

export default Pay