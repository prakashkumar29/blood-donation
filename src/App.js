import { BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import PageNotFound from "./assets/error.jpg";

function App() {
  return (
    <>
      <ErrorBoundary
        fallback={
          <div style={{ width: "80%", margin: "0 auto" }}>
            <img
              style={{ width: "100%", height: "99vh" }}
              src={PageNotFound}
              alt=""
            />
          </div>
        }
      >
        <BrowserRouter>
          <Provider store={store}>
            <Root />
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
