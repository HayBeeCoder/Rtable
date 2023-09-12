import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";
import { StrictMode } from "react";
import ReactTableContextProvider from "./stores/ReactTableContextProvider";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactTableContextProvider>
        <App />
      </ReactTableContextProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </StrictMode>,
  rootElement
);
