import React from 'react'
import moment from 'moment'

const Appointment = ({id,name,date,time,deleteHandler}) => {
    let md = moment(`${date}T${time}`);
    const stl = {display:'flex',justifyContent:'space-between'};
    return (
        <li key={id} 
        style={stl} className="list-group-item"><
            span style={{width:'100px'}}>{md.format('ll')}</span>
            <span style={{width:'100px'}}>{md.format('LT')}</span>
            <span style={{width:'100px'}}>{name}</span>
            <button className="btn btn-danger" onClick={()=>deleteHandler(id)}>Cancel</button>
            </li>
    )
}

export default Appointment
