import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { Carousel, ListView } from 'antd-mobile'

import GoodsItem from '@/components/GoodsItem/GoodsItem'

import * as goodsActions from '../../store/actions/goodsActions'
import * as homeActions from '../../store/actions/homeActions'

import { _timeFormate } from '@/common/js/tool'

//css
import './index.scss'

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      pageSize: 10,
      hasMoreGoods: true
    }
    this.goDetailPage = this.goDetailPage.bind(this)
    Index.coverTime = Index.coverTime.bind(this)
    this.goClassifyListPage = this.goClassifyListPage.bind(this)
    this.getGoodsList = this.getGoodsList.bind(this)
    this.goOrderListPage = this.goOrderListPage.bind(this)
  }

  componentWillMount() {
    this.props.homeActions.getHomePageData()
    this.getGoodsList()
  }


  goDetailPage() {
    this.props.history.push('/goods-detail/' + 2)
  }

  goClassifyListPage(positionId) {
    this.props.history.push('/classify-list/' + positionId)
  }

  async getGoodsList() {
    let pageNum = this.state.pageNum
    const pageSize = this.state.pageSize
    const { data } = await this.props.goodsActions.getGoodsList(pageNum, pageSize)
    if (data.hasMoreGoods) {
      this.setState({
        pageNum: ++pageNum
      })
    } else {
      this.setState({
        hasMoreGoods: false
      })
    }
  }

  static coverTime(time) {
    const oTime = _timeFormate(time)
    return `${oTime.Y}年${oTime.M}月${oTime.d}日`
  }

  goOrderListPage(){
    console.log(123)
    this.props.history.push('/order-list')
  }

  render() {
    const homeData = this.props.homeData
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    const homeGoodsList = dataSource.cloneWithRows(this.props.homeGoodsList)
    return (
      <section className="index-page">
        {/* banner */}
        <section className="banner">
          <Carousel autoplay infinite>
            {
              homeData.bannerList.map(bannerItem => {
                return (
                  <div className="banner-img" key={bannerItem.bannerId}>
                    {/* 触发 window 的 resize 事件 来改变容器的高度*/}
                    <img src={bannerItem.imageUrl} alt="" onLoad={() => {window.dispatchEvent(new Event('resize'))}} />
                  </div>
                )
              })
            }
          </Carousel>
        </section>
        {/* coin-info */}
        <section className="coin-info">
          <div className="my-coin">
            <div className="num">
              <div className="iconfont coin" />
              我的金币
              <span>{homeData.totalCoin}</span>
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
            <div className="coin-else-item">
              <div className="iconfont rule" />
              金币规则
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
                      this.goClassifyListPage(navItem.positionId)
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
              pageSize={this.state.pageSize}
              useBodyScroll
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.hasMoreOrder ? '加载中...' : '已经没有更多了'}
              </div>)}
            />
            :
            null}

        </section>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    homeGoodsList: state.goodsReducer.homeGoodsList,
    homeData: state.homeReducer.homeData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))
