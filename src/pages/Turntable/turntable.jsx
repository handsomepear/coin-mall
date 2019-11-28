import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Toast } from 'antd-mobile'

import { fetchLuckCoinGameCount, fetchLuckCoinGameResult } from '@/API/turntable'
import { _send1_1 } from '@/common/js/tool'


import './turntable.scss'
import { bindActionCreators } from 'redux'
import * as userActions from '@/store/actions/userActions'

const intime = 50

class Turntable extends Component {
  coinsCountAfterGame = 0 // 中奖之后的金币数，中间变量 延迟展示

  constructor(props) {
    super(props)
    this.state = {
      award: ['0', '99', '50', '10', '25', '5', '66', '40'], // 奖池(根据UI转盘的顺序)
      classNames: ['off', 'off', 'off', 'off', 'off', 'off', 'off', 'off'],
      winIndex: 0,
      gameCount: 0, // 当天已抽奖次数
      showWinModal: false,
      showResultModal: false,
      showFailModal: false,
      toggleLight: false,
      hasStart: false,
      coinsCount: props.coinsCount
    }
  }

  async componentDidMount() {
    _send1_1('index', 'APP-coingame')
    const gameCount = await fetchLuckCoinGameCount().then(res => res.data.gameCount)
    this.setState({ gameCount, coinsCount: this.props.coinsCount })
  }

  // 转盘
  turnTable = () => {
    clearInterval(this.interval)
    let index = 0
    // 循环
    this.interval = setInterval(() => {
      if (index > 7) {
        index = 0
        this.class[7] = 'off'
      } else if (index !== 0) {
        this.class[index - 1] = 'off'
      }
      this.class[index] = 'on'
      this.setState({
        class: this.class,
      })
      index++
    }, intime)
  }

  // 抽奖
  startLottery = async () => {
    if (this.state.hasStart) {
      return false
    }
    _send1_1('start', 'APP-coingame')
    const lotteryResult = await fetchLuckCoinGameResult().then(res => res.data)
    if (lotteryResult) {
      if (lotteryResult.gameCount >= 10) {
        // app.tongji2('mhb-coingame', 'max-show')
        _send1_1('max-show', 'APP-coingame')
        return Toast.fail('今日次数已用完，明天再来呦！', 2)
      }
      if (!lotteryResult.coinsEnoughFlag) {
        // 出金币不足弹窗
        _send1_1('nocoin-show', 'APP-coingame')
        return Toast.fail('金币不足', 2)
      }
      this.setState({ hasStart: true })
      this.turnTable()
      this.coinsCountAfterGame = lotteryResult.coinsCountAfterGame
      let winIndex = this.state.award.findIndex(item => parseInt(item) === lotteryResult.winCoins)
      if (lotteryResult.gameCount > -1) {
        // 第一次不扣除金币
        this.setState({
          coinsCount: this.props.coinsCount - 5,
        })
      }
      this.setState({
        gameCount: lotteryResult.gameCount + 1,
        winIndex: winIndex,
        isWinning: lotteryResult.winIndex > 0
      })

      this.stop(winIndex)
    }
  }

  stop(which) {
    clearInterval(this.interval)
    let current = -1
    for (let i = 0; i < this.state.classNames.length; i++) {
      if (this.state.classNames[i] === 'on') {
        current = i
      }
    }
    let index = current + 1
    this.stopAnimation(which, index, intime, 5)
  }

  /**
   * 终止开奖动画
   * @param which: 中奖位置
   * @param index：当前位置
   * @param time：时间标记
   * @param splitTime：每次增加的时间，值越大减速越快
   */
  stopAnimation(which, index, time, splitTime) {
    const that = this
    setTimeout(() => {
      if (index > 7) {
        index = 0
        that.state.classNames[7] = 'off'

      } else if (index !== 0) {
        that.state.classNames[index - 1] = 'off'
      }
      this.state.classNames[index] = 'on'
      that.setState({
        classNames: this.state.classNames,
        toggleLight: !this.state.toggleLight,
      })
      if (time < 400 || index !== which) {
        splitTime++
        time += splitTime
        //当前位置+1
        index++
        that.stopAnimation(which, index, time, splitTime)
      } else {
        setTimeout(() => {
          that.state.classNames.map((item) => {
            item = 'on'
          })
          that.state.hasStart = false
          that.state.coinsCount = that.coinsCountAfterGame
          that.props.userActions.setCoinsCount(that.coinsCountAfterGame)
          if (this.state.isWinning) {
            that.showWinModalHandler()
            _send1_1('win-show', 'APP-coingame')
          } else {
            that.showFailModalHandler()
            _send1_1('lose-show', 'APP-coingame')
          }
          that.setState(this.state)
        }, 500)
      }
    }, time)
  }

  closeResultModal = (e) => {
    e && e.stopPropagation()
    this.setState({
      showResultModal: false
    })
  }

  showWinModalHandler = () => {
    this.setState({
      showWinModal: true,
      showFailModal: false,
      showResultModal: true
    })
  }

  showFailModalHandler = () => {
    this.setState({
      showWinModal: false,
      showFailModal: true,
      showResultModal: true
    })
  }

  drawAgain = (modal) => {
    this.setState({
      showWinModal: false,
      showFailModal: false,
      showResultModal: false
    })
    if (modal === 'fail') {
      // app.tongji2('mhb-coingame','lose-show-start')
      _send1_1('lose-show-start', 'APP-coingame')
    } else if (modal === 'win') {
      _send1_1('win-show-start', 'APP-coingame')
    }
    this.startLottery()
  }

  render() {
    const coinsCount = this.state.coinsCount || this.props.coinsCount //  金币数
    const { award, classNames, hasStart, winIndex, showResultModal, showWinModal, showFailModal, toggleLight } = this.state
    return (
      <section className="lottery-page">
        <div className="banner">
          <img src="https://image.guang.j.cn/static/imgs/tashequ/banner-bg.jpg" alt="" />
        </div>
        <div className="container">
          {/*<!-- 金币 & 次数 -->*/}
          <div className="diamond-info">
            <div className="diamond">我的金币：
              <span>{coinsCount}</span>
            </div>
            {
              this.state.gameCount === 0 ?
                <div className="lottery-counts">免费次数：
                  <span>1</span>
                  次
                </div>
                :
                <div className="lottery-counts">
                  <span>5</span>
                  金币/每次
                </div>
            }
          </div>
          {/* <!-- 奖池 -->*/}
          <div className="main">
            <div className={`turntable ${toggleLight ? 'on' : ''}`}>
              <div className="award">
                <div className={`award-item ${hasStart ? classNames[0] : ''}`} data-index="0">
                  <img className="smile-img" src="https://image.guang.j.cn/static/imgs/tashequ/smile.png" alt="" />
                  <span>谢谢参与</span>
                </div>
                <div className={`award-item ${hasStart ? classNames[1] : ''}`} data-index="1">
                  <span>99金币</span>
                </div>
                <div className={`award-item ${hasStart ? classNames[2] : ''}`} data-index="2">
                  <span>50金币</span>
                </div>
                <div className={`award-item ${hasStart ? classNames[7] : ''}`} data-index="7">
                  <span>40金币</span>
                </div>
                <div className={`award-item ${hasStart ? 'off' : ''}`} onClick={this.startLottery}>
                  <img className="draw-img" src="https://image.guang.j.cn/static/imgs/tashequ/draw.png" alt="" />
                </div>
                <div className={`award-item ${hasStart ? classNames[3] : ''}`} data-index="3">
                  <span>10金币</span>
                </div>
                <div className={`award-item ${hasStart ? classNames[6] : ''}`} data-index="6">
                  <span>66金币</span>
                </div>
                <div className={`award-item ${hasStart ? classNames[5] : ''}`} data-index="5">
                  <span>5金币</span>
                </div>
                <div className={`award-item ${hasStart ? classNames[4] : ''}`} data-index="4">
                  <span>25金币</span>
                </div>
              </div>
            </div>
          </div>
          {/*// <!-- 活动规则 -->*/}
          <div className="ac-rules">
            <div className="title">活动规则</div>
            <div className="rule-item">每天首次免费，之后5金币/次</div>
            <div className="rule-item">抽奖次数越多，中奖概率越大，每日上限10次。</div>
          </div>
          {/*// <!-- bottom -->*/}
          <div className="copyright">本活动最终解释权归她社区所有</div>
        </div>
        {/*// <!-- 结果弹窗 -->*/}
        {
          showResultModal ?
            <div className="result-modal" onClick={this.closeResultModal}>
              {
                showWinModal ?
                  <div className="win-modal">
                    <div className="close-btn" onClick={e => {
                      this.closeResultModal(e)
                    }}>
                      <img src={require('../../common/images/icon-close2.png')} alt="" />
                    </div>
                    <div className="win-title">恭喜您，中奖啦</div>
                    <div className="win-diamond">{award[winIndex]}金币</div>
                    <img className="win-img" src={require('../../common/images/lottery-coin.png')} alt="" />
                    <div className="win-tips">金币已添加至账号</div>
                    <div className="draw-again" onClick={() => {
                      this.drawAgain('win')
                    }}>好运翻倍，再来一次！
                    </div>
                  </div> : null
              }

              {
                showFailModal ?
                  <div className="fail-modal">
                    <div className="close-btn" onClick={e => {
                      this.closeResultModal(e)
                    }}>
                      <img src={require('../../common/images/icon-close2.png')} alt="" />
                    </div>
                    <div className="fail-title">哎呀，就差那么一点点～</div>
                    <div className="fail-tips">每多抽一次，中奖概率就再翻一倍！</div>
                    <img className="fail-img" src="https://image.guang.j.cn/static/imgs/tashequ/lottery-fail.jpg" mode="widthFix" alt="" />
                    <div className="draw-again" onClick={() => {
                      this.drawAgain('fail')
                    }}>再抽一次
                    </div>
                  </div> : null
              }
            </div>
            :
            null
        }

      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    coinsCount: state.userReducer.coinsCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Turntable))