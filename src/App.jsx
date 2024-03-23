import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from './page/routs/components/Root';
import Home from './page/Home/components/Home';
import Categories from './page/categories/components/Categories';
import Login from './page/login/components/Login';
import Register from './page/register/components/Register';
import Notfound from './components/Notfound';
import Cart from './page/Cart/components/Cart';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import UnProtectedRoutes from './components/auth/UnProtectedRoutes';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/categories',
          element: <Categories />
        },
        {
          path: '/login',
          element:
            <UnProtectedRoutes>
              <Login />
            </UnProtectedRoutes>
        },
        {
          path: '/register',
          element:
            <UnProtectedRoutes>
              <Register />
            </UnProtectedRoutes>
        },
        {
          path: '/cart',
          element:
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
        },
        {
          path: '*',
          element: <Notfound />
        },
      ]
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
