import req from '@common/js/http'

export const fetchLuckCoinGameCount = () => req('/api/fetchLuckCoinGameCount') // 获取抽奖次数

export const fetchLuckCoinGameResult = () => req('/api/fetchLuckCoinGameResult') // 抽奖