import React, { useEffect, useState } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from '../../redux/reducers/authSlice';

const SignIn = () => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();
    const query = new URLSearchParams(location.search);
    const token = location.search.slice(7,location.search.length);

  console.log(token);
    const [loading, setLoading] = useState(true);
    

    const data = {service: 'car_booking', token};
    useEffect(() => {
        console.log(token);
        console.log(query);
        if (token) {
            console.log("GOING TO MAKE AUTOLOGIN")
            dispatch(autoLogin(data))//AUTOLOGIN
            navigate('/')
        }
    },[token])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
  



    return (
        <div>
            {
                loading ? <h3 style={{textAlign: 'center'}}>Загрузка...</h3> : <h3 style={{textAlign: 'center'}}>Заг.</h3>
            }
        </div>
    );
};

export default SignIn;