import React from 'react'
import {
    
    Link
  } from "react-router-dom";
import Appointment from './Appointment'
const Appointments = ({appointments,deleteHandler}) => {
    const stl = {display:'flex',justifyContent:'space-between'};
    return (
        <div className="container">
            <ul className="list-group">
            <li style={stl} className="list-group-item"><span style={{width:'100px'}}>Appointment Date</span><span style={{width:'100px'}}>Appointment Time</span><span style={{width:'100px'}}>Name</span><span>Cancel</span></li>
         {appointments.map((appointment)=>{
             return (
                 <Appointment id={appointment.id} name={appointment.name} date={appointment.date} time={appointment.time} deleteHandler={deleteHandler}/>
                
             )
         })}
  
</ul>
        <Link to="/" type="button" className="btn btn-success">Home</Link>     
        </div>
    )
}

export default Appointments
