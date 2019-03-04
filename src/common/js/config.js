const fetchUrl =
  process.env.NODE_ENV === 'development' ? 'https://wechat-mp-test.j.cn' :
    process.env.NODE_ENV === 'production' ? 'https://bbs.j.cn' : ''
export default fetchUrl