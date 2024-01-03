// import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
// import AuthLayout from "./layouts/auth-layout";
// import InstructorLayout from "./layouts/instructor-layout";
// import TraineeLayout from "./layouts/trainee-layout";
// import Onboarding from './components/auth/onboarding';
// import NotFound from "./not-found";


import './index.css'

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthLayout />,
//   },
//   {
//     path: "/onboarding",
//     element: <Onboarding />,
//   },
//   {
//     path: "/instructor",
//     element: <InstructorLayout />,
//   },
//   {
//     path: "/trainee",
//     element: <TraineeLayout />,
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//     {/* <App /> */}
//   </React.StrictMode>,
// )
