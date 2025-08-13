import { createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { logout } from '@entities/user'
import type {ErrorLineType} from "@shared/types";
import {toast} from "sonner";
import { AlertCircleIcon } from "lucide-react";


export const authErrorListener = createListenerMiddleware()

authErrorListener.startListening({
  predicate: (action): boolean => {
    if (!isRejectedWithValue(action)) return false
    const payload = (action as { payload?: ErrorLineType }).payload
    return !!payload?.isAuthError
  },
  effect: async (_action, api) => {
    toast.info("Ваша сессия истекла", {
      icon: <AlertCircleIcon />,
      richColors: true,
      description: "Авторизуйтесь",
    });
    api.dispatch(logout())
  },
})