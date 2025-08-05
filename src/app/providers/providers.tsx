import type {FC, JSX} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Provider} from 'react-redux'
import store, {persistor} from '@app/store'
import {PersistGate} from 'redux-persist/integration/react'
import {ThemeProvider} from '@app/providers'
import {GlobalFallback} from "@shared/ui/fallback";
import {SidebarProvider} from "@shared/ui/sidebar";

interface IProviders {
  readonly children: JSX.Element
}

export const Providers: FC<IProviders> = ({children}) => {
  return (
    <SidebarProvider>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
        <GlobalFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
            >
              {children}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </SidebarProvider>
  )
}