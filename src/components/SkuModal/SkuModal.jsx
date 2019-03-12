import React, { Component } from 'react'


import './skuModal.scss'

class SkuModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseSkuIndex: null
    }
    this.chooseSkuSelf = this.chooseSkuSelf.bind(this)
  }

  componentWillMount() {
    if (this.props.choosedSkuInfo) {
      const chooseSkuIndex = this.props.skuList.findIndex(skuItem => skuItem.skuId === this.props.choosedSkuInfo.skuId)
      this.setState({ chooseSkuIndex })
    }
  }

  chooseSkuSelf(skuIndex) {
    this.setState({
      chooseSkuIndex: skuIndex
    })
  }

  render() {
    return (
      <div className="sku-modal-wrap wrap" onClick={this.props.hideSkuModal}>
        <div className="sku-modal-con" onClick={e => e.stopPropagation()}>
          {/* 商品信息 */}
          <div className="goods-info">
            <div className="goods-pic">
              <img src={this.props.mainImage} alt="" />
            </div>
            <div className="goods-price">{this.props.coinPrice}金币</div>
          </div>
          {/* 规格参数 */}
          <div className="sku-con">
            <div className="head">选择尺码</div>
            <ul className="sku-list">
              {
                this.props.skuList.map((skuItem, skuIndex) => {
                  return (
                    <li className={['sku-item', this.state.chooseSkuIndex === skuIndex ? 'active' : ''].join(' ')} key={skuItem.skuId}>
                      <div className="sku-item-con" onClick={() => {
                        this.chooseSkuSelf(skuIndex)
                      }}>
                        {skuItem.skuName}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {/*确定按钮*/}
          <div
            className={["confirm-btn", this.state.chooseSkuIndex === null ? 'bg-gray' : ''].join(' ')}
            onClick={() => {
              if (this.state.chooseSkuIndex !== null) {
                this.props.chooseSku(this.props.skuList[this.state.chooseSkuIndex])
                this.props.hideSkuModal()
              }
            }}
          >确定
          </div>
        </div>
      </div>
    )
  }

}


export default SkuModal