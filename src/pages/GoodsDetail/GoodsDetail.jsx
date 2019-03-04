import React, { Component } from 'react'

//css
import './goodsDetail.scss'

class GoodsDetail extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // 获取到商品Id
    const goodsId = this.props.match.params.goodsId
  }

  render() {
    return (
      <div className="goods-detail-page">
        {/* 商品展示 */}
        <div className="detail-banner">
          <div className="detail-img">
            <img src="" alt="" />
          </div>
          <div className="detail-name">超值优惠vivo Y93手机 红色T</div>
          <div className="detail-price">
            <div className="new-price"><span>351400</span>金币</div>
            <div className="old-price">¥3600</div>
          </div>
        </div>
        {/* 会员权益 */}
        <div className="vip-equity">
          <div className="vip-price-con">
            <div className="vip-tag">VIP专享价</div>
            <div className="vip-price">3092222金币</div>
          </div>
          <div className="vip-btn"><p>会员权益</p> ></div>
        </div>
        {/* 地址信息 */}
        <div className="address-con">
          <div className="label">送至</div>`
          <div className="address">
            <div className="top">
              <p>郑娜 15210789275</p>
              <div className="arrow-right">></div>
            </div>
            <p className="bottom">北京市 北京市 海淀区</p>
          </div>
        </div>
        {/* 运费 */}
        <div className="freight-con">
          <div className="label">运费</div>
          <div className="freight">包邮</div>
        </div>
        {/* 商品详情 */}
        <div className="detail-con">
          <div className="title">商品详情</div>
        </div>


        {/* 底部按钮 */}
        <div className="bottom-con">
          <div className="btn">金币不足，去赚金币 ></div>
        </div>
      </div>
    )
  }
}


export default GoodsDetail