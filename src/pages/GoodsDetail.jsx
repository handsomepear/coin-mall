import React, {Component} from 'react'


class GoodsDetail extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    // 获取到商品Id
    const goodsId = this.props.match.params.goodsId
  }

  render() {
    return (
      <div className="goods-detail-page">
        商品详情页
      </div>
    )
  }
}


export default GoodsDetail