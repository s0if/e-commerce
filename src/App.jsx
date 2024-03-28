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
import TokenContextProvider from './page/context/components/Token';
import ProdectCategori from './page/prodectcategorie/components/ProdectCategori';
import Products from './page/products/components/Products';
import SendCode from './page/forgetPassword/components/SendCode';
import Forget from './page/forgetPassword/components/Forget';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TokenContextProvider>
        <Root />
      </TokenContextProvider>
      ,
      children: [
        {
          path: '/forget',
          element: <Forget />
        },
        {
          path: "/sendcode",
          element: <SendCode />
        },
        {
          path: "/products",
          element: <Products />
        },
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
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/cart',
          element:
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
        },
        {
          path: '/prodectcategorie/:id/:name',
          element:
            <ProtectedRoutes>
              <ProdectCategori />
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
      <TokenContextProvider>
        <RouterProvider router={router} />
      </TokenContextProvider>
      <ToastContainer />
    </>
  )
}

export default App
