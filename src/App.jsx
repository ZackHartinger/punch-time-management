import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NewHoursPage from './pages/NewHoursPage';
import ViewHoursPage from './pages/ViewHoursPage';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/new-hours' element={<NewHoursPage />} />
        <Route path='/view-hours' element={<ViewHoursPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App
