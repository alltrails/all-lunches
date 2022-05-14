import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../src/store/rootReducer';

const store = createStore(rootReducer);

export default (story) => <Provider store={store}>{story()}</Provider>;
