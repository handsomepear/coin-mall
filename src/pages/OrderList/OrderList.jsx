import React, { Component } from 'react'
import { withRouter } from 'react-router'
class OrderList extends Component {
  render() {
    return (
      <div className="order-detail-page">
        <div className="txt">order-list</div>
      </div>
    )
  }
}

export default withRouter(OrderList)