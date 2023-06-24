import React, { useRef } from 'react';
import { useState } from 'react';
import { MAKE_BOOKING, SEARCH_USER } from '../../api/index';
import { refreshToken } from '../../redux/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { showResponse, showTimeErr } from '../../redux/reducers/carSlise';

const BookingForm = () => {
    const dispatch = useDispatch()
    const [places, setPlaces] = useState([{id:0, placeName:'', time: ''}])
    const [correctPlace, setCorrectPlace] = useState('')
    const [employees, setEmployees] = useState([])
    const [correctEmployee,setCorrectEmployee] = useState('')
    const [driveTime, setDriveTime] = useState('T08:30')
    const [driveDay, setDriveDay] = useState('')

    const [users, setUsers] = useState([])
    const {
        reset,
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm()
    
    const {availibleCars, response, timeErr} = useSelector(s => s.cars)

    const startTime = ['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00']
    // "Этот автомобиль \"Ferrari F8 Tributo\" активен только сегодня c 08:30 до 17:30"
    const totalM = places.reduce((acc, rec) =>{
        return acc + +rec.time
    }, 0)
  

    const addPlace = () =>{
        if (places.at(-1)?.time && places?.at(-1).placeName.trim()) {
            setPlaces(prev => [...prev, {id: prev.at(-1).id + 1, placeName:'', time: ''}])
        } else {
            setCorrectPlace('Выберите место и срок')
        }
    }
    const delPlace = (id) =>{
        places.length > 1 &&
        setPlaces(prev => prev.filter(p => p.id !== id ))
        // console.log(id);
        // console.log(places);
    }
    const addEmployee = () =>{
        console.log(employees);
        if (!employees.length) return setEmployees([{id: 0, name: '', hisId:0}])
        if (employees.at(-1)?.id !== undefined && employees?.at(-1).name.trim()) {
            setEmployees(prev => [...prev, {id: prev.at(-1).id + 1, name: ''}])
        } else {
            setCorrectEmployee('внесите сотрудника')
        }
    }
    const reductEmployee = (id, name) => {
        const hisId = users.find(u => u.full_name === name)?.id;
        // console.log(hisId, name);
        // console.log(employees);
        setEmployees(prev => prev.map(e => e.id == id ? {...e, hisId: hisId, name} : e))
        setCorrectEmployee('')
    }
    const reductPlace = (id, placeName, time) =>{
        setPlaces(prev => prev.map(p => p.id == id ? {...p, placeName, time} : p))
        setCorrectPlace('')
    }

    const searchHandler = (e) =>{
        SEARCH_USER(e.target.value)
        .then(res => {console.log(res.data); setUsers(res.data.data)})
        .catch(err =>{
            console.log(err);
            dispatch(refreshToken())
        })
    }

//    useEffect
    const totalTime = () =>{
        let hours = Math.floor(totalM / 60)
        let minutes = totalM % 60
        return `${hours}ч ${minutes}m`
    }

    const onSubmit = (data) =>{
        if(places.at(-1)?.time && places?.at(-1).placeName.trim() && driveDay){
        const extraMilS = totalM * 60000
        const end_date = new Date(new Date(driveDay+driveTime).getTime() + extraMilS)
        const end_date_time = `${end_date.getFullYear()}-${end_date.getMonth()+1}-${end_date.getDate()}T${end_date.getHours()}:${end_date.getUTCMinutes()}` 
        // console.log(new Date(driveDay+driveTime)); console.log(end_date_time);
        console.log({...data,start_date_time: driveDay+driveTime ,end_date_time, employees: employees.map(em => em.hisId), addresses: places.map(p => Object.assign({name: p.placeName}))});

        MAKE_BOOKING({...data,start_date_time: driveDay+driveTime , end_date_time, employees: employees.map(em => em.hisId), addresses: places.map(p => Object.assign({name: p.placeName}))})
        .then(res =>{ console.log(res.data);  dispatch(showTimeErr('На это время бронь прошла удачно'))})
        .catch(err =>{console.log(err.response.data.data); dispatch(showTimeErr(err.response.data.data.date_time[0]))})
        } else {
            setCorrectPlace('Добавьте пункт и срок')
        }
    }
    
    return (
        <div className='details'>
            <h1 className='home__title' style={{textAlign: 'center'}}>Бронирование машин</h1>

            <form className="recentOrders" onSubmit={handleSubmit(onSubmit)}>
                <div className="cardHeader">
                    <h2 className=''>Создать бронь</h2> <br /> <br />  <br />             
                </div>
            <div>
                <h3>Машина</h3>
                <select {...register('car')} autoFocus>
                {
                    availibleCars?.map(car => (
                        <option value={car.id} key={car.id}>{car.name}</option>
                    ))
                }
                </select>
               
            </div>
            <br />
            <div>
                <h3>Начало</h3> <br />
               
                <input onChange={(e)=> setDriveDay(e.target.value)} type="date" placeholder='дата'/>
                <select onChange={e => setDriveTime(e.target.value)}>
                    {
                        startTime.map((t, idx) => (
                            <option key={idx} value={'T'+t}>{t}</option>
                        ))
                    }


                </select>
                <br /> <br />
                <h3 className="form__message">
                    {timeErr}
                 </h3>
               
            </div>
            <div>
                <br /><br />
                <input className='recentOrders__addBtn' onClick={addEmployee} type="button" value="+ Добавить сотрудника"/> <br />
                 <br />
                 {
                    employees?.map(el =>(
                    <span key={el.id}>
                        <input type="text" onChange={(e) => {searchHandler(e);reductEmployee(el.id ,e.target.value); console.log(e.target);}} placeholder='имя'list='users'/>
                     </span>
                    ))
                 }
                 <h3 className="form__message">
                    {correctEmployee}
                 </h3>
                <datalist id='users'>
                    {
                        users?.map(user => (
                         <option key={user.id} value={user.full_name}>{user.username}</option>
                        ))
                    }
                </datalist>    
            </div>
            <div>

                   <br /> <br /> <h3><input className='recentOrders__addBtn' onClick={addPlace} type="button" value="+ Добавить точку"/></h3> <br />
                {
                    places?.map((el, id) => (
                        <div className='recentOrders__newPlace' key={el.id}>
                            <br />
                            <input onChange={(e) => reductPlace(el.id, e.target.value, el.time)} value={el.placeName} type="text" placeholder='название' />
                            <select onChange={(e) => reductPlace(el.id, el.placeName, e.target.value)} value={el.time}>
                                <option value="" disabled>длительность</option>
                                <option value="30">30min</option>
                                <option value="60">1 hour</option>
                                <option value="90">1h 30m</option>
                            </select>
                            <img width={50} onClick={() => delPlace(el.id)} className='recentOrders__delBtn' src="https://img.icons8.com/dotty/80/null/full-trash.png"/>
                            {/* <input className='recentOrders__addBtn' onClick={() => delPlace(el.id)} type="button" value="удалить"/> */}
                        </div>
                    ))
                }
            
                <h3 className='form__message'>{correctPlace}</h3>
                {/* <h3>{response}</h3> */}
            </div>
            <br />

            <input className='recentOrders__send' type="submit" value="Создать"/>
            
            <br /> <br />
            <div>
                Итого: <div>{places.length} точки</div> <div>{totalTime()}</div>
            </div>
            
            </form>
        </div>
        
        
    );
};

export default BookingForm;