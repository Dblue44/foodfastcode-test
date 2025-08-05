import type {FallbackProps} from 'react-error-boundary'

export function GlobalFallback({error, resetErrorBoundary}: FallbackProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center border-2 border-gray-900 dark:border-white p-12 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Something went wrong
        </h1>
        <span className="text-lg text-gray-700 mb-6">
          Message: {error?.message}
        </span>
        <button className="px-6 py-2 bg-black text-white rounded hover:shadow-gray-700 hover:shadow-lg/30 dark:bg-white dark:text-gray-700 transition" onClick={resetErrorBoundary}>Попробовать ещё раз</button>
      </div>
    </div>
  )
}
