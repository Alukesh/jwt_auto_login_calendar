import { useEffect, useState } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import { getStorageData } from './helpers/helpers';
import {useSelector, useDispatch} from 'react-redux'
import { refreshToken, sighnInFatal, sighnInSuccess } from './redux/reducers/authSlice';
import SignIn from './pages/SignIn/SignIn';
import { Route, Router, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import BookingForm from './pages/BookingForm/BookingForm';
import { ACTIVE_CARS } from './api';
import { findActiveCars } from './redux/reducers/carSlise';
import CarTable from './pages/carTable/CarTable';
import MyBookings from './pages/MyBookings/MyBookings';



function App() {
  const auth = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const [isAdmin, setIsAdmin] = useState(null)


  useEffect(() =>{

    if (!auth.isAuthorized) {
      const access = getStorageData('token');// =isUserLoggedIn()
      // console.log(access);
      if (access) {
          const user = getStorageData('user');
          dispatch(sighnInSuccess({user}));

      } else {
        dispatch(sighnInFatal('Failed to login'))
      }
    }

    ACTIVE_CARS()
    .then(res =>{console.log(res.data); dispatch(findActiveCars(res.data.data))})
    .catch(err =>{
      console.log(err);
      dispatch(refreshToken())
    })
    const user = JSON.parse(localStorage.getItem('user'))
    user &&  setIsAdmin(user.isSuperUser)
  },[])



  return (
    <div className="container">
      <Navigation toggle={toggle} setToggle={setToggle}/>
      <main className={`main ${toggle && 'active'}`}>
        <Routes>
          <Route path='/' element={<CarTable/>}/>
          <Route path='/bookingForm' element={<BookingForm/>}/>
          <Route path='/bookings' element={<MyBookings/>}/>
          <Route path='/cars' element={ !isAdmin ? <Main/> : <CarTable/>}/>


          <Route path='/*' element={<SignIn/>}/>
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
