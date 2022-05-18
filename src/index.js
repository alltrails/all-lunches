import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import 'focus-visible';

import store from 'store';

import App from './components/App';
import ErrorBoundary from './components/shared/ErrorBoundary';
import ToastManager from './components/ToastManager';
import { GlobalStyle } from './styles/global';

const container = document.getElementById('root');

if (container) {
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <ToastManager />
      </ErrorBoundary>
      <GlobalStyle />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            border: '1px solid #428813',
            marginTop: '36px',
          },
        }}
      />
    </Provider>,
    container,
  );
}
