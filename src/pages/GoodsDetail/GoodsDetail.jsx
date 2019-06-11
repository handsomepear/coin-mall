import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'

import { _send1_1, _timeFormate } from '@common/js/tool'

import * as goodsActions from '@actions/goodsActions'
import * as orderActions from '@actions/orderActions'
import * as userActions from '@actions/userActions'
import * as homeActions from '@actions/homeActions'


import SkuModal from '@components/SkuModal/SkuModal'
import ConfirmModal from '@components/ConfirmModal/ConfirmModal'

//css
import './goodsDetail.scss'
import CountDown from '@/components/CountDown'


// 秒杀组件
const Seckill = props => {
  const goodsDetail = props.goodsDetail

  let seckillText = ''
  const seckillTime = _timeFormate(goodsDetail.nextExchangeTimestamp)
  if (goodsDetail.seckillStatus === 0) {
    return null
  } else if (goodsDetail.seckillStatus === 1) {

    seckillText = `${seckillTime.M}月${seckillTime.d}日  ${seckillTime.h}:${seckillTime.m}准时开抢`

  } else if (goodsDetail.seckillStatus === 2) {
    //  秒杀中
    seckillText = '秒杀进行中'
  } else if (goodsDetail.seckillStatus === 3) {
    //  秒杀结束
    seckillText = '当日秒杀时间已结束'
  }

  return (
    <div className="seckill">
      <div className="zhongbiao iconfont" />
      {seckillText}
    </div>
  )
}

// IOS不可支付的异常弹窗
function ErrorModal(props) {
  return (
    <section className="error-modal-wrap">
      <section className="error-modal">
        <div className="error-title">
          <img src={require('../../common/images/warn.png')} alt="" />
          <p>ios用户暂时不支持支付现金！</p>
        </div>
        <div className="error-tip">请更换为安卓手机兑换</div>
        <div className="error-customer" onClick={props.contactCustomer}>联系客服</div>
        <div className="iconfont close-x" onClick={props.onCloseModal} />
      </section>
    </section>
  )
}

// VIP会员日专场商品兑换个数超过三个显示的弹窗
function ExhcangeUpperLimitModal(props) {
  return (
    <section className="error-modal-wrap">
      <section className="limit-modal">
        <div className="limit-logo">
          <img src={require('../../common/images/limit-logo.png')} alt="" />
        </div>
        <div className="close-btn" onClick={props.onCloseLimitModal}>
          <p className="iconfont close-x" />
        </div>
        <div className="title">小主手下留情~</div>
        <div className="limit-tips">
          商品虽好，但给其他姐妹也留点 呦！休息一会儿下场再来抢吧~
        </div>
      </section>
    </section>
  )
}

// 会员升级提示
function VipUpgradeModal(props) {
  return (
    // <!-- 升级会员 -->
    <div className="window-wrap vip-upgrade-wrap">
      <div className="window-modal vip-upgrade-modal">
        <div className="customer-img">
          <img src={require('../../common/images/customer-modal.png')} alt="" />
        </div>
        <div className="title">该特权为“年度会员”专享!</div>
        <div className="modal-tips">
          <p>升级年度会员后立享！</p>
        </div>
        <div className="options">
          <div className="vip-upgrade btn" onClick={props.onClickVipUpgrade}>立即升级</div>
        </div>
        <div className="close-btn" onClick={props.onCloseVipUpgradeModal}>
          <img src={require('../../common/images/close-btn.png')} alt="" />
        </div>
      </div>
    </div>
  )
}


class GoodsDetail extends Component {
  // isIos = _getQueryString('jcnsource') === 'ios'
  isIos = false

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isShowSkuModal: false,
      isShowConfirmModal: false,
      choosedSkuInfo: null,
      goodsId: 0,
      goodsDetail: null,
      buttonStatus: 0,
      isShowErrorModal: false,
      isShowLimitModal: false,
      isShowVipUpgradeModal: false // 控制会员升级提示弹窗
    }
    this.getAllReceivedCount = this.getAllReceivedCount.bind(this)
  }

  async componentDidMount() {
    // 获取到商品Id
    _send1_1('goods-index')
    const goodsId = this.props.match.params.goodsId
    const prevPathname = this.props.prevPathname
    const choosedSkuInfo = this.props.choosedSkuInfo
    if (prevPathname !== '/address') {
      this.props.goodsActions.updateChoosedSkuInfo(null)
    } else {
      this.props.homeActions.setPrevpathname(null)
    }
    this.setState({ goodsId, choosedSkuInfo })
    const { goodsDetail } = await this.props.goodsActions.getGoodsDetail(goodsId)
    _send1_1(`goods-index-${goodsDetail.goodsId}`)
    this.setState({ goodsDetail })
    const { buttonStatus } = await this.props.goodsActions.getBtnStatus(goodsId)
    this.setState({ buttonStatus })
  }

  // 获取生日礼物领取次数
  async getAllReceivedCount () {

  }

  // 去设置地址页面
  goAddressEdit = () => {
    this.props.history.push('/address')
  }

  // 去订单列表
  goOrderListPage = () => {
    this.props.history.push('/order-list')
  }

  showSkuModal = () => {
    this.setState({
      isShowSkuModal: true
    })
  }

  hideSkuModal = () => {
    this.setState({
      isShowSkuModal: false
    })
  }

  showConfirmModal = () => {
    this.hideSkuModal()
    this.setState({
      isShowConfirmModal: true
    })
  }

  hideConfirmModal = () => {
    this.setState({
      isShowConfirmModal: false
    })
  }

  // 选择商品sku
  chooseSku = (choosedSkuInfo) => {
    this.setState({ choosedSkuInfo })
    this.props.goodsActions.updateChoosedSkuInfo(choosedSkuInfo)
  }

  login = () => {
    this.props.userActions.doLogin()
  }

  // 联系客服
  contactCustomer = () => {
    window.location.href = 'jcnhers://customer/imService={hers}'
  }

  // 兑换奖品
  exchange = async () => {
    const skuList = this.props.goodsDetail.skuList
    _send1_1('goods-index-buy')
    _send1_1(`goods-index-buy-${this.props.goodsDetail.goodsId}`)

    // 如果是生日礼物 则需要判断可领取次数 做限制 并提示升级为年度会员
    if(parseFloat(this.state.goodsId) === 31) {
      const { allReceivedGiftCount } = await this.props.goodsActions.getAllReceivedCount()
      if(allReceivedGiftCount <= 0) {
        return this.showVipUpgradeModal()
      }
    }

    if (this.state.buttonStatus === 9) {
      return this.showLimitModal()
    }

    if (this.props.goodsDetail.paymentType === 2 && this.isIos) {
      //  组合支付
      return this.setState({ isShowErrorModal: true })
    }
    if (skuList && skuList.length > 0) {
      if (!this.props.choosedSkuInfo) {
        return this.showSkuModal()
      }
    }
    if (!this.props.address) {
      return Toast.fail('请填写收货信息', 2)
    }
    this.showConfirmModal()
  }

  goMakeMoney = () => {
    window.location.href = 'http://bbs.j.cn/html/cointask/task-index.html'
  }

  // 会员升级
  vipUpgrade = () => {
    window.location.href = 'https://bbs.j.cn/pages/VIPTEST/index.html?direct=1'
  }

  // 获得兑换资格
  goGainQualification = () => {
    window.location.href = 'https://bbs.j.cn/pages/vipRulePage/index.html'
  }

  // 会员权益点击事件
  handleVipEquityClick = () => {
    window.location.href = 'jcnhers://my_entrance/id=tehui'
  }

  // 展示会员升级提示
  showVipUpgradeModal = () => {
    this.setState({ isShowVipUpgradeModal: true })
  }

  closeVipUpgradeModal = () => {
    this.setState({ isShowVipUpgradeModal: false })
  }

  // 关闭错误弹窗
  closeErrorModal = () => {
    this.setState({ isShowErrorModal: false })
  }

  showErrorModal = () => {
    this.setState({ isShowErrorModal: true })
  }

  showLimitModal = () => {
    this.setState({ isShowLimitModal: true })
  }

  hideLimitModal = () => {
    this.setState({ isShowLimitModal: false })
  }

  changeBottomBtnStatus = status => {
    this.setState({ buttonStatus: status })
  }

  renderBottomBtn = () => {
    const loggingStatus = this.props.loggingStatus
    const buttonStatus = this.state.buttonStatus
    const goodsDetail = this.props.goodsDetail
    if (!loggingStatus) {
      // 未登录
      // FIXME:check
      return <div className="btn" onClick={this.login}>请先登录</div>
    }
    switch (buttonStatus) {
      case 1:
        return <div className="btn" onClick={this.login}>请先登录</div>
      case 2:
        return <div className="btn bg-gray">已兑完</div>
      case 3:
        return <div className="btn bg-gray">每日限量已兑完</div>
      case 4:
        return <div className="btn" onClick={this.goMakeMoney}>金币不足，去赚金币
          <div className="iconfont arrow-right" />
        </div>
      case 5:
        return <div className="btn" onClick={this.goGainQualification}>如何获得兑换资格 <div className="iconfont arrow-right" /></div>
      case 6:
        const diffTime = goodsDetail.nextExchangeTimestamp - Date.now()
        let buttonBtn = ''
        //  秒杀未开始
        if (diffTime > 0 && diffTime < 1800000) {
          // 秒杀倒计时(30分钟之内倒计时)
          buttonBtn = <div className="btn bg-gray">
            <CountDown endTimeMs={goodsDetail.nextExchangeTimestamp} onTimeEnd={() => {
              this.changeBottomBtnStatus(7)
            }} />后开抢
          </div>
        } else {
          buttonBtn = <div className="btn bg-gray">即将开始</div>
        }
        return buttonBtn
      case 7:
        return <div className="btn" onClick={this.exchange}>马上兑换</div>
      case 8:
        return <div className="btn bg-gray">已兑换</div>
      case 9:
        return <div className="btn" onClick={this.exchange}>马上兑换</div>
      case 11:
        return <div className="btn bg-gray">已兑换</div>
      default:
        return false
    }
  }


  render() {
    const goodsDetail = this.state.goodsDetail
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
                  <div className="goods-tag">{goodsDetail.iconList[0]}</div>
                  : null
              }
              <span>{goodsDetail.goodsName}</span>
            </div>
            <div className="detail-price">

              {
                goodsDetail.paymentType === 2 ?
                  <div className="new-price">
                    <span>{goodsDetail.coinPrice}</span>金币 + <span><span
                    className="coin-mark">￥</span>{goodsDetail.exchangeCashPrice}元</span>
                  </div>
                  : <div className="new-price">
                    <span>{goodsDetail.coinPrice}</span>金币
                  </div>
              }

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
                <div className="vip-btn" onClick={this.handleVipEquityClick}>
                  <p>{this.props.isVip === true ? '会员权益' : '开通会员'}</p>
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
                    this.props.choosedSkuInfo ?
                      <div className="choose-sku-name">{this.props.choosedSkuInfo.skuName}</div>
                      :
                      <div className="choose">请选择尺码</div>
                  }
                  <div className="iconfont arrow-right" />
                </div>
              </section> : null
          }
          {/* 地址信息 */}
          {
            // FIXME: check
            loggingStatus ?
              <section className="address-wrap">
                <div className="address-con" onClick={this.goAddressEdit}>
                  <div className="label">送至</div>
                  {
                    address ?
                      <div className="address">
                        <div className="top">
                          <p>{address.userName} {address.cellNumber}</p>
                        </div>
                        <div className="bottom">
                          <p>{address.area} {address.detailLocation}</p>
                        </div>
                      </div>
                      :
                      <div className="address empty">
                        你还未填写收货信息，马上去填写
                      </div>
                  }
                  <div className="iconfont arrow-right" />
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
                  {goodsDetail.exchangeLimitList.join('、')}可兑。
                </div>
              </section> : null
          }

          {/* 商品详情 */}
          <section className="detail-con">
            <div className="title">商品详情</div>
            <div className="detail" dangerouslySetInnerHTML={{ __html: goodsDetail.detail }} />
          </section>


          {/* 底部按钮 */}
          <section className="bottom-con shadow">
            {this.renderBottomBtn()}
          </section>

          {/* sku弹窗 */}
          {
            this.state.isShowSkuModal ?
              <SkuModal
                hideSkuModal={this.hideSkuModal}
                chooseSku={this.chooseSku}
                skuList={goodsDetail.skuList}
                choosedSkuInfo={this.props.choosedSkuInfo}
                mainImage={goodsDetail.mainImage}
                coinPrice={goodsDetail.coinPrice}
                showConfirmModal={this.showConfirmModal}
              />
              : null
          }

          {/* 确认兑换框 */}
          {
            this.state.isShowConfirmModal ?
              <ConfirmModal
                goOrderListPage={this.goOrderListPage}
                hideConfirmModal={this.hideConfirmModal}
                showErrorModal={this.showErrorModal}
                skuId={this.props.choosedSkuInfo ? this.props.choosedSkuInfo.skuId : 0}
                goodsId={this.state.goodsId}
                goodsName={this.props.choosedSkuInfo ? goodsDetail.goodsName + ' ' + this.props.choosedSkuInfo.skuName :
                  goodsDetail.goodsName}
                coinPrice={this.props.isVip === true && -1 !== goodsDetail.vipCoinPrice ? goodsDetail.vipCoinPrice : goodsDetail.coinPrice}
                rawCoinPrice={this.props.isVip === true ? goodsDetail.coinPrice : null}
                exchangeCashPrice={goodsDetail.paymentType === 1 ? 0 : goodsDetail.exchangeCashPrice}
                paymentType={goodsDetail.paymentType}
                onError={this.showLimitModal}
              />
              : null
          }

          {/*错误弹窗*/}
          {this.state.isShowErrorModal && <ErrorModal onCloseModal={this.closeErrorModal} contactCustomer={this.contactCustomer} />}
          {this.state.isShowLimitModal && <ExhcangeUpperLimitModal onCloseLimitModal={this.hideLimitModal} />}
          {/*会员更新弹窗*/}
          {this.state.isShowVipUpgradeModal && <VipUpgradeModal onCloseVipUpgradeModal={this.closeVipUpgradeModal} onClickVipUpgrade={this.vipUpgrade} />}
        </section>
        : ""

    )
  }
}

const mapStateToProps = state => {
  return {
    goodsDetail: state.goodsReducer.goodsDetail,
    buttonStatus: state.goodsReducer.buttonStatus,
    loggingStatus: state.userReducer.loggingStatus,
    allReceivedGiftCount: state.goodsReducer.allReceivedGiftCount,
    address: state.userReducer.address,
    isVip: state.userReducer.isVip,
    choosedSkuInfo: state.goodsReducer.choosedSkuInfo,
    prevPathname: state.homeReducer.prevPathname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsDetail))