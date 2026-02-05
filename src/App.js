// Root application shell: wires Redux, routing, and lazy boundaries together.
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";
function App() {
  return (
    <Provider store={appStore}>
      <Suspense fallback={<LoadingFallback />}>
        <Body />
      </Suspense>
    </Provider>
  );
}

export default App;
