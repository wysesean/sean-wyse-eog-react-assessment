import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Chart from "./components/Chart";
import ChartHeader from "./components/ChartHeader";
import UIThemes from "./themes/ui-themes";
import {
  Provider as ProviderGraphql,
  createClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";

const store = createStore();
const subscriptionClient = new SubscriptionClient(
  "ws://react.eogresources.com/graphql",
  {}
);
const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});
const theme = createMuiTheme({
  palette: { ...UIThemes.palette }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ProviderGraphql value={client}>
        <Wrapper>
          <Header />
          <ChartHeader />
          <Chart />
          <ToastContainer />
        </Wrapper>
      </ProviderGraphql>
    </Provider>
  </MuiThemeProvider>
);

export default App;
