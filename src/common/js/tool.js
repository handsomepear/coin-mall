export function _getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}


export function _timeFormate(ms) {
  const date = new Date(ms)
  const Y = date.getFullYear()
  let M = date.getMonth() + 1
  M = M > 9 ? M : `0${M}`
  let d = date.getDate()
  d = d > 9 ? d : `0${d}`
  let h = date.getHours()
  h = h > 9 ? h : `0${h}`
  let m = date.getMinutes()
  m = m > 9 ? m : `0${m}`
  return { Y, M, d, h, m }
}


export const _send1_1 = (val, channel = 'coin-mall') => {
  const img1x1 = new Image()
  const jcnappid = _getQueryString('jcnappid')
  const jcnuserid = _getQueryString('jcnuserid')
  if (val && typeof val == "string") {
    img1x1.src = "http://share.j.cn/js/1x1.gif?ucs=UTF-8&un=statistic_channel." + channel + "_logname." +
      val + "_login.0&tamp=" + (new Date() - 0) + "&jcnappid=" + encodeURIComponent(jcnappid) + "&jcnuserid=" +
      encodeURIComponent(jcnuserid)
  }
  img1x1.onload = function () {
    console.log('1*1 loaded')
  }
}
