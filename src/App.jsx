import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NewHoursPage from './pages/NewHoursPage';
import ViewHoursPage from './pages/ViewHoursPage';
import DeleteWorkDayPage from './pages/DeleteWorkDayPage';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import AuthProvider from './hooks/AuthProvider';


function App() {
  // const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
  // useEffect(() => {
  //   fetch(baseUrl + 'AppUsers/is-authenticated', {
  //     credentials: "include"
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       sessionStorage.setItem('isAuthenticated', data)
  //     })
  // }, [isAuthenticated])

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path='/' element={<MainLayout />}>

  //       <Route index element={<HomePage />} />
  //       <Route path='/new-hours' element={<NewHoursPage />} />
  //       <Route path='/view-hours' element={<ViewHoursPage />} />
  //       <Route path='/delete-work-day' element={<DeleteWorkDayPage />} />
  //       <Route path='/log-in' element={<LogIn />} />
  //       <Route path='/sign-up' element={<SignUp />} />

  //     </Route>
  //   )
  // );
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/new-hours' element={<NewHoursPage />} />
              <Route path='/view-hours' element={<ViewHoursPage />} />
              <Route path='/delete-work-day' element={<DeleteWorkDayPage />} />
              <Route path='/log-in' element={<LogIn />} />
              <Route path='/sign-up' element={<SignUp />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App
