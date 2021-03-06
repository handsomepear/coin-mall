import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { Picker, List, InputItem, TextareaItem, Toast } from 'antd-mobile'
import arrayTreeFilter from 'array-tree-filter'


import * as userActions from '@actions/userActions'
import * as homeActions from '@actions/homeActions'
import districtData from '@common/js/_area'


import './AddressEdit.scss'


class AddressEdit extends Component {
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
  }

  componentDidMount() {
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
    this.props.history.go(-1)
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
  saveAddress = async () => {
    // const ph = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    const ph = /^1\d{10}$/
    let regionArray = this.state.region.split(' ')

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
      Toast.success('保存成功', 2, () => {
        this.props.history.go(-1)
      })
    } else {
      Toast.fail('保存失败，请稍后重试', 2)
    }

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
          <div className="save" onClick={this.saveAddress}>保存</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    address: state.userReducer.address,
    prevPathname: state.homeReducer.prevPathname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressEdit))