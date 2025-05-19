import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './index.css';
import App from './App';
import Header from './components/pagesComponents/Header'

const root = document.getElementById("root");
const isLoggedIn = localStorage.getItem("isLoggedIn");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn}/>
      <main className='px-8 pb-8'>
        <App />
      </main>
    </BrowserRouter>
  </React.StrictMode>
);
