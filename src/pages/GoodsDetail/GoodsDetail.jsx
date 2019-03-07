import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import { _timeFormate } from '@common/js/tool'

import * as goodsActions from '@actions/goodsActions'
import * as orderActions from '@actions/orderActions'


import SkuModal from '@components/SkuModal/SkuModal'
import ConfirmModal from '@components/ConfirmModal/ConfirmModal'

//css
import './goodsDetail.scss'


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
      chooseSku: {}
    }
    this.goAddressEdite = this.goAddressEdite.bind(this)
    this.renderBottomBtn = this.renderBottomBtn.bind(this)
    this.showSkuModal = this.showSkuModal.bind(this)
    this.hideSkuModal = this.hideSkuModal.bind(this)
    this.chooseSku = this.chooseSku.bind(this)
    this.showConfirmModal = this.showConfirmModal.bind(this)
    this.hideConfirmModal = this.hideConfirmModal.bind(this)
    this.goOrderListPage = this.goOrderListPage.bind(this)
  }

  async componentWillMount() {
    // 获取到商品Id
    const goodsId = this.props.match.params.goodsId

    this.props.goodsActions.getGoodsDetail(goodsId)

  }


  goAddressEdite() {
    this.props.history.push('/address')
  }
  goOrderListPage(){
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
    console.log(this)
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
  chooseSku(chooseSku = {}) {
    this.setState({ chooseSku })
  }

  renderBottomBtn() {
    const loggingStatus = this.props.loggingStatus
    if (!loggingStatus) {
      // 未登录
      return <div className="btn" onClick={this.showConfirmModal}>请先登录</div>
    }
  }


  render() {
    const goodsDetail = this.props.goodsDetail
    const loggingStatus = this.props.loggingStatus
    return (
      goodsDetail ?
        <div className="goods-detail-page">
          {/* 商品展示 */}
          <div className="detail-banner">
            <div className="detail-img">
              <img src={goodsDetail.mainImage} alt="" />
            </div>
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
          </div>
          {/* 会员权益 */}
          {
            goodsDetail.vipDiscountFlag ?
              <div className="vip-equity">
                <div className="vip-price-con">
                  <div className="vip-tag">
                    <img src={require('../../common/images/vip-tag.png')} alt="" />
                  </div>
                  <div className="vip-price">3092222金币</div>
                </div>
                <div className="vip-btn"><p>会员权益</p>
                  <div className="iconfont arrow-right" />
                </div>
              </div>
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
              <div className="size-choose">
                <div className="label">规格</div>
                <div className="choose-con" onClick={this.showSkuModal}>
                  <div className="choose">请选择尺码</div>
                  <div className="iconfont arrow-right" />
                </div>
              </div> : null
          }
          {/* 地址信息 */}
          {
            !loggingStatus ?
              <div className="address-con" onClick={this.goAddressEdite}>
                <div className="label">送至</div>
                {
                  this.props.address ?
                    <div className="address">
                      <div className="top">
                        <p>郑娜 15210789275</p>
                      </div>
                      <div className="bottom">
                        <div className="iconfont location" />
                        <p>北京市 北京市 海淀区</p>
                      </div>
                    </div>
                    :
                    <div className="address-empty">

                    </div>
                }
              </div>
              : null
          }
          {/* 运费 */}
          <div className="freight-con">
            <div className="label">运费</div>
            <div className="freight">包邮</div>
          </div>

          {/* 限兑 */}
          {
            goodsDetail.exchangeLimitList && goodsDetail.exchangeLimitList.length > 0 ?
              <div className="exchange-limit">
                <div className="label">限兑</div>
                <div className="limit-con">
                  {goodsDetail.exchangeLimitList.join('、')}
                </div>
              </div> : null
          }

          {/* 商品详情 */}
          <div className="detail-con">
            <div className="title">商品详情</div>
            <div className="detail" dangerouslySetInnerHTML={{ __html: goodsDetail.detail }} />
          </div>

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
          <div className="bottom-con">
            {this.renderBottomBtn()}
          </div>
          {/* 确认兑换框 */}
          {
            this.state.isShowConfirmModal ?
              <ConfirmModal
                goOrderListPage={this.goOrderListPage}
                hideConfirmModal={this.hideConfirmModal}
                goodsId={this.state.chooseSku.goodsId}
                skuId={this.state.chooseSku.skuId}
              />
              : null
          }
        </div>
        : "您访问的商品不存在"

    )
  }
}

const mapStateToProps = state => {
  return {
    goodsDetail: state.goodsReducer.goodsDetail,
    loggingStatus: state.userReducer.loggingStatus,
    address: state.userReducer.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsDetail))