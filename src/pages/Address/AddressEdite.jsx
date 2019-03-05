import React, { Component } from 'react'

import { withRouter } from 'react-router'
import { Picker, List } from 'antd-mobile'
import districtData from '@common/js/_area'

class AddressEdite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickerValue: []
    }
    this.setAddress = this.setAddress.bind(this)
  }

  setAddress(v) {
    this.setState({ pickerValue: v })
    const province = districtData.find(item => item.value === v[0])
    const city = province.children.find(item => item.value === v[1])
    const county = city.children.find(item => item.value === v[2])

    console.log(province.label, city.label, county.label)

  }

  render() {
    return (
      <div className="address-edit-page">
        <Picker
          data={districtData}
          title="选择地区"
          extra="请选择(可选)"
          value={this.state.pickerValue}
          onChange={this.setAddress}
        >
          <List.Item arrow="horizontal">213</List.Item>
        </Picker>
      </div>
    )
  }
}


export default withRouter(AddressEdite)