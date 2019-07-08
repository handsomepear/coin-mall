import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Toast } from 'antd-mobile'
import { _getQueryString, _send1_1 } from '@/common/js/tool'
import { fetchCSJVideoStatus, fetchInteractiveAdList, reportInteractiveAdAction } from '@/API/ad'

import * as homeActions from '@actions/homeActions'

import './sideButton.scss'


// 激励视频关闭
const reward = {
  rewardVerify: false, // 是否获得奖励
  rewardAmount: 0, // 奖励个数
  rewardName: '' // 奖励名称
}

class SideButton extends Component {

  slotId = 0

  constructor(props) {
    super(props)
    this.state = {
      CAN_PLAY_JVIDEO: false,
      adInfo: null
    }
    window.SideButtonContext = this
  }

  adClickHandler = () => {


    const adInfo = this.state.adInfo
    if (adInfo.promoType === 2) {
      // 激励视频

      this.slotId = _getQueryString('jcnsource') === 'ios' ? adInfo.iosCodePosition : adInfo.androidCodePosition
      _send1_1('coinmall-click-' + this.state.adInfo.id, 'interact-ad', function () {
        window.app_interface &&
        window.app_interface.showTouTiaoRewardVideo(this.slotId)
      })
    } else if (adInfo.promoType === 1) {
      // 普通链接
      _send1_1('coinmall-click-' + this.state.adInfo.id, 'interact-ad', function () {
        window.location.href = adInfo.promoUrl
      })
    }
  }

  componentDidMount() {
    this.fetchInteractiveAdList()
  }

  // 互动广告上报
  reportInteractiveAdAction = () => {
    reportInteractiveAdAction({
      adId: this.state.adInfo.id,
      app: 'hers',
      jcnappid: _getQueryString('jcnappid'),
      v: _getQueryString('v')
    })
  }

  // 获取激励视频信息
  async fetchCSJVideoStatus(status) {
    const res = await fetchCSJVideoStatus({ id: this.slotId }).then(res => res.data)
    this.setState({ CAN_PLAY_JVIDEO: res.watchCount === 0 })
    if (status === 'update') {
      // 激励视频观看完毕之后更新用户信息（金币）
      this.props.homeActions.getHomePageData()
    }
  }

  // 获取互动广告悬浮按钮信息
  async fetchInteractiveAdList() {
    const adInfoList = await fetchInteractiveAdList({
      app: 'hers',
      channelId: 7,
      jcnappid: _getQueryString('jcnappid'),
      v: _getQueryString('v'),
      requestTimestamp: new Date().getTime()
    }).then(res => res.data.adInfoList)
    this.setState({ adInfo: adInfoList[0] })
    if (adInfoList[0] && adInfoList[0].promoType === 2) {
      this.fetchCSJVideoStatus() // 加载激励视频播放次数信息
    }
    if (adInfoList[0]) {
      _send1_1('coinmall-show-' + this.state.adInfo.id, 'interact-ad')
    }
  }

  render() {
    const adInfo = this.state.adInfo
    let renderHtml = null
    if (adInfo) {
      if (adInfo.promoType === 2) {
        // 激励视频
        if (this.state.CAN_PLAY_JVIDEO) {
          renderHtml = <div className="j-video-com" onClick={this.adClickHandler}>
            <img src={this.state.adInfo.promoIconUrl} alt="" />
          </div>
        }
      } else if (adInfo.promoType === 1) {
        renderHtml = <div className="j-video-com" onClick={this.adClickHandler}>
          <img src={this.state.adInfo.promoIconUrl} alt="" />
        </div>
      }
    }
    return renderHtml
  }
}

window.onToutiaoVideoAdClose = function () {
  if (parseInt(reward.rewardVerify) === 1 || reward.rewardVerify === true) {
    // 可以观看并获得奖励
    if (window.SideButtonContext.state.CAN_PLAY_JVIDEO) {
      Toast.info(reward.rewardName + '+' + reward.rewardAmount, 2, () => {
        window.SideButtonContext.fetchCSJVideoStatus('update')
        window.SideButtonContext.reportInteractiveAdAction()
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
})(SideButton)