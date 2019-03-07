

import req from '@common/js/http'

export const coinsMallOrderUserInfo = () => req('/api/coinsMallOrderUserInfo')

export const saveAddress = data => req('/api', data) // 保存地址