const baseUrl =
  process.env.NODE_ENV === 'development' ?
    'https://bbstest.j.cn' :
    process.env.NODE_ENV === 'production' ?
      process.env.REACT_APP_MODE === 'production' ?
        'https://bbs.j.cn'
        :
        process.env.REACT_APP_MODE === 'alpha' ?
          'https://bbstest.j.cn'
          :
          process.env.REACT_APP_MODE === 'pre' ?
            'https://bbspre.j.cn'
            :
            "https://bbstest.j.cn"
      :
      'https://bbstest.j.cn'
export default baseUrl