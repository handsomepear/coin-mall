import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { ListView } from 'antd-mobile'

import * as goodsActions from '../../store/actions/goodsActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ClassifyItem from '@/components/ClassifyItem/ClassifyItem'

class ClassifyList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      positionId: 0,
      pageNum: 1,
      pageSize: 10,
      isLoading: false, // 是否正在加载中
      hasMoreGoods: true // 是否还有更多订单
    }
    this.getClassifyGoodsList = this.getClassifyGoodsList.bind(this)
  }

  componentWillMount() {
    const positionId = this.props.match.params.positionId
    this.setState({ positionId })
    this.getClassifyGoodsList(positionId)
  }

  // 获取分类列表
  async getClassifyGoodsList(positionId) {
    let pageNum = this.state.pageNum
    const pageSize = this.state.pageSize
    // 正在加载中 || 没有更多订单
    if (this.state.isLoading || !this.state.hasMoreGoods) {
      return false
    }
    this.setState({
      isLoading: true
    })
    const { data } = await this.props.goodsActions.getClassifyGoodsList(positionId, pageNum, pageSize)
    this.setState({
      isLoading: false
    })
    console.log(data)
    if (data.hasMoreGoods) {
      this.setState({
        pageNum: ++pageNum
      })
    } else {
      // 表示已经没有更多数据了
      this.setState({
        hasMoreGoods: false
      })
    }
  }


  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    const classifyGoodsList = dataSource.cloneWithRows(this.props.classifyGoodsList)
    return (
      <div className="order-list-page">
        {
          this.props.classifyGoodsList.length ?
            <ListView
              dataSource={classifyGoodsList} // 渲染的数据
              renderRow={ClassifyItem} // 单条数据
              initialListSize={10} // 初次渲染的数据条数
              scrollRenderAheadDistance={500} // 接近屏幕范围多少像素开始渲染
              onEndReached={() => {
                this.getClassifyGoodsList(this.state.positionId)
              }} // 上拉加载事件
              pageSize={this.state.pageSize}
              useBodyScroll
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.hasMoreOrder ? '加载中...' : '已经没有更多了'}
              </div>)}
            />
            :
            null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    classifyGoodsList: state.goodsReducer.classifyGoodsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassifyList))