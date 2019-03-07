import React, { Component } from 'react'

import { withRouter } from 'react-router'
import { Picker, List } from 'antd-mobile'
import districtData from '@common/js/_area'
import arrayTreeFilter from 'array-tree-filter'
import './AddressEdite.scss'


class AddressEdite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: [],
      regionCode: [],
    }
    this.getRegion = this.getRegion.bind(this)
  }

  // 根据code找到对应的省市区名称
  getRegion(regionCodeArr) {
    this.setState({ regionCode: regionCodeArr })
    const oRegion = arrayTreeFilter(
      districtData, (item, index) => item.value = regionCodeArr[index]
    )
    const region = oRegion.map(item => item.label)
    this.setState({
      region
    })
  }

  render() {
    return (
      <div className="address-edit-page">
        <Picker
          data={districtData}
          value={this.state.regionCode}
          onChange={this.getRegion}
        >
          <List.Item extra={this.state.region}>
            所在地区
          </List.Item>
        </Picker>
      </div>
    )
  }
}


export default withRouter(AddressEdite)