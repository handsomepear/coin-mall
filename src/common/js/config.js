const baseUrl =
  process.env.NODE_ENV === 'development' ? 'https://bbstest.j.cn' :
    process.env.NODE_ENV === 'production' ? 'https://bbs.j.cn' : ''
export default baseUrl