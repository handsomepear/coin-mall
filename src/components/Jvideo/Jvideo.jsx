import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Toast } from 'antd-mobile'
import { _getQueryString, _send1_1 } from '@/common/js/tool'
import { fetchCSJVideoStatus } from '@/API/ad'

import * as homeActions from '@actions/homeActions'

import './jvideo.scss'



// 激励视频关闭
const reward = {
  rewardVerify: false, // 是否获得奖励
  rewardAmount: 0, // 奖励个数
  rewardName: '' // 奖励名称
}

class Jvideo extends Component {

  slotId = _getQueryString('jcnsource') === 'ios' ? '904992455' : '904991448'

  constructor(props) {
    super(props)
    this.state = {
      CAN_PLAY_JVIDEO: false
    }
    window.JvideoContext = this
  }

  viewJvideo = () => {
    _send1_1('coinmall-click', 'interact-ad')
    window.app_interface &&
    window.app_interface.showTouTiaoRewardVideo(this.slotId)
  }

  componentDidMount() {
    this.fetchCSJVideoStatus()
  }

  async fetchCSJVideoStatus(status) {
    const res = await fetchCSJVideoStatus({ id: this.slotId }).then(res => res.data)
    if(res.watchCount === 0) {
      _send1_1('coinmall-show', 'interact-ad')
    }
    this.setState({ CAN_PLAY_JVIDEO: res.watchCount === 0 })
    if(status === 'update') {
      // 激励视频观看完毕之后更新用户信息（金币）
      this.props.homeActions.getHomePageData()
    }
  }

  render() {
    return (
      this.state.CAN_PLAY_JVIDEO ?
        <div className="j-video-com" onClick={this.viewJvideo}>
          <img src="https://image.guang.j.cn/static/imgs/j-video-icon1.gif" alt="" />
        </div> :
        null
    )
  }
}

window.onToutiaoVideoAdClose = function () {
  if (parseInt(reward.rewardVerify) === 1 || reward.rewardVerify === true) {
    // 可以观看并获得奖励
    if (window.JvideoContext.state.CAN_PLAY_JVIDEO) {
      Toast.info(reward.rewardName + '+' + reward.rewardAmount, 2, () => {
        window.JvideoContext.fetchCSJVideoStatus('update')
      })
    }
  }
}
// 激励视频获得奖励
window.onToutiaoVideoAdVerify = function (rewardVerify, rewardAmount, rewardName) {
  reward.rewardVerify = rewardVerify
  reward.rewardAmount = rewardAmount
  reward.rewardName = rewardName
}

export default connect(() => ({}), dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
})(Jvideo)