export function _getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}


export function _timeFormate(ms) {
  const date = new Date(ms)
  let M = date.getMonth() + 1
  M = M > 9 ? M : `0${M}`
  let d = date.getDate()
  d = d > 9 ? d : `0${d}`
  let h = date.getHours()
  h = h > 9 ? h : `0${h}`
  let m = date.getMinutes()
  m = m > 9 ? m : `0${m}`
  return { M, d, h, m }
}