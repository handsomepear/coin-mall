import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import * as goodsActions from '../../store/actions/goodsActions'

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
        <ul>
          {
            goodsList && goodsList.length > 0 ?
              goodsList.map(item => <li key={item.taskId}>{item.name}</li>) : null
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    goodsList: state.goodsReducer.goodsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goodsActions: bindActionCreators(goodsActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))
