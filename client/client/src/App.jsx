import './App.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Cards from './components/Card';


function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Cards />,
     
     
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;
