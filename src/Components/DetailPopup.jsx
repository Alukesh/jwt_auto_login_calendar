import React from 'react';

const DetailPopup = ({details}) => {
    return (
        <div className='detail__popup'>
            
            <div>
                <h3>{details.car}</h3>
                <p>{details.organizer}</p>
                <span className='detail__popup-time'>
                    <img width={22} src="https://img.icons8.com/windows/32/000000/time-span.png"/> {details.start_date_time.slice(11,16)} - {details.end_date_time.slice(11,16)}
                </span> <br />
                <h3>Адреса</h3> <br />
                <ul>
                    {
                        details.addresses.map((d, i)=>(
                            <li key={i}>{i+1} {d}</li>
                        ))
                    }
                </ul>
            </div>
            
            <div>
                <h3>Сотрудники</h3> <br />
                {
                    details.employees.map((d,i)=>(
                        <li key={i}>{d}</li>
                    ))
                }
            </div>
        </div>
    );
};

export default DetailPopup;