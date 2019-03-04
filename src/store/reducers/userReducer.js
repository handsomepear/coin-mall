import * as types from '../types/userTypes'
import { _getQueryString } from '../../common/js/tool'

const initialState = {
  jcnuserid: _getQueryString('jcnuserid')
}


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETJCNUSERID:
      return {
        ...state,
        jcnuserid: action.jcnuserid
      }
    default:
      return state
  }
}


export default userReducer