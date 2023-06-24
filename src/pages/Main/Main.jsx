import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ALL_CARS, CREATE_NEW_CAR, DELETE_CAR, REDUCT_OLD_CARS } from '../../api';

const Main = () => {
    // const {availibleCars} = useSelector(s => s.cars)
    const [availibleCars, setAvailibleCars] = useState([])
    const [reductCar, setReductCar] = useState({})
    const [assureDel, setAssureDel] = useState({delete:false, car: {}})
    
    const changeCarsTable = () => {
        ALL_CARS()
        .then(res =>{
            // console.log(res.data.data);
            setAvailibleCars(res.data.data)
        })
        .catch(err => console.log(err))
    }
    useEffect(() =>{
        changeCarsTable()
    },[])



    const sendReductedCar = () => {
        REDUCT_OLD_CARS(reductCar.id, reductCar)
        .then(({data} )=>{
            // console.log(data.data);
            changeCarsTable()
            setReductCar({})
        })
        .catch(err => console.log(err))
    }
    const sendNewCar = () => {
        CREATE_NEW_CAR({name:reductCar.name, is_active:reductCar.is_active, is_always_active:reductCar.is_always_active})
        .then(({data} )=>{
            // console.log(data.data);
            changeCarsTable();
            setReductCar({})
        })
        .catch(err => console.log(err))
    }
    const deleteCar = () => {
        console.log(assureDel);
        console.log(assureDel.car.id);
        DELETE_CAR(assureDel.car.id)
        .then(({data} )=>{
            // console.log(data.data);
            changeCarsTable();
            setAssureDel({delete:false, car: {}})
        })
        .catch(err => console.log(err))
    }



    return (
        <div className='home details'>
            
            {
                reductCar?.id && <>
                <div className='home__myCars-popup'>
                    <div className='home__myCars-selects'>
                        <input className='admin__input' type="search" onChange={e =>setReductCar({...reductCar, name: e.target.value})} placeholder='название машины' value={reductCar.name} style={{paddingLeft: '10px'}}/> 
                        
                        <select onChange={e => setReductCar({...reductCar, is_always_active: e.target.value})} value={reductCar.is_always_active}>
                            <option value="" disabled>время работы</option>
                            <option value={true}>всегда</option>
                            <option value={false}>на один день</option>
                        </select>
                        <select onChange={e => setReductCar({...reductCar, is_active: e.target.value})} value={reductCar.is_active}>
                            <option value="" disabled>Статус</option>
                            <option value={true}>активна</option>
                            <option value={false}>не активна</option>
                        </select>
                    </div>

                    <div className='home__carsSetting-save'>
                        {
                            +reductCar?.id === -1 ?
                            <input type='button' value='создать' className='recentOrders__addBtn' onClick={sendNewCar}/> :
                            <input type='button' value='готово' className='recentOrders__addBtn' onClick={sendReductedCar}/>
                        }
                        <input type='button' value='отмена' className='recentOrders__addBtn' onClick={() =>setReductCar( {} )}/>
                    </div> 
                </div>
                <div className="detail__overlay" onClick={() => setReductCar({})}/>
                </>
            }
                        {
                            assureDel.delete && <>
                            <div className='home__myCars-popup'>
                                точно удалить  {assureDel.car.name}?

                                <div className='home__carsSetting-save'>
                                    <input type='button' value='удалить' className='recentOrders__addBtn' onClick={deleteCar}/>
                                    <input type='button' value='отмена' className='recentOrders__addBtn' onClick={() => setAssureDel({delete:false, car: {}})}/>
                                </div> 
                            </div>
                            <div className="detail__overlay" onClick={() => setAssureDel({delete:false, car: {}})}/>
                            </>
                        }




            <div className="recentOrders">
                <div style={{marginBottom: '140px'}} className="cardHeader">
                    <h2>Редактировать машины</h2>
                </div>
                <button onClick={() =>setReductCar({id:-1, name:'', is_active:'', is_always_active:''})} className='card button cardHeader__add'>
                    <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-add-interface-dreamstale-lineal-dreamstale.png"/>
                    Добавить машину
                </button>
                <table>
                    <thead>
                    <tr>
                        <td>Имя</td>
                        <td>Активна каждый день</td>
                        <td>Статус</td>
                    </tr>
                    </thead>
                    <thead>
                        {
                            availibleCars.map(car => (
                            <tr key={car.id}>
                               
                                <td className='home__carsSetting'> {car.name}</td>

                                 <td className='home__carsSetting'>
                                    {car.is_always_active ? '✔️' : 'X'}
                                </td>

                                 <td style={{textAlign:'center'}}> 
                                        {
                                            car.is_active && <span className="status progress">активна</span>
                                        }
                                </td>
                                

                                <td className='home__carsSetting-btns' >                                
                                        <img onClick={() => setReductCar(prev => prev.id == 5 ? {} : {id:5})} className='recentOrders__eddit' width={30} src="https://img.icons8.com/ios/50/null/create-new.png"/>
                                </td>
                                <td className='home__carsSetting-btns' >                                
                                    <img onClick={() => setAssureDel({delete:true ,car:{}})} width={30} src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"/>
                                </td>
                            </tr>
                            ))
                        }
                        <tr>
                            <td className='home__carsSetting'> 'car.name'</td> 
                            <td className='home__carsSetting'>
                                 '✔️' :
                            </td>
                            <td style={{textAlign:'center'}}> 
                                 <span className="status progress">активна</span>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                    <img onClick={() => setReductCar(prev => prev.id == 4 ? {} : {id:4})} className='recentOrders__eddit' width={30} src="https://img.icons8.com/ios/50/null/create-new.png"/>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                <img onClick={() => setAssureDel({delete:true ,car:{}})} width={30} src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"/>
                            </td>
                        </tr>

                        <tr>
                            <td className='home__carsSetting'> 'car.name'</td> 
                            <td className='home__carsSetting'>
                                 '✔️' :
                            </td>
                            <td style={{textAlign:'center'}}> 
                                 <span className="status progress">активна</span>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                    <img onClick={() => setReductCar(prev => prev.id == 3 ? {} : {id:3})} className='recentOrders__eddit' width={30} src="https://img.icons8.com/ios/50/null/create-new.png"/>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                <img onClick={() => setAssureDel({delete:true ,car:{}})} width={30} src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"/>
                            </td>
                        </tr>

                        <tr>
                            <td className='home__carsSetting'> 'car.name'</td> 
                            <td className='home__carsSetting'>
                                 '✔️' :
                            </td>
                            <td style={{textAlign:'center'}}> 
                                 <span className="status progress">активна</span>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                    <img onClick={() => setReductCar(prev => prev.id == 1 ? {} : {id:1})} className='recentOrders__eddit' width={30} src="https://img.icons8.com/ios/50/null/create-new.png"/>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                <img onClick={() => setAssureDel({delete:true ,car:{}})} width={30} src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"/>
                            </td>
                        </tr>

                        <tr>
                            <td className='home__carsSetting'> 'car.name'</td> 
                            <td className='home__carsSetting'>
                                 '✔️' :
                            </td>
                            <td style={{textAlign:'center'}}> 
                                 <span className="status progress">активна</span>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                    <img onClick={() => setReductCar(prev => prev.id == 2 ? {} : {id:2})} className='recentOrders__eddit' width={30} src="https://img.icons8.com/ios/50/null/create-new.png"/>
                            </td>
                            <td className='home__carsSetting-btns' >                                
                                <img onClick={() => setAssureDel({delete:true ,car:{}})} width={30} src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"/>
                            </td>
                        </tr>

                         {/* {
                                    reductCar?.id !== car.id ? 
                                    <td className='home__carsSetting'> {car.name}</td> : 
                                    <td className='home__carsSetting'>
                                        <input className='admin__input' type="search" onChange={e =>{}} defaultValue={car.name}/> 
                                    </td>
                                }  */}
                                    {/* {
                                        reductCar?.id === car.id ? 
                                        <td style={{textAlign:'center'}}>
                                            <select defaultValue=''>
                                            <option value="" disabled>Статус</option>
                                            <option value={true}>активна</option>
                                            <option value={false}>не активна</option>
                                        </select>
                                        </td>
                                        :  
                                        <td className='home__carsSetting'>
                                            {car.is_always_active ? '✔️' : 'X'}
                                        </td>
                                    } */}
                                {/* {
                                    reductCar?.id === car.id ? 
                                    <td style={{textAlign:'center'}}>
                                        <select defaultValue=''>
                                        <option value="" disabled>время работы</option>
                                        <option value={true}>всегда</option>
                                        <option value={false}>на один день</option>
                                    </select>
                                    </td>
                                    :  
                                    <td style={{textAlign:'center'}}> 
                                        {
                                        car.is_active && <span className="status progress">активна</span>
                                        }
                                    </td>
                                } */}
                  
                    </thead>
                </table>
            </div>

          

        </div>
    );
};

export default Main;