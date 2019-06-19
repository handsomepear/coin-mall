  import { GETHOMEPAGEDATA, SETPREVPATHNAME, SETINDEXSCROLLPOSITION } from '@types/homeTypes'
import * as IndexServer from '@API/home.js'
import store from '@store'
// 获取首页信息
export const getHomePageData = () => async dispatch => {
  const homeData = await IndexServer.coinsMallHomePage().then(res => res.data)
  return dispatch({
    type: GETHOMEPAGEDATA,
    homeData
  })
}

// 设置首页信息
export const setIndexScrollPosition = (scrollPositionY) => store.dispatch({
  type: SETINDEXSCROLLPOSITION,
  scrollPositionY: scrollPositionY
})


export const setPrevpathname = pathname => store.dispatch({ type: SETPREVPATHNAME, prevPathname: pathname })