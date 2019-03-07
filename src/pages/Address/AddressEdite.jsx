import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import * as userActions from '@actions/userActions'
import { Picker, List, InputItem, TextareaItem } from 'antd-mobile'
import districtData from '@common/js/_area'
import arrayTreeFilter from 'array-tree-filter'
import './AddressEdite.scss'


class AddressEdite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      region: '',
      regionCode: [],
      userName: '',
      phone: '',
      detailLocation: '' // 详细地址
    }
    this.getRegion = this.getRegion.bind(this)
    this.saveAddress = this.saveAddress.bind(this)
  }

  componentWillMount() {
    const address = this.props.address
    if(address) {
      this.setState({
        region: address.area,
        userName: address.userName,
        phone: address.cellNumber,
        detailLocation: address.detailLocation
      })
    }
  }


  // 根据code找到对应的省市区名称
  getRegion(regionCodeArr) {
    this.setState({ regionCode: regionCodeArr })
    const oRegion = arrayTreeFilter(
      districtData, (item, index) => item.value === regionCodeArr[index]
    )
    const region = oRegion.map(item => item.label).join(' ')
    this.setState({
      region
    })
  }

  saveAddress() {
    // this.props.userActions.saveAddress()
    console.log(this.state)
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
            onChange={v => {
              this.setState({ userName: v })
            }}
          >收货人</InputItem>
          <InputItem
            type="phone"
            placeholder="收货人的电话，方便联系"
            clear={true}
            value={this.state.phone}
            onChange={v => {
              this.setState({ phone: v })
            }}
          >手机号码</InputItem>
          <Picker
            data={districtData}
            extra={this.state.region || '请选择'}
            value={this.state.regionCode}
            onChange={this.getRegion}
          >
            <List.Item>所在地区</List.Item>
          </Picker>
          <TextareaItem
            title="详细地区"
            placeholder="如小区、楼栋号、门牌号等"
            rows="2"
            clear={true}
            value={this.state.detailLocation}
            onChange={v => {
              this.setState({ detailLocation: v })
            }}
          />
        </List>

        <div className="button-con">
          <div className="cancel" onClick={() => {this.props.history.go(-1)}}>取消</div>
          <div className="save" onClick={this.saveAddress}>保存</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    address: state.userReducer.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressEdite))