import React, { useEffect } from 'react';
import { LOOK__MY_BOOKINGS, SHOW_BOOKING_DETAILS } from '../../api/index';
import { searchMyBookings } from '../../redux/reducers/authSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import DetailPopup from '../../Components/DetailPopup';

const MyBookings = () => {
    const fakeResponse = [
        {
            "id": 2,
            "car": 2,
            "start_date_time": "2022-12-20T15:08:22",
            "end_date_time": "2022-12-20T15:08:12",
            "organizer": "Максим Полевой",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 9,
            "car": 2,
            "start_date_time": "2022-12-29T09:00:00",
            "end_date_time": "2022-12-29T11:30:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 7,
            "car": 2,
            "start_date_time": "2022-12-29T10:00:00",
            "end_date_time": "2022-12-29T10:30:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 10,
            "car": 2,
            "start_date_time": "2022-12-29T12:00:00",
            "end_date_time": "2022-12-29T12:30:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 14,
            "car": 2,
            "start_date_time": "2022-12-29T13:00:00",
            "end_date_time": "2022-12-29T14:00:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 15,
            "car": 2,
            "start_date_time": "2022-12-29T14:30:00",
            "end_date_time": "2022-12-29T15:30:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 16,
            "car": 2,
            "start_date_time": "2022-12-29T16:00:00",
            "end_date_time": "2022-12-29T16:30:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 13,
            "car": 2,
            "start_date_time": "2022-12-30T09:30:00",
            "end_date_time": "2022-12-30T10:00:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 12,
            "car": 2,
            "start_date_time": "2022-12-30T11:30:00",
            "end_date_time": "2022-12-30T12:00:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 24,
            "car": 2,
            "start_date_time": "2022-12-30T12:00:00",
            "end_date_time": "2022-12-30T12:30:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 11,
            "car": 2,
            "start_date_time": "2022-12-30T12:30:00",
            "end_date_time": "2022-12-30T13:00:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 17,
            "car": 2,
            "start_date_time": "2022-12-30T14:00:00",
            "end_date_time": "2022-12-30T14:30:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 23,
            "car": 2,
            "start_date_time": "2022-12-30T16:00:00",
            "end_date_time": "2022-12-30T16:30:00",
            "organizer": "Эржан Жороев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 21,
            "car": 2,
            "start_date_time": "2022-12-30T16:30:00",
            "end_date_time": "2022-12-30T17:00:00",
            "organizer": "Эржан Жороев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 22,
            "car": 2,
            "start_date_time": "2022-12-30T17:00:00",
            "end_date_time": "2022-12-30T17:30:00",
            "organizer": "Эржан Жороев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 29,
            "car": 2,
            "start_date_time": "2022-12-31T08:30:00",
            "end_date_time": "2022-12-31T09:00:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
        },
        {
            "id": 19,
            "car": 2,
            "start_date_time": "2022-12-31T09:00:00",
            "end_date_time": "2022-12-31T12:00:00",
            "organizer": "Алишер Кенжебаев",
            "update_status": 0,
            "is_active": false
    },
    {
        "id": 27,
        "car": 2,
        "start_date_time": "2022-12-31T12:00:00",
        "end_date_time": "2022-12-31T12:30:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 25,
        "car": 2,
        "start_date_time": "2022-12-31T12:30:00",
        "end_date_time": "2022-12-31T16:00:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 28,
        "car": 2,
        "start_date_time": "2022-12-31T17:30:00",
        "end_date_time": "2022-12-31T20:30:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 26,
        "car": 2,
        "start_date_time": "2022-12-31T18:00:00",
        "end_date_time": "2022-12-31T18:30:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 18,
        "car": 2,
        "start_date_time": "2023-01-01T11:00:00",
        "end_date_time": "2023-01-01T13:00:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 31,
        "car": 2,
        "start_date_time": "2023-01-04T13:00:00",
        "end_date_time": "2023-01-04T15:00:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 32,
        "car": 2,
        "start_date_time": "2023-01-07T11:00:00",
        "end_date_time": "2023-01-07T12:30:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 33,
        "car": 2,
        "start_date_time": "2023-01-09T11:30:00",
        "end_date_time": "2023-01-09T12:30:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 36,
        "car": 2,
        "start_date_time": "2023-01-09T12:30:00",
        "end_date_time": "2023-01-09T14:00:00",
        "organizer": "Эржан Жороев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 39,
        "car": 2,
        "start_date_time": "2023-01-09T14:00:00",
        "end_date_time": "2023-01-09T14:30:00",
        "organizer": "Эржан Жороев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 34,
        "car": 2,
        "start_date_time": "2023-01-10T14:30:00",
        "end_date_time": "2023-01-10T16:00:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 40,
        "car": 2,
        "start_date_time": "2023-01-12T08:30:00",
        "end_date_time": "2023-01-12T11:00:00",
        "organizer": "Алишер Кенжебаев",
        "update_status": 0,
        "is_active": false
    },
    {
        "id": 43,
        "car": 2,
        "start_date_time": "2023-01-14T08:30:00",
        "end_date_time": "2023-01-14T09:00:00",
        "organizer": "Эржан Жороев",
        "update_status": 0,
        "is_active": true
    },
    {
        "id": 44,
        "car": 2,
        "start_date_time": "2023-01-14T09:00:00",
        "end_date_time": "2023-01-14T09:30:00",
        "organizer": "Алишер Кен",
        "update_status": 0,
        "is_active": true
    },
    {
        "id": 45,
        "car": 2,
        "start_date_time": "2023-01-14T09:30:00",
        "end_date_time": "2023-01-14T12:00:00",
        "organizer": "Мама",
        "update_status": 0,
        "is_active": true
    },
    {
        "id": 46,
        "car": 2,
        "start_date_time": "2023-01-16T09:00:00",
        "end_date_time": "2023-01-16T11:30:00",
        "organizer": "Алишер Кен",
        "update_status": 0,
        "is_active": true
    },
    {
        "id": 47,
        "car": 2,
        "start_date_time": "2023-01-17T11:00:00",
        "end_date_time": "2023-01-17T12:30:00",
        "organizer": "Алишер Кен",
        "update_status": 0,
        "is_active": true
    },]
    const {availibleCars} = useSelector(s => s.cars)
    const [driveDay, setDriveDay] = useState('')
    const [myBookings, setMyBookings] = useState(fakeResponse)
    const [startBooks, setStartBooks] = useState('')
    const [endBooks, setEndBooks] = useState('')
    const [carBooks, setCarBooks] = useState('')
    const [carStatus, setCarStatus] = useState('')
    const [details, setDetails] = useState({})

    const showBookingDetails = (id) =>{
        SHOW_BOOKING_DETAILS(id)
        .then(({data} )=>{console.log(data.data); setDetails(data.data)})
        .catch(err => console.log(err))
    }
    
    const changeMyTable = (car ='', start='', end='', status='') => {
        console.log(car, 'от', start, "до", end);
        LOOK__MY_BOOKINGS(JSON.parse(localStorage.getItem('user'))?.username, car, start, end, status)
        .then(res =>{
            // console.log(res.data.data);
             setMyBookings(res.data.data)})
        .catch(err => console.log(err))
    }
    useEffect(() =>{
       changeMyTable()
    },[])

    const returnDate = (date, notime) =>{
        const bookDate = new Date(date);
        let day = bookDate.getDate();
        let month = bookDate.getMonth() + 1;
        let year = bookDate.getFullYear();
        let hours = bookDate.getHours();
        let minutes = bookDate.getMinutes()== 0 ? bookDate.getMinutes()+'0':bookDate.getMinutes();
        
        let currentDate;
         !notime ? currentDate = [`${hours}:${minutes}  `] : currentDate = [`${day}.${month}.${year}`]
        return currentDate; // "17-6-2022"
    }


    return (
        <div>
            <div className='home home__myCars details'>
                {/* <h1 className='home__title'>Машины</h1> */}
              
                


                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Мои бронирования</h2>
                    </div>

                    <h3 >выберите</h3>
                    <div className='cardHeader__selects'> 
                         <span>от </span>
                        <input onChange={(e)=>{setEndBooks(e.target.value); changeMyTable(carBooks, startBooks, e.target.value, carStatus)}} type="date" placeholder='дата'/>
                         до
                        <input onChange={(e)=>{setStartBooks(e.target.value); changeMyTable(carBooks, e.target.value, endBooks, carStatus)}} type="date" placeholder='дата'/>
                        <br />
                        <select autoFocus onChange={e =>{setCarBooks(e.target.value ); changeMyTable(e.target.value, startBooks , endBooks, carStatus)}} defaultValue=''>
                            {/* <option value="" disabled>Выберите машину</option> */}
                            <option value="" >Все машины</option>
                            {
                                availibleCars?.map(car => (
                                    <option value={car?.id} key={car?.id}>{car?.name}</option>
                                ))
                            }
                        </select>
                        <select onChange={e =>{ setCarStatus(e.target.value) ;changeMyTable(carBooks, startBooks , endBooks, e.target.value)}} defaultValue=''>
                            <option value="">Все бронирования</option>
                            <option value={true} >активные </option>
                            <option value={false} >прошедшие </option>
                        </select>
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <td>Имя</td>
                            <td>Время</td>
                            <td>Дата</td>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                myBookings?.map(({car, id, organizer, start_date_time, end_date_time}) =>(   
                                <tr key={id}  onClick={() => showBookingDetails(id)}>
                                    {/* <td><span className="status 'progress'">{availibleCars.find(o => o.id === car)?.name}</span></td> */}
                                    <td><span className="status 'progress'">{organizer}</span></td>
                                    <td className='cardHeader__time'>{returnDate(start_date_time)[0]} - {returnDate(end_date_time)[0]} </td>
                                    <td>{returnDate(start_date_time, 'notime')[0]} </td>
                                </tr>
                                ))
                            }
                    
                        </tbody>
                    </table>
                </div>

                {
                    details?.id && <>
                    <DetailPopup details={details}/>
                    <div className="detail__overlay" onClick={() => setDetails({})}/>
                    </>
                }

            </div>
           
        </div>
    );
};

export default MyBookings;