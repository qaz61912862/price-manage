import React from 'react';
import './App.css';
import RouterPage from './router'
import store from './store'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <RouterPage />
    </Provider>
  );
}

export default App;
