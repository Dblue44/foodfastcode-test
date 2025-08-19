import { createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { logout } from '@entities/user'
import type {ErrorLineType} from "@shared/types";
import {toast} from "sonner";
import { AlertCircleIcon } from "lucide-react";
import {clearPlaces} from "@entities/place";
import {clearClients} from "@entities/client";
import {clearCategories} from "@entities/category";
import {clearProducts} from "@entities/product";


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
    api.dispatch(clearPlaces())
    api.dispatch(clearClients())
    api.dispatch(clearCategories())
    api.dispatch(clearProducts())
  },
})