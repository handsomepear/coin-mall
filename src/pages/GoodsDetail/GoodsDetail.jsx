import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import * as goodsActions from '@/store/actions/goodsActions'

//css
import './goodsDetail.scss'

class GoodsDetail extends Component {
  constructor(props) {
    super(props)
    this.goAddressEdite = this.goAddressEdite.bind(this)
  }

  componentWillMount() {
    // 获取到商品Id
    // const goodsId = this.props.match.params.goodsId
    this.props.goodsActions.getGoodsDetail()
  }

  goAddressEdite() {
    this.props.history.push('/address')
  }


  render() {
    const goodsDetail = this.props.goodsDetail
    const loggingStatus = this.props.loggingStatus
    let bottomBtn = null
    if (!loggingStatus) {
      bottomBtn = <div className="btn">请先登录</div>
    }
    return (
      <div className="goods-detail-page">
        {/* 商品展示 */}
        <div className="detail-banner">
          <div className="detail-img">
            <img src={goodsDetail.mainImage} alt="" />
          </div>
          <div className="detail-name">{goodsDetail.goodsName}</div>
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
                <div className="vip-tag">VIP专享价</div>
                <div className="vip-price">3092222金币</div>
              </div>
              <div className="vip-btn"><p>会员权益</p> ></div>
            </div>
            : null
        }
        {/* 地址信息 */}
        {
          loggingStatus ?
            <div className="address-con">
              <div className="label">送至</div>
              <div className="address">
                <div className="top">
                  <p>郑娜 15210789275</p>
                  <div className="arrow-right">></div>
                </div>
                <p className="bottom">北京市 北京市 海淀区</p>
              </div>
            </div>
            : null
        }
        {/* 运费 */}
        <div className="freight-con">
          <div className="label">运费</div>
          <div className="freight">包邮</div>
        </div>
        {/* 商品详情 */}
        <div className="detail-con">
          <div className="title">商品详情</div>
          <div className="detail" dangerouslySetInnerHTML={{ __html: goodsDetail.detail }} />
        </div>


        {/* 底部按钮 */}
        <div className="bottom-con">
          {bottomBtn}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    goodsDetail: state.goodsReducer.goodsDetail,
    loggingStatus: state.userReducer.loggingStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsDetail))