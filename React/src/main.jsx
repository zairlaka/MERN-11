import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'


import AuthLayout from "./layouts/auth-layout";
import InstructorLayout from "./layouts/instructor-layout";
import Onboarding from './components/auth/onboarding';

import './index.css'
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/instructor",
    element: <InstructorLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
