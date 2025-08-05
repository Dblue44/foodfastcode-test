import {Providers} from "@app/providers";
import {AppRouter} from "@app/routes";

function App() {
  return (
    <Providers>
      <AppRouter/>
    </Providers>
  )
}

export default App
