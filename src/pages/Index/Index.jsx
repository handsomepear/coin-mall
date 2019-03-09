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
    this.props.homeActions.getHomePageData()
    // this.props.goodsActions.getGoodsList()
  }

  componentDidMount() {
  }

  goDetailPage() {
    this.props.history.push('/goods-detail/' + 213)
  }

  render() {

    return (
      <section className="index-page">
        {/* banner */}
        <section className="banner"></section>
        {/* coin-info */}
        <section className="coin-info"></section>
        {/* nav-con */}
        <section className="nav-con"></section>
        {/* recommend */}
        <section className="recommend-con">
          <div className="title">精选推荐 <span>POPULAR</span></div>
        </section>
      </section>
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
