import { GETHOMEPAGEDATA } from '@types/homeTypes'
import * as IndexServer from '@API/home.js'

// 获取首页信息
export const getHomePageData = () => async dispatch => {
  const homeData = await IndexServer.coinsMallHomePage().then(res => res.data)
  return dispatch({
    type: GETHOMEPAGEDATA,
    homeData
  })
}
