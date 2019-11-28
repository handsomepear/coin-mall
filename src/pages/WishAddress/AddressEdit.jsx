import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { Picker, List, InputItem, TextareaItem, Toast } from 'antd-mobile'
import arrayTreeFilter from 'array-tree-filter'

import { _send1_1 } from '@/common/js/tool'
import * as userActions from '@actions/userActions'
import * as homeActions from '@actions/homeActions'
import * as orderActions from '@actions/orderActions'
import districtData from '@common/js/_area'

import './AddressEdit.scss'

class ConfirmModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  cancelHandle = () => {
    this.props.hideConfirmModal()
  }
  confirmHandle = () => {
    this.props.confirmHandle()
  }

  render() {
    const props = this.props
    return (
      <div className="get-succ-wrap modal-wrap">
        <div className="get-succ-modal">
          <div className="modal-main">
            <div className="modal-title">{props.title}</div>
            <div className="modal-tip">{props.tips}</div>
          </div>
          <div className="modal-action">
            <div className="withhold-btn" onClick={this.cancelHandle}>{props.cancelText}</div>
            <span className="line"/>
            <div className="view-btn" onClick={this.confirmHandle}>{props.confirmText}</div>
          </div>
          <div className="close-btn">
            <img src="https://image.guang.j.cn/static/imgs/close-btn.png" alt="" />
          </div>
        </div>
      </div>
    )
  }
}


class AddressEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      region: '',
      regionCode: [],
      userName: '',
      phone: '',
      detailLocation: '', // 详细地址
      isShowConfirmAddressModal: false,
    }
  }

  componentDidMount() {
    _send1_1('address-show', 'golden-egg-task')
    const address = this.props.address
    if (address) {
      this.setState({
        region: address.area,
        userName: address.userName,
        phone: address.cellNumber,
        detailLocation: address.detailLocation
      })
    }
    this.props.homeActions.setPrevpathname('/address')
  }


  handlerUsernameInputChange = v => {
    this.setState({ userName: v })
  }

  handlePhoneInputChange = v => {
    this.setState({ phone: v })
  }

  handleDetailLocationInputChange = v => {
    this.setState({ detailLocation: v })
  }

  cancelSave = () => {
    // this.props.history.go(-1)
    window.history.go(-1)
  }


  // 根据code找到对应的省市区名称
  getRegion = regionCodeArr => {
    this.setState({ regionCode: regionCodeArr })
    const oRegion = arrayTreeFilter(
      districtData, (item, index) => item.value === regionCodeArr[index]
    )
    const region = oRegion.map(item => item.label).join(' ')

    this.setState({ region })
  }

  // 保存地址
  checkAddress = () => {
    _send1_1('address-get', 'golden-egg-task')
    // const ph = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    const ph = /^1\d{10}$/
    if (!this.state.userName) {
      return Toast.fail('请输入收货人')
    }
    if (!this.state.phone) {
      return Toast.fail('请输入手机号码')
    }
    if (!ph.test(this.state.phone.replace(/\s/g, ''))) {
      return Toast.fail('请输入正确的手机号码')
    }
    if (!this.state.region) {
      return Toast.fail('请选择地区')
    }
    if (!this.state.detailLocation) {
      return Toast.fail('请输入详细地址')
    }
    _send1_1('address-confirm-show', 'golden-egg-task')
    this.setState({
      isShowConfirmAddressModal: true
    })

  }

  saveAddress = async () => {
    _send1_1('address-confirm-click', 'golden-egg-task')
    let regionArray = this.state.region.split(' ')
    const { data } = await this.props.userActions.saveAddress({
      cellNumber: this.state.phone.replace(/\s/g, ''),
      province: regionArray[0],
      city: regionArray[1],
      county: regionArray[2],
      detailLocation: this.state.detailLocation,
      userName: this.state.userName
    })
    // 处理异常 TODO:如何优雅的处理这类型异常
    if (data.errCode === 0) {
      const { vowOrderRes } = await this.props.orderActions.vowEggMakeOrder({
        skuId: 0,
        vowId: this.props.match.params.vowId,
        channel: 0
      })
      if (0 === vowOrderRes.data.errCode) {
        _send1_1('get-success-show', 'golden-egg-task')
        this.setState({
          isShowConfirmAddressModal: false
        })
        window.history.go(-1)
      }
    } else {
      this.setState({
        isShowConfirmAddressModal: false
      })
      Toast.fail('保存失败，请稍后重试', 2)
    }
  }

  hideConfirmModal = () => {
    this.setState({
      isShowConfirmAddressModal: false,
    })
  }
  viewOrderList = () => {
    _send1_1('get-success-click', 'golden-egg-task')
    this.props.history.push('/order-list')
  }

  render() {
    return (
      <div className="address-edit-page">
        <List>
          <InputItem
            type="text"
            placeholder="请输入收货人名字"
            clear={true}
            value={this.state.userName}
            onChange={this.handlerUsernameInputChange}
          >收货人</InputItem>
          <InputItem
            type="phone"
            placeholder="收货人的电话，方便联系"
            clear={true}
            value={this.state.phone}
            onChange={this.handlePhoneInputChange}
          >手机号码</InputItem>
          <Picker
            data={districtData}
            extra={this.state.region || ' '}
            value={this.state.regionCode}
            onChange={this.getRegion}
          >
            <List.Item arrow="horizontal">所在地区</List.Item>
          </Picker>
          <TextareaItem
            title="详细地区"
            placeholder="如小区、楼栋号、门牌号等"
            rows="2"
            clear={true}
            value={this.state.detailLocation}
            onChange={this.handleDetailLocationInputChange}
          />
        </List>
        <div className="button-con">
          <div className="cancel" onClick={this.cancelSave}>取消
          </div>
          <div className="save" onClick={this.checkAddress}>领取</div>
        </div>
        {
          this.state.isShowConfirmAddressModal ?
            <ConfirmModal
              title='确认收货信息'
              tips='提交后无法更改'
              cancelText='取消'
              confirmText='确认'
              hideConfirmModal={this.hideConfirmModal}
              confirmHandle={this.saveAddress}
            />
            : null
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch)
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressEdit))