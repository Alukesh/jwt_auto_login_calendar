import axios from 'axios'
import { getStorageData } from '../helpers/helpers';


const instance_portal = axios.create({
    baseURL: 'http://127.0.0.1:5000/portal/api/'
})

const instance_booking = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
})
// 'http://localhost:5000/portal/api/'


instance_booking.interceptors.request.use(function (config) {
    const token = getStorageData('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});



export const AUTOLOGIN = async (data) => {
    const response = await instance_portal.post(`verify_auto_token/`, {...data});
    return response;
};

export const REFRESH_TOKEN = async (refreshToken) => {
    const response = await instance_portal.post('token/refresh/', {...refreshToken});
    return response;
};

export const SEARCH_USER = async (search) => {
    const response = await instance_booking.get('accounts/employees/?search=' + search + '&is_superuser=false');
    return response;
}


export const ACTIVE_CARS = async () => {
    const response = await instance_booking.get('cars/?is_active=true');
    return response;
}
export const ALL_CARS = async () => {
    const response = await instance_booking.get('cars/?is_active=""');
    return response;
}

export const MAKE_BOOKING = async (data) => {
    const response = await instance_booking.post('bookings/', {...data})
    return response;
}

export const SHOW_BOOKING_DETAILS = async (id) => {
    const response = await instance_booking.get(`bookings/${id}`)
    return response;
}

export const LOOK_CAR_BOOKING = async (id, active) => {
    const response = await instance_booking.get(`bookings/?is_active=${active}&car__id=${id}`)
    return response;
}

export const LOOK__MY_BOOKINGS = async (name, car, start, end, status) =>{
    const response = await instance_booking.get(`bookings/?organizer__username=${name}&car__id=${car}&start_date_time=${start}&end_date_time=${end}&is_active=${status}`)
    return response;
}


export const REDUCT_OLD_CARS = async (id, data) => {
    console.log(id, data);
    const response = await instance_booking.put(`cars/${id}/`, {...data})
    return response;
}

export const CREATE_NEW_CAR = async (data) => {
    const response = await instance_booking.post(`cars/`, {...data})
    return response;
}

export const DELETE_CAR = async (id) =>{
    const response = await instance_booking.delete(`cars/${id}`)
    return response;
}