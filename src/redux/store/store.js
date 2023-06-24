import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import  carSlice  from '../reducers/carSlise';
// import {composeWithDevTools} from '@reduxjs/toolkit/dist/devtoolsExtension';
// import thunk from 'redux-thunk';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        cars: carSlice,
    },
})
