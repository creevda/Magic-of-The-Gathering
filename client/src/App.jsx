import './App.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Cards from './components/Card';
import HomePage from './pages/HomePage';


function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;
