import React, { Component } from 'react'
import { connect } from 'react-redux'

import './vipDay.scss'

import { coinsMallClassifyGoods, coinsMallVipDayStatus } from '@/API/goods'

class VipDay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabList: [],
      zeroGoods: [],
      nineGoods: [],
      nineteenGoods: []
    }
  }

  componentDidMount() {
    this.getAreaStatus()
    // 获取三个时间段的商品信息
    Promise.all([this.getZeroGoods(), this.getNineGoods(), this.getNineteenGoods()]).then(res => {
      this.setState({
        zeroGoods: res[0].data.goodsList,
        nineGoods: res[1].data.goodsList,
        nineteenGoods: res[2].data.goodsList
      })
    })
  }

  // 获取场次状态信息
  getAreaStatus = () => {
    coinsMallVipDayStatus().then(({ data }) => {
      data.statusList.forEach(statusItem => {
        switch (statusItem.classifyId) {
          case 10:
            statusItem.icon = '日用'
            statusItem.time = '00:00'
            break
          case 11:
            statusItem.icon = '家电'
            statusItem.time = '09:00'
            break
          case 12:
            statusItem.icon = '手机'
            statusItem.time = '19:00'
            break
        }
        statusItem.state = statusItem.start ? '进行中' : '即将开始'
      })
      this.setState({
        tabList: data.statusList
      })
    }).catch(err => {
      console.log(err)
    })
  }

  getZeroGoods = () => {
    return coinsMallClassifyGoods({ pageNum: 1, pageSize: 9, positionId: 10 })
  }

  getNineGoods = () => {
    return coinsMallClassifyGoods({ pageNum: 1, pageSize: 9, positionId: 11 })
  }
  getNineteenGoods = () => {
    return coinsMallClassifyGoods({ pageNum: 1, pageSize: 9, positionId: 12 })
  }

  viewMoreGoods = (positionId) => {
    this.props.history.push(`/classify-list/${positionId}`)
  }

  viewGoodsDetail = (goodsId) => {
    this.props.history.push(`/goods-detail/${goodsId}`)
  }

  goVipPage = () => {
    window.location.href = 'https://bbs.j.cn/pages/VIP/index.html'
  }

  render() {
    const isVip = this.props.isVip
    return (
      <section className="vip-day">
        <header>
          {/*banner*/}
          <section className="banner">
            <img src={require('../../common/images/banner.png')} alt="" />
          </section>
          {/*开通会员按钮*/}
          {
            !isVip ?
              <div className="join-btn" onClick={this.goVipPage}>
                <img src={require('../../common/images/join-vip.png')} alt="" />
              </div>
              : null
          }
          <Tab tabList={this.state.tabList} />
        </header>
        {/*专场内容*/}
        <section className="container">
          <SpecialArea
            onViewMoreGoods={() => {
              this.viewMoreGoods(10)
            }}
            title="00:00 会员狂欢"
            slogan="全场3999金币，你的生活我全包！"
            goodsList={this.state.zeroGoods}
            onViewGoodsDetail={this.viewGoodsDetail}
          />
          <SpecialArea
            onViewMoreGoods={() => {
              this.viewMoreGoods(11)
            }}
            title="09:00 精致生活"
            slogan="9点，9件，小家电见证你长9的幸福生活！"
            goodsList={this.state.nineGoods}
            onViewGoodsDetail={this.viewGoodsDetail}
            hideMoreGoodsEntry={true}
          />
          <SpecialArea
            onViewGoodsDetail={this.viewGoodsDetail}
            title="19:00 手机秒杀"
            slogan="价值3600元的手机，抢到就是赚到！不说了！开抢！"
            goodsList={this.state.nineteenGoods}
            hideMoreGoodsEntry={true}
          />
        </section>

        {/*活动说明*/}
        <section className="explain">
          <p>会员日活动说明：</p>
          <p> 1、每月9号会员日，仅会员可参与兑换；</p>
          <p> 2、每期活动商品会根据实际情况调整，具体以活动页面为准；</p>
          <p> 3、本活动最终解释权归她社区</p>
        </section>
      </section>
    )
  }
}

// 专场Tab
function Tab(props) {
  const { tabList } = props
  return (
    <section className="tab">
      {
        Array.isArray(tabList) && tabList.length ? tabList.map(tabItem => {
          return (
            <div className="tab-item" key={tabItem.classifyId}>
              <div className="corner-mark">{tabItem.icon}</div>
              <div className="time">{tabItem.time}</div>
              <div className="state">{tabItem.state}</div>
            </div>
          )
        }) : null
      }
    </section>
  )
}

function SpecialAreaGoodsList(props) {
  const { goodsList } = props
  return (
    <section className="goods-list">
      {
        goodsList.map((goodsItem) => {
          return (
            <div className="goods-item" key={goodsItem.goodsId} onClick={() => {
              props.onViewGoodsDetail(goodsItem.goodsId)
            }}>
              <div className="img">
                <img src={goodsItem.mainImage} alt="" />
              </div>
              <div className="name">{goodsItem.goodsName}</div>
              <div className="price">{goodsItem.coinPrice}金币</div>
            </div>
          )
        })
      }
    </section>
  )
}

// 专场内容
function SpecialArea(props) {
  const { goodsList, title, slogan, goodsCount } = props
  const hideMoreGoodsEntry = props.hideMoreGoodsEntry || false // 更多产品
  return (
    <section className="special-area">
      <header>
        <div className="title">
          <img src={require("../../common/images/icon-rush.png")} alt="" />
          <p>{title}</p>
        </div>
        {/*标语*/}
        <div className="slogan">{slogan}</div>
      </header>
      {
        goodsList.length > 1
          ? <SpecialAreaGoodsList goodsList={goodsList} onViewGoodsDetail={props.onViewGoodsDetail} />
          :
          goodsList.length > 0 ?
            <section className="phone-content" onClick={() => {
              props.onViewGoodsDetail(goodsList[0].goodsId)
            }}>
              <div className="mark">必抢</div>
              <div className="goods-img" >
                <img src={goodsList[0].mainImage} alt="" />
              </div>
              <div className="goods-else">
                <div className="goods-info">
                  <div className="name">{goodsList[0].goodsName}</div>
                  <div className="price">{goodsList[0].coinPrice}金币</div>
                  <div className="raw-price">￥{goodsList[0].cashPrice}</div>
                </div>
                <div className="rush-btn">马上抢 <span>>></span></div>
              </div>
            </section>
            : null
      }

      {
        !hideMoreGoodsEntry ? <div className="view-all-btn" onClick={props.onViewMoreGoods}>查看全部件商品 >></div> : null
      }
    </section>
  )
}

const mapStateToProps = state => {
  return {
    isVip: state.userReducer.isVip
  }
}

export default connect(mapStateToProps)(VipDay)