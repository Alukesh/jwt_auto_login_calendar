import {createSlice} from '@reduxjs/toolkit'
import { AUTOLOGIN, REFRESH_TOKEN } from '../../api/index';
import { getStorageData, parseJwt, setStorageData } from '../../helpers/helpers';

//Action


const initialState = {
    token: null,
    isAuthorised: false,
    user: {},
    myBookings: [],
    loading: false,
    message: '',
    error: '',
    freshTokenPromise: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        sighnInSuccess: (state, action) => {
            state.token = action.payload.access
            state.isAuthorised = true
            state.user =  action.payload.user
            state.loading = false
            state.error = null
        },
        sighnInFatal : (state, action) => {
            state.token = null
            state.isAuthorised = false
            state.error = action.payload
            state.loading = false
        },
        searchMyBookings: (state, action) =>{
            state.myBookings = action.payload
        },
        autoLogin: (state, action) =>{
            state.loading = true
            // console.log(action.payload);
             AUTOLOGIN(action.payload)
            .then(res =>{ 
                console.log(res.data);
                console.log('autologin success');
                const {access} = res.data;
                const user = parseJwt(res.data.access);
                const {user_id, name, TermAdmins, username} = user;

                setStorageData('token', res.data.access);
                setStorageData('refresh', res.data.refresh);
                setStorageData('user', {user_id, name, username,  isSuperUser:TermAdmins});
                // dispatch({type: SIGN_IN_SUCCESS, payload: {access, user}});
                if(localStorage.getItem('user')){
                    let user = JSON.parse(localStorage.getItem('user'));
                    // dispatch(setRole(user.username));
                }
            })
            .catch(err =>{
                console.log(err);
                state.error = err
            })
            state.loading = false
         
        },
        refreshToken: (state, action) => {
            console.log('need refreshToken');
            const freshTokenPromise = REFRESH_TOKEN({ refresh: getStorageData('refresh') })
            .then(res => {
                state.token = res.data.access
                setStorageData('token', res.data.access)

                return res.data.access ? Promise.resolve(res.data.access) : Promise.reject({
                    message: 'could not refresh token'
                });
            })
            .catch(e => {
                console.log(e);
                // window.location = 'http://localhost:5001/'
                return Promise.reject(e);
            });
            return freshTokenPromise;
    
        },
    }
})


export const {sighnInSuccess, sighnInFatal, autoLogin, refreshToken, searchMyBookings} = authSlice.actions
export default authSlice.reducer