import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    availibleCars : [],
    response: '',
    timeErr: '',
    
}


export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        showCurrentCarScedule: (state, action) => {
            
        },
        findActiveCars: (state, action) => {
           state.availibleCars = action.payload
           console.log('finish');
        },
        showResponse: (state, action) =>{
            state.response = action.payload
        },
        showTimeErr: (state, action) =>{
            state.timeErr = action.payload
        },
    }
})


export const {findActiveCars, showResponse, showTimeErr } = carSlice.actions;
export default carSlice.reducer;