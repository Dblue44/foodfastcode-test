export {
  default as userReducer,
  logout,
  setCrumbs,
  clearCrumbs,
  setShowIntro
} from './model/userSlice'
export {sendCode, checkCode, getUser} from './model/userThunk'
export {selectUserBase, selectCrumbs, selectAccessToken, selectShowInto} from './model/selector'
