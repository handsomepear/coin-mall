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

  chooseSkuSelf(skuItem, skuIndex) {
    this.setState({
      chooseSkuIndex: skuIndex
    })
    this.props.chooseSku(skuItem)
  }

  render() {
    return (
      <div className="sku-modal-wrap wrap" onClick={this.props.hideSkuModal}>
        <div className="sku-modal-con" onClick={e => e.stopPropagation()}>
          {/* 商品信息 */}
          <div className="goods-info">
            <div className="goods-pic">
              <img src="https://yun.duiba.com.cn/images/201901/axbg7eq6eg.jpg?x-oss-process=image/quality,Q_80" alt="" />
            </div>
            <div className="goods-price">351400金币</div>
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
                        this.chooseSkuSelf(skuItem, skuIndex)
                      }}>
                        {skuItem.skuName}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }

}


export default SkuModal