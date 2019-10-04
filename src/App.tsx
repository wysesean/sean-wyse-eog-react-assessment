import Chart from './components/Chart';
import ChartHeader from './components/ChartHeader';
import createStore from './store';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import React from 'react';
import UIThemes from './themes/ui-themes';
import Wrapper from './components/Wrapper';
import {
  cacheExchange,
  createClient,
  fetchExchange,
  Provider as ProviderGraphql,
  subscriptionExchange
  } from 'urql';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();
const subscriptionClient = new SubscriptionClient(
  "wss://react.eogresources.com/graphql",
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
