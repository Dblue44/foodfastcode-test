import { createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { logout } from '@entities/user'
import type {ErrorLineType} from "@shared/types";

export const authErrorListener = createListenerMiddleware()

authErrorListener.startListening({
  predicate: (action): boolean => {
    if (!isRejectedWithValue(action)) return false
    const payload = (action as { payload?: ErrorLineType }).payload
    return !!payload?.isAuthError
  },
  effect: async (_action, api) => {
    api.dispatch(logout())
  },
})