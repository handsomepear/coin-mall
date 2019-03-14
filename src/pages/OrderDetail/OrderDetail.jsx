import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toast } from 'antd-mobile'
import * as orderActions from '@actions/orderActions'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './orderDetail.scss'

class OrderDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isFoldTips: true
    }
    this.toggleTipsFold = this.toggleTipsFold.bind(this)
    this.renderStatus = this.renderStatus.bind(this)
  }

  componentWillMount() {
    console.log(this.props)
    const orderNumber = this.props.match.params.orderNumber
    this.props.orderActions.getOrderDetail(orderNumber)
  }

  toggleTipsFold() {
    let isFoldTips = this.state.isFoldTips
    this.setState({
      isFoldTips: !isFoldTips
    })
  }

  renderStatus() {
    const orderStatus = this.props.orderDetail.orderStatus

    if (orderStatus === 0) {
      return (
        <div className="status">
          <p className="iconfont success" />
          待发货
        </div>
      )
    } else if (orderStatus === 1) {
      return (
        <div className="status">
          <p className="iconfont success" />
          取消订单
        </div>
      )
    } else if (orderStatus === 2) {
      return (
        <div className="status">
          <p className="iconfont success" />
          已发货
        </div>
      )
    }
  }

  render() {
    const orderDetail = this.props.orderDetail
    let exchangeSuccessCommentArr = []
    let readySendCommentArr = []
    if (orderDetail) {
      exchangeSuccessCommentArr = orderDetail.exchangeSuccessComment.split('\n').filter(item => item !== '')
      readySendCommentArr = orderDetail.readySendComment.split('\n').filter(item => item !== '')
    }

    return (
      orderDetail ?
        <section className="order-detail-page">
          {/*订单状态*/}
          <section className="order-status-con">
            {this.renderStatus()}
            {
              orderDetail.orderStatus === 2 ?
                <section className={["order-tips", this.state.isFoldTips && exchangeSuccessCommentArr.length > 2 ? 'fold' : ''].join(' ')}>
                  {
                    orderDetail.exchangeSuccessComment &&
                    exchangeSuccessCommentArr.map((item, index) => <p key={index}>·{item}</p>)
                  }
                  {
                    exchangeSuccessCommentArr.length > 2 ?
                      <div className={["fold-arrow", this.state.isFoldTips ? 'fold' : ''].join(' ')} onClick={this.toggleTipsFold}>
                        <div className="iconfont arrow-top" />
                      </div>
                      :
                      null
                  }

                </section>
                : orderDetail.orderStatus === 0 ?
                <section className={["order-tips", this.state.isFoldTips && readySendCommentArr.length > 2 ? 'fold' : ''].join(' ')}>
                  {
                    orderDetail.readySendComment &&
                    readySendCommentArr.map((item, index) => <p key={index}>·{item}</p>)
                  }
                  {
                    readySendCommentArr.length > 2 ?
                      <div className={["fold-arrow", this.state.isFoldTips ? 'fold' : ''].join(' ')} onClick={this.toggleTipsFold}>
                        <div className="iconfont arrow-top" />
                      </div>
                      :
                      null
                  }
                </section>
                :
                orderDetail.orderStatus === 1 ?
                  <section className="order-tips">
                    <p>取消原因：{orderDetail.cancelReason}</p>
                  </section>
                  :
                  null
            }
          </section>
          {/*物流*/}
          {
            orderDetail.expressName && orderDetail.expressNumber ?
              <section className="logistics-con">
                <div className="logistics">
                  <div className="logistics-info">
                    <div className="logistics-company">物流公司：{orderDetail.expressName}</div>
                    <div className="logistics-number">
                      快递单号：{orderDetail.expressNumber}
                      <div className="clip-btn expressNumber-btn" onClick={() => {
                        window.location.href = 'http://m.kuaidi100.com/result.jsp?nu=' + orderDetail.expressNumber
                      }}>查询
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              :
              null
          }
          {/*收货地址*/}
          <section className="order-address-con">
            <div className="order-address">
              <div className="user-info">
                {orderDetail.userName}<span>{orderDetail.cellNumber}</span>
              </div>
              <div className="address">{orderDetail.area}{orderDetail.detailLocation}</div>
            </div>
          </section>
          {/*商品*/}
          <section className="goods-con">
            <div className="goods-img">
              <img src={orderDetail.goodsImage} alt="" />
            </div>
            <div className="goods-info">
              <div className="goods-name">
                <span className="name">{orderDetail.goodsName}</span>
                <span className="color-666 count">x{orderDetail.goodsCount}</span>
              </div>
              <div className="goods-sku">
                <span className="color-666">{orderDetail.skuName}</span>
                <span>{orderDetail.coinPriceReal}金币</span>
              </div>
            </div>
          </section>
          {/*订单信息*/}
          <section className="order-info">
            <div className="order-number">
              <div className="number">
                订单编号：<span className="color-666">{orderDetail.orderNumber}</span>
              </div>
              <CopyToClipboard
                text={orderDetail.orderNumber}
                onCopy={() => Toast.success('复制成功', 2)}
              >
                <div className="clip-btn orderNumber-btn">复制</div>
              </CopyToClipboard>

            </div>
            <div className="order-time">
              下单时间：<span className="color-666">{orderDetail.createTime}</span>
            </div>
          </section>
        </section>
        :
        null
    )
  }
}

const mapStateToProps = state => {
  return {
    orderDetail: state.orderReducer.orderDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    orderActions: bindActionCreators(orderActions, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetail))