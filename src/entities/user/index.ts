export {
  default as userReducer,
  logout
} from './model/userSlice'
export {sendCode, checkCode} from './model/userThunk'
export {selectUserType, selectAccessToken, selectIsLoading} from './model/selector'
