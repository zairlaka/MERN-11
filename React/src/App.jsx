import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleware";

import './App.css'


import AuthLayout from "./layouts/auth-layout";
import InstructorLayout from "./layouts/instructor-layout";
import TraineeLayout from "./layouts/trainee-layout";
import Onboarding from './components/auth/onboarding';
import NotFound from "./not-found";


function App() {
  return (
    <Routes path="/">
      <Route path="">
        <Route index element={<AuthLayout />} />
        <Route path="onBoarding" element={<Onboarding />} />
      </Route>
      <Route
        path="instructor"
        element={
          <ProtectedRoute>
            <InstructorLayout />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="trainee"
        element={
          <ProtectedRoute>
            <TraineeLayout />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
