import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LOOK_CAR_BOOKING, SHOW_BOOKING_DETAILS } from '../../api';
import DetailPopup from '../../Components/DetailPopup';
import { refreshToken } from '../../redux/reducers/authSlice';


const CarTable = () => {
    const {availibleCars} = useSelector(s => s.cars)
    const startTime = ['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00']
    const [week, setWeek] = useState(1)
    const [car, setCar] = useState(1)
    const [plan, setPlan] = useState({monday: [],tuseday: [],wednesday: [],thursday: [],friday: [],satuday: [],})
    const [details, setDetails] = useState({})


    const findDate = (day = 1) =>{
        const today = new Date();
        const first = today.getDate() - today.getDay() + day;
        const monday = new Date(today.setDate(first));
        // console.log(monday);
        return {day:monday?.getDate(), month: monday.toLocaleString('ru', { month: "short" }), fullDate: monday}
    };
    
    let [Monday, Tuseday, Wednesday, Thursday, Friday, Satuday] = [findDate(week), findDate(week+1), findDate(week+2), findDate(week+3), findDate(week+4),findDate(week+5)]
    
    

    const changeCarHandler = (car) =>{
        setCar(car)
        changeCarTable(car)
    }
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
        "end_date_time": "2023-01-14T1:00:00",
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
    const changeCarTable = (id = car, active = '') =>{
        LOOK_CAR_BOOKING(id, active)
        .then(({data})=> {console.log(data.data);
            console.log(Monday,Satuday);
             setPlan({
                monday: [data.data.reduce((acc, rec, idx) => +data.data[idx].start_date_time.slice(8, 10) == Monday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
                tuseday: [data.data.reduce((acc, rec, idx) => +data.data[idx].start_date_time.slice(8, 10) == Tuseday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
                wednesday: [data.data.reduce((acc, rec, idx) => +data.data[idx].start_date_time.slice(8, 10) == Wednesday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
                thursday: [data.data.reduce((acc, rec, idx) => +data.data[idx].start_date_time.slice(8, 10) == Thursday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
                friday: [data.data.reduce((acc, rec, idx) => +data.data[idx].start_date_time.slice(8, 10) == Friday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
                satuday: [data.data.reduce((acc, rec, idx) => +data.data[idx].start_date_time.slice(8, 10) == Satuday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
            })
        })
        .catch(err =>{
            console.log(err);
            // refreshToken();
        })
        setPlan({
            monday: [fakeResponse.reduce((acc, rec, idx) => +fakeResponse[idx].start_date_time.slice(8, 10) == Monday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
            tuseday: [fakeResponse.reduce((acc, rec, idx) => +fakeResponse[idx].start_date_time.slice(8, 10) == Tuseday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
            wednesday: [fakeResponse.reduce((acc, rec, idx) => +fakeResponse[idx].start_date_time.slice(8, 10) == Wednesday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
            thursday: [fakeResponse.reduce((acc, rec, idx) => +fakeResponse[idx].start_date_time.slice(8, 10) == Thursday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
            friday: [fakeResponse.reduce((acc, rec, idx) => +fakeResponse[idx].start_date_time.slice(8, 10) == Friday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
            satuday: [fakeResponse.reduce((acc, rec, idx) => +fakeResponse[idx].start_date_time.slice(8, 10) == Satuday?.day? [...acc, {...rec, color:idx+1}] : [...acc]  ,[])],
        })
    }

    useEffect(() =>{
        changeCarTable()
    },[week])
    // useEffect(() =>{
    //     console.log('plan is',plan);
    // },[plan])

    const showBookingDetails = (id) =>{
        SHOW_BOOKING_DETAILS(id)
        .then(({data} )=>{console.log(data.data); setDetails(data.data)})
        .catch(err => console.log(err))
    }

// console.log(Monday.fullDate.toLocaleString('ru', {month: 'long'}));
    return (
        <div className='details'>
           {
            details?.id && <>
            <DetailPopup details={details}/>
            <div className="detail__overlay" onClick={() => setDetails({})}/>
            </>
           }
            <div className="recentOrders">
                <div className="cardHeader">
                    <h2 onClick={() => setWeek(1)}>Рассписание</h2>
                    <Link to={'/bookingForm'} className='card button cardHeader__add'>
                        <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-add-interface-dreamstale-lineal-dreamstale.png"/>
                        Бронировать
                    </Link>
                </div>
                <br />
                <span>
                    <h3>Машина</h3>
                    <select onChange={(e) => changeCarHandler(e.target.value)} autoFocus>
                        <option value="" disabled>Выберите машину</option>
                        {
                            availibleCars?.map(car => (
                                <option value={car.id} key={car.id}>{car.name}</option>
                            ))
                        }
                    </select>
                    <select onChange={(e) => changeCarTable(car, e.target.value)} defaultValue=''>
                        <option value="">Все бронирования</option>
                        <option value={true} >Грядущие  </option>
                        <option value={false} >Прошедшие  </option>
                    </select>
                    
                </span> <br />

                <h2>
                    <span style={{display: 'block' ,width: 'auto'}}>
                        {Monday.fullDate.toLocaleString('ru', { month: "long" })} {Monday.month !== Satuday.month && '- '+Satuday.fullDate.toLocaleString('ru', { month: "long" })} 
                    </span>
                    <span>
                        <img onClick={() => setWeek(prev => prev - 7)} src="https://img.icons8.com/plumpy/24/null/chevron-left.png"/>
                        <span style={{display: 'inline-block' ,width: '90px', textAlign:'center'}}>
                            {Monday?.day} - {Satuday.day}
                        </span>
                        <img onClick={() => setWeek(prev => prev + 7)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuklEQVR4nOWUPQrCQBQGJygGFCG19jaCFmpAsBAMiIXYCOKFPIhnsBY8i6WlNlaGhQ0EMT9k3wPFga+dYRd24Z/wgBBYAoG0vAWcgZfdDVhJBg4pebInsJYKXD4ERCPHjIBYpAc8tCMz4F4Q2fxEZF7iuiLtyBWouUYi4JSzrovcty95n7Gdywn8ArlZv6q8YT+7PHn4lfJ6iWsZ48BQU25YaMoNU005QBvYvslHUvKEJjAAJkBHWl6ZGJyWYGk0ZXamAAAAAElFTkSuQmCC"/>
                    </span>
                    <span style={{display: 'inline-block' ,width: '110px'}}>
                        {/* {Monday.month !== Satuday.month && Satuday.fullDate.toLocaleString('ru', { month: "long" })}  */}
                    </span>
                </h2>
                
                <div  className='carTable'>
                    <div className='carTable__col'>
                        <p className='carTable__box'></p>
                        {
                        startTime.map(t=>(
                            <p key={t} className='carTable__box '>{t}</p>
                        ))
                       }
                    </div>

                    <div className='carTable__col carTable__info'>
                        <p className='carTable__box title'>Пн {Monday?.day} {Monday?.month}</p>
                        {
                        startTime.map(t=>{
                            const same = plan?.monday[0]?.find(i => t < i.end_date_time.slice(11,16) && t >= i.start_date_time.slice(11,16) && 1 == new Date(i.start_date_time).getDay())
                            const planStart = plan?.monday[0]?.find(i => t == same?.start_date_time.slice(11,16))
                            return (
                            <div key={t} onClick={() =>  same ? showBookingDetails(same?.id) : ''} className={`carTable__box carTable__info ${same && same.is_active && 'progress' || same && 'past'}`}
                             style={{borderTop: planStart&& '1px solid white' ,filter: same?.color % 2 ==0 && 'saturate(207%)'}}>
                                {planStart && same?.organizer.split(' ')[0] || ''}
                                <p className='carTable__info-time'>{planStart && `${same?.start_date_time.slice(11,16)} - ${same?.end_date_time.slice(11,16)} `}</p>
                            </div>
                        )})
                       }
                    </div>

                    <div className='carTable__col carTable__info'>
                        <p className='carTable__box title'>Вт {Tuseday?.day} {Tuseday.month}</p>
                        {
                        startTime.map(t=>{
                            const same = plan?.tuseday[0]?.find(i => t < i.end_date_time.slice(11,16) && t >= i.start_date_time.slice(11,16) && 2 == new Date(i.start_date_time).getDay())
                            const planStart = plan?.tuseday[0]?.find(i => t == same?.start_date_time.slice(11,16))
                            return (
                            <div key={t} onClick={() =>  same ? showBookingDetails(same?.id) : ''} className={`carTable__box carTable__info ${same && same.is_active && 'progress' || same && 'past'}`} 
                                style={{filter: same?.color % 2 ==0 && 'saturate(207%)', borderTop: planStart&& '1px solid white' }}>
                                    {planStart && same?.organizer.split(' ')[0] || ''}
                                    <p className='carTable__info-time'>{planStart && `${same?.start_date_time.slice(11,16)} - ${same?.end_date_time.slice(11,16)} `}</p>
                            </div>
                        )})
                       }
                    </div>

                    <div className='carTable__col carTable__info'>
                        <p className='carTable__box title'>Ср {Wednesday?.day} {Wednesday.month}</p>
                        {
                        startTime.map(t=>{
                            const same = plan?.wednesday[0]?.find(i => t < i.end_date_time.slice(11,16) && t >= i.start_date_time.slice(11,16) && 3 == new Date(i.start_date_time).getDay() )
                            const planStart = plan?.wednesday[0]?.find(i => t == same?.start_date_time.slice(11,16))
                            return (
                            <div key={t} onClick={() => same ? showBookingDetails(same?.id) : ''}  className={`carTable__box carTable__info ${same && same.is_active && 'progress' || same && 'past'}`} 
                                style={{filter: same?.color % 2 ==0 && 'saturate(207%)',borderTop: planStart&& '1px solid white' }}>
                                    {planStart && same?.organizer.split(' ')[0] || ''}
                                    <p className='carTable__info-time'>{planStart && `${same?.start_date_time.slice(11,16)} - ${same?.end_date_time.slice(11,16)} `}</p>
                            </div>
                        )})
                       }
                    </div>

                    <div className='carTable__col carTable__info'>
                        <p className='carTable__box title'>Чт {Thursday?.day} {Thursday.month}</p>
                        {
                        startTime.map(t=>{
                            
                            const same = plan?.thursday[0]?.find(i => t < i.end_date_time.slice(11,16) && t >= i.start_date_time.slice(11,16) && 4 == new Date(i.start_date_time).getDay())
                            const planStart = plan?.thursday[0]?.find(i => t == same?.start_date_time.slice(11,16))
                            // console.log(same?.start_date_time.slice(11,16));
                            // console.log(t, plan?.thursday[0]?.find(i => t == i.start_date_time.slice(11,16)) , same?.organizer.split(' ')[0]);
                            // console.log(plan?.thursday[0]?.find(i => t <= i.end_date_time.slice(11,16) && t >= i.start_date_time.slice(11,16)));
                            return (
                            <div key={t} onClick={() =>  same ? showBookingDetails(same?.id) : ''}  className={`carTable__box carTable__info ${same && same.is_active && 'progress' || same && 'past'}`} 
                            style={{borderTop: planStart&& '1px solid white' ,filter: same?.color % 2 ==0 && 'saturate(207%)'}}>
                                {planStart && same?.organizer.split(' ')[0] || ''}{t.start_date_time == "2022-12-29T09:00:00" && 'It'}
                                <p className='carTable__info-time'>{planStart && `${same?.start_date_time.slice(11,16)} - ${same?.end_date_time.slice(11,16)} `}</p>
                            </div>
                        )})
                       }
                    </div>

                    <div className='carTable__col carTable__info'>
                        <p className='carTable__box title'>Пт {Friday?.day} {Friday.month}</p>
                        {
                        startTime.map(t=>{
                            const same = plan?.friday[0]?.find(i => t < i.end_date_time.slice(11,16) && t >= i.start_date_time.slice(11,16) && 5 == new Date(i.start_date_time).getDay())
                            const planStart = plan?.friday[0]?.find(i => t == same?.start_date_time.slice(11,16))
                            return (
                            <div key={t} onClick={() =>  same ? showBookingDetails(same?.id) : ''} 
                              className={`carTable__box carTable__info ${same && same.is_active && 'progress' || same && 'past'}`}
                              style={{borderTop: planStart&& '1px solid white' ,filter: same?.color % 2 ==0 && 'saturate(207%)'}}>
                                {planStart && same?.organizer.split(' ')[0] || ''}
                                <p className='carTable__info-time'>{planStart && `${same?.start_date_time.slice(11,16)} - ${same?.end_date_time.slice(11,16)} `}</p>
                            </div>
                        )})
                       }
                    </div>

                    <div className='carTable__col carTable__info'>
                        <p className='carTable__box title'>Суб   {Satuday?.day} {Satuday.month}</p>
                        {
                        startTime.map(t=>{
                            const same = plan?.satuday[0]?.find(i => t < i.end_date_time.slice(11,16) && t >= i.start_date_time.slice(11,16) && 6 == new Date(i.start_date_time).getDay() )
                            const planStart = plan?.satuday[0]?.find(i => t == same?.start_date_time.slice(11,16))
                            // console.log(new Date(same.start_date_time).getDay());
                            // console.log(same && new Date(same.start_date_time).getDay());
                            // console.log(plan?.satuday[0]?.find(i => t == i.end_date_time.slice(11,16)));
                            return (
                            <div key={t} onClick={() =>  same ? showBookingDetails(same?.id) : ''} className={`carTable__box carTable__info ${same && same.is_active && 'progress' || same && 'past'}`} data-id={same?.id}
                             style={{borderTop: planStart&& '1px solid white' ,filter: same?.color % 2 ==0 && 'saturate(207%)'}}>
                                {planStart && same?.organizer.split(' ')[0] || ''}
                                <p className='carTable__info-time'>{planStart && `${same?.start_date_time.slice(11,16)} - ${same?.end_date_time.slice(11,16)} `}</p>
                            </div>
                        )})
                       }
                    </div>
                </div>


                
            </div>
          
        </div>
        
    );
};

export default CarTable;