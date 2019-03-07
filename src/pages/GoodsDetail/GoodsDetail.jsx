import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import { _timeFormate } from '@common/js/tool'

import * as goodsActions from '@actions/goodsActions'
import * as orderActions from '@actions/orderActions'
import * as userActions from '@actions/userActions'


import SkuModal from '@components/SkuModal/SkuModal'
import ConfirmModal from '@components/ConfirmModal/ConfirmModal'

//css
import './goodsDetail.scss'
import { Toast } from 'antd-mobile'


const Seckill = props => {
  const goodsDetail = props.goodsDetail
  let seckillText = ''
  const seckillTime = _timeFormate(goodsDetail.nextExchangeTimestamp)
  if (goodsDetail.seckillStatus === 0) {
    return null
  } else if (goodsDetail.seckillStatus === 1) {
    //  秒杀未开始
    seckillText = `${seckillTime.M}月${seckillTime.d}日  ${seckillTime.h}:${seckillTime.m}准时开抢`
  } else if (goodsDetail.seckillStatus === 2) {
    //  秒杀中
    seckillText = '秒杀进行中'
  } else if (goodsDetail.seckillStatus === 3) {
    //  秒杀结束
    seckillText = '当日秒杀时间已结束'
  }

  return (<div className="seckill">
    <div className="zhongbiao iconfont" />
    {seckillText}
  </div>)
}


class GoodsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isShowSkuModal: false,
      isShowConfirmModal: false,
      choosedSku: null
    }
    this.goAddressEdite = this.goAddressEdite.bind(this)
    this.renderBottomBtn = this.renderBottomBtn.bind(this)
    this.showSkuModal = this.showSkuModal.bind(this)
    this.hideSkuModal = this.hideSkuModal.bind(this)
    this.chooseSku = this.chooseSku.bind(this)
    this.showConfirmModal = this.showConfirmModal.bind(this)
    this.hideConfirmModal = this.hideConfirmModal.bind(this)
    this.goOrderListPage = this.goOrderListPage.bind(this)
    this.login = this.login.bind(this)
    this.exchange = this.exchange.bind(this)
  }

  componentWillMount() {
    // 获取到商品Id
    const goodsId = this.props.match.params.goodsId
    this.props.goodsActions.getGoodsDetail(goodsId)
    this.props.goodsActions.getBtnStatus(goodsId)
  }

  // 去设置地址页面
  goAddressEdite() {
    this.props.history.push('/address')
  }

  // 去订单列表
  goOrderListPage() {
    this.props.history.push('/order-list')
  }

  showSkuModal() {
    this.setState({
      isShowSkuModal: true
    })
  }

  hideSkuModal() {
    this.setState({
      isShowSkuModal: false
    })
  }

  showConfirmModal() {
    this.hideSkuModal()
    this.setState({
      isShowConfirmModal: true
    })
  }

  hideConfirmModal() {
    this.setState({
      isShowConfirmModal: false
    })
  }

  // 选择商品sku
  chooseSku(choosedSku) {
    this.setState({ choosedSku })
  }

  // 去赚金币
  static maskCoins() {
    window.location.href = ''
  }


  // 去获取兑换资格
  static getQualification() {
    window.location.href = ''
  }

  login() {
    this.props.userActions.doLogin()
  }

  // 兑换奖品
  exchange() {
    const skuList = this.props.goodsDetail.skuList
    if (skuList && skuList.length > 0) {
      if (!this.state.choosedSku) {
        return Toast.fail('请选择商品规格', 2)
      }
    }
    this.showConfirmModal()
  }

  renderBottomBtn() {
    const loggingStatus = this.props.loggingStatus
    const buttonStatus = this.props.buttonStatus
    if (!loggingStatus) {
      // 未登录
      return <div className="btn" onClick={this.exchange}>请先登录</div>
    }
    switch (buttonStatus) {
      case 1:
        return <div className="btn" onClick={this.showConfirmModal}>请先登录</div>
      case 2:
        return <div className="btn bg-gray">已兑完</div>
      case 3:
        return <div className="btn bg-gray">每日限量已兑完</div>
      case 4:
        return <div className="btn" onClick={this.maskCoins}>金币不足，去赚金币 <div className="iconfont arrow-right" /></div>
      case 5:
        return <div className="btn" onClick={this.getQualification}>如何获得兑换资格 <div className="iconfont arrow-right" /></div>
      case 6:
        return <div className="btn bg-gray">即将开始</div>
      case 7:
        return <div className="btn" onClick={this.showConfirmModal}>马上兑换</div>
      default:
        return false
    }
  }


  render() {
    const goodsDetail = this.props.goodsDetail
    const loggingStatus = this.props.loggingStatus
    const address = this.props.address
    return (
      goodsDetail ?
        <section className="goods-detail-page">
          {/* 商品展示 */}
          <section className="detail-banner">
            <section className="detail-img">
              <img src={goodsDetail.mainImage} alt="" />
            </section>
            <div className="detail-name">
              {
                goodsDetail.iconList && goodsDetail.iconList.length > 0 ?
                  goodsDetail.iconList.map((iconItem, iconIndex) => <div className="goods-tag" key={iconIndex}>{iconItem}</div>)
                  : null
              }
              <span>{goodsDetail.goodsName}</span>
            </div>
            <div className="detail-price">
              <div className="new-price"><span>{goodsDetail.coinPrice}</span>金币</div>
              <div className="old-price">¥{goodsDetail.cashPrice}</div>
            </div>
          </section>
          {/* 会员权益 */}
          {
            -1 !== goodsDetail.vipCoinPrice ?
              <section className="vip-equity">
                <div className="vip-price-con">
                  <div className="vip-tag">
                    <img src={require('../../common/images/vip-tag.png')} alt="" />
                  </div>
                  <div className="vip-price">{goodsDetail.vipCoinPrice}金币</div>
                </div>
                <div className="vip-btn" onClick={() => {
                  if (this.props.isVip) {
                    // 会员权益
                    window.location.href = ''
                  } else {
                    // 开通会员
                    window.location.href = ''
                  }
                }}>
                  <p>{this.props.isVip ? '会员权益' : '开通会员'}</p>
                  <div className="iconfont arrow-right" />
                </div>
              </section>
              : null
          }
          {/* 秒杀 */}
          {
            goodsDetail.seckillStatus !== 0 ?
              <Seckill goodsDetail={goodsDetail} />
              : null
          }

          {/* 规格 */}
          {
            goodsDetail.skuList && goodsDetail.skuList.length > 0 ?
              <section className="size-choose">
                <div className="label">规格</div>
                <div className="choose-con" onClick={this.showSkuModal}>
                  {
                    this.state.choosedSku ?
                      <div className="choose-sku-name">{this.state.choosedSku.skuName}</div>
                      :
                      <div className="choose">请选择尺码</div>
                  }
                  <div className="iconfont arrow-right" />
                </div>
              </section> : null
          }
          {/* 地址信息 */}
          {
            !loggingStatus ?
              <section>
                <div className="address-con" onClick={this.goAddressEdite}>
                  <div className="label">送至</div>
                  {
                    address ?
                      <div className="address">
                        <div className="top">
                          <p>{address.userName} {address.cellNumber}</p>
                        </div>
                        <div className="bottom">
                          <div className="iconfont location" />
                          <p>{address.area} {address.detailLocation}</p>
                        </div>
                      </div>
                      :
                      <div className="address empty">
                        你还未填写收货信息，马上去填写
                      </div>
                  }
                </div>
                {/* 运费 */}
                <div className="freight-con">
                  <div className="label">运费</div>
                  <div className="freight">包邮</div>
                </div>
              </section>
              : null
          }
          {/* 限兑 */}
          {
            goodsDetail.exchangeLimitList && goodsDetail.exchangeLimitList.length > 0 ?
              <section className="exchange-limit">
                <div className="label">限兑</div>
                <div className="limit-con">
                  {goodsDetail.exchangeLimitList.join('、')}
                </div>
              </section> : null
          }

          {/* 商品详情 */}
          <section className="detail-con">
            <div className="title">商品详情</div>
            <div className="detail" dangerouslySetInnerHTML={{ __html: goodsDetail.detail }} />
          </section>

          {/* sku弹窗 */}
          {
            this.state.isShowSkuModal ?
              <SkuModal
                hideSkuModal={this.hideSkuModal}
                chooseSku={this.chooseSku}
                skuList={goodsDetail.skuList}
              />
              : null
          }
          {/* 底部按钮 */}
          <section className="bottom-con">
            {this.renderBottomBtn()}
          </section>
          {/* 确认兑换框 */}
          {
            this.state.isShowConfirmModal ?
              <ConfirmModal
                goOrderListPage={this.goOrderListPage}
                hideConfirmModal={this.hideConfirmModal}
                oSku={this.state.choosedSku}
                goodsName={goodsDetail.goodsName}
              />
              : null
          }
        </section>
        : "您访问的商品不存在"

    )
  }
}

const mapStateToProps = state => {
  return {
    goodsDetail: state.goodsReducer.goodsDetail,
    buttonStatus: state.goodsReducer.buttonStatus,
    loggingStatus: state.userReducer.loggingStatus,
    address: state.userReducer.address,
    isVip: state.userReducer.isVip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsDetail))