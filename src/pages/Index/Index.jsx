import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import * as goodsActions from '../../store/actions/goodsActions'
import * as homeActions from '../../store/actions/homeActions'

//css
import './index.scss'

class Index extends Component {

  constructor(props) {
    super(props)
    this.goDetailPage = this.goDetailPage.bind(this)
  }

  componentWillMount() {
    this.props.goodsActions.getGoodsList()
  }

  componentDidMount() {
  }

  goDetailPage() {
    this.props.history.push('/goods-detail/' + 213)
  }

  render() {
    const goodsList = this.props.goodsList
    return (
      <div className="index-page">
        <span className="name">这是一个标记</span>
        <button onClick={this.goDetailPage}>跳转</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    goodsList: state.goodsReducer.goodsList,
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
