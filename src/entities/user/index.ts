export {
  default as userReducer,
  logout,
  setPageName
} from './model/userSlice'
export {sendCode, checkCode, getUser} from './model/userThunk'
export {selectUserBase, selectPageName, selectAccessToken} from './model/selector'
