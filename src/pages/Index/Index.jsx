import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { Carousel, ListView } from 'antd-mobile'

import GoodsItem from '@/components/GoodsItem/GoodsItem'
import SideButton from '@/components/SideButton/SideButton'

import * as goodsActions from '@actions/goodsActions'
import * as homeActions from '@actions/homeActions'
import * as userActions from '@actions/userActions'
import { _getQueryString, _send1_1, _timeFormate } from '@/common/js/tool'
//css
import './index.scss'

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasMoreGoods: true,
      isLoading: false,
      isIOS: _getQueryString('jcnsource') === 'ios',
      isShowBroadCastList: false // 是否展示广播
    }
  }

  async componentDidMount() {
    if (!this.props.homeData.hasHomeData) {
      await this.props.homeActions.getHomePageData()
      if (this.props.homeData.broadcastList) {
        this.setState({ isShowBroadCastList: true })
        _send1_1('guangbo-show-index')
      }
    }

    this.getGoodsListWrap()
    // 记录滚动条的位置
    document.body.scrollTop = this.props.scrollPositionY
    _send1_1('index')
  }

  goDetailPage = () => {
    this.props.history.push('/goods-detail/' + 2)
  }

  goClassifyListPage = (positionId) => {
    this.props.history.push('/classify-list/' + positionId)
  }

  getGoodsListWrap = () => {
    if (!this.props.homeGoodsList.length) {
      this.getGoodsList()
    }
  }

  getGoodsList = async () => {
    // 正在加载中 || 没有更多订单
    if (this.state.isLoading || !this.props.hasMoreGoods) {
      return false
    }
    this.setState({
      isLoading: true
    })
    let pageNum = this.props.pageNum
    const pageSize = this.props.pageSize
    await this.props.goodsActions.getGoodsList(pageNum, pageSize)
    this.setState({
      isLoading: false
    })
  }

  static coverTime = (time) => {
    const oTime = _timeFormate(time)
    return `${oTime.Y}年${oTime.M}月${oTime.d}日`
  }

  // 去我的订单页面
  goOrderListPage = () => {
    const loggingStatus = this.props.loggingStatus
    if (loggingStatus) {
      this.props.history.push('/order-list')
    } else {
      this.props.userActions.doLogin()
    }
  }

  goCoinTask = () => {
    const loggingStatus = this.props.loggingStatus
    if (loggingStatus) {
      window.location.href = 'https://bbs.j.cn/html/cointask/coin-task.html?from=coinMall'
    } else {
      this.props.userActions.doLogin()
    }
  }

  handleBannerImgLoad = () => {
    window.dispatchEvent(new Event('resize'))
  }

  handleBannerImgClick = bannerItem => {
    window.location.href = bannerItem.redirectUrl
  }

  handleNavItemClick = (navItem) => {
    if (navItem.positionId === 13) {
      // window.location.href = 'https://api.nicetui.cn/niceapi/addpostion/V6SSFOBWV5CX08RY'
      this.props.history.push('/turntable')
    } else if (navItem.positionId === 1) {
      window.location.href = 'https://bbs.j.cn/pages/coin-games/index.html'
    } else {
      this.goClassifyListPage(navItem.positionId)
    }
  }

  renderListViewFooter = () => (
    <div style={{ padding: 30, textAlign: 'center' }}>
      {this.props.hasMoreGoods ? '加载中...' : '已经没有更多了'}
    </div>
  )

  broadcastAfterChange = (index) => {
    const lastIndex = this.props.homeData.broadcastList.length - 1
    if (index === lastIndex) {
      this.timer = setTimeout(() => {
        this.setState({
          isShowBroadCastList: false
        })
        clearTimeout(this.timer)
      }, 3000)
    }
  }

  // 点击进入个人首页
  goRewardUserHome = userId => {
    _send1_1('guangbo-click-index')
    window.location.href = `jcnhers://user_activity/userId=${userId}`
  }

  render() {
    const homeData = this.props.homeData
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    const homeGoodsList = dataSource.cloneWithRows(this.props.homeGoodsList)
    return (
      <section className="index-page">
        {/* 中奖广播 */}
        {
          homeData.broadcastList && homeData.broadcastList.length && this.state.isShowBroadCastList ?
            <section className="broadcast-con">
              <img src={require('../../common/images/broadcast.png')} alt="" />
              <section className="broadcast-list">
                <Carousel autoplay={true} dots={false} vertical={true} afterChange={this.broadcastAfterChange}>
                  {
                    homeData.broadcastList.map(broadcastItem => {
                      return (
                        <div className="broadcast-item" key={broadcastItem.timestamp} onClick={() => {
                          this.goRewardUserHome(broadcastItem.userId)
                        }}>
                          <p>恭喜<span className="username">{broadcastItem.userName}</span>获得了<span
                            className="reward-name">{broadcastItem.goodsName}</span></p>
                          <div className="iconfont arrow-right" />
                        </div>
                      )
                    })
                  }
                </Carousel>
              </section>
            </section>
            : null
        }
        {/* banner */}
        <section className="banner">
          {
            homeData.bannerList && homeData.bannerList.length ?
              <Carousel autoplay infinite>
                {
                  homeData.bannerList.map(bannerItem => {
                    return (
                      <div className="banner-img" key={bannerItem.bannerId}>
                        {/* 触发 window 的 resize 事件 来改变容器的高度*/}
                        <img src={bannerItem.imageUrl}
                             alt=""
                             onLoad={this.handleBannerImgLoad}
                             onClick={() => {
                               this.handleBannerImgClick(bannerItem)
                             }}
                        />
                      </div>
                    )
                  })
                }
              </Carousel>

              :
              null
          }

        </section>
        {/* coin-info */}
        <section className="coin-info">
          <div className="my-coin">
            <div className="num">
              <div className="iconfont coin" />
              我的金币
              <span>{this.props.coinsCount}</span>
            </div>
            <div className="expire-time">
              {homeData.expireCoin || 0} 金币将在{Index.coverTime(homeData.expireTime)}到期
            </div>
          </div>
          <div className="coin-else">
            <div className="coin-else-item" onClick={this.goOrderListPage}>
              <div className="iconfont exchange" />
              兑换记录
            </div>
            <div className="coin-else-item" onClick={this.goCoinTask}>
              <div className="iconfont rule" />
              金币任务
            </div>
          </div>
        </section>
        {/* nav-con */}
        {
          homeData.navigationList.length ?
            <section className="nav-con">
              {
                homeData.navigationList.map(navItem => {
                  return (
                    <div key={navItem.positionId} className="nav-item" onClick={() => {
                      this.handleNavItemClick(navItem)
                    }}>
                      <div className="icon">
                        <img src={navItem.positionImage} alt="" />
                      </div>
                      <div className="name">{navItem.positionName}</div>
                    </div>
                  )
                })
              }
            </section>
            :
            null
        }

        {/* recommend */}
        <section className="recommend-con">
          <header className="title">精选推荐 <span>POPULAR</span></header>
          {this.props.homeGoodsList.length ?
            <ListView
              dataSource={homeGoodsList} // 渲染的数据
              renderRow={GoodsItem} // 单条数据
              initialListSize={10} // 初次渲染的数据条数
              scrollRenderAheadDistance={500} // 接近屏幕范围多少像素开始渲染
              onEndReached={this.getGoodsList} // 上拉加载事件
              pageSize={this.props.pageSize}
              useBodyScroll
              renderFooter={this.renderListViewFooter}
            />
            :
            null}

        </section>
        {
          this.state.isIOS ?
            <section className="bottom-tips">*本次活动与设备生产商Apple.Inc无关</section>
            :
            null
        }
        <SideButton />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    homeGoodsList: state.goodsReducer.homeGoodsList,
    pageNum: state.goodsReducer.pageNum,
    pageSize: state.goodsReducer.pageSize,
    hasMoreGoods: state.goodsReducer.hasMoreGoods,
    homeData: state.homeReducer.homeData,
    loggingStatus: state.userReducer.loggingStatus,
    scrollPositionY: state.homeReducer.indexScrollPositionY,
    coinsCount: state.userReducer.coinsCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))


