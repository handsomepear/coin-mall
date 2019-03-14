
import req from '@/common/js/http'

export const coinsMallHomePage = data => req('/api/coinsMallHomePage', data)

export const getTkl = () => req('/api/getTpwd', {}, 'GET') // 获取淘口令