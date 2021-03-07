import React,{useState} from 'react'
import './form.css'

import moment from 'moment'
import {
    
    Link
  } from "react-router-dom";

const Form = ({handleClick}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [time,setTime] = useState('');
    const [date,setDate] = useState('');

    const onSubmit =  (e)=>{
        e.preventDefault();
  
        if(!name || !email|| !date || !time){
            alert('Please add Name, Email, Date And Time');
            return;
          }

          if(!email.includes("@")){
            alert('Please enter a valid Email');
            return;
          }

        let md = moment(`${date}T${time}`);
        let d = new Date();
        d.setDate(md._d.getDay());
        d.setTime(md._d.getTime());
        handleClick(d,date,time,name,email);
      //   //addAppointment({
      //     id:Math.floor(Math.random() * 1000000)+1,
      //     date,
      //      time,
      //     name,
      //      email
      // })
        setName('');
        setDate('');
        setTime('');
        setEmail('');
  
    }

    return (
            
 <form>
    <div className="form-group">
    <label>Choose a date</label>
    <input type="date" value={date} onChange = {(e)=> setDate(e.target.value)}className="form-control"  required/>
  </div>
  <div className="form-group">
    <label>Choose a time</label>
    <input type="time" className="form-control" value={time} onChange = {(e)=> setTime(e.target.value)}  required/>
  </div>
  <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" value={name} onChange = {(e)=> setName(e.target.value)}  placeholder="Name" required/>
  </div>
  <div className="form-group">
  <label>Email</label>
  <input type="email" className="form-control" value={email} onChange = {(e)=> setEmail(e.target.value)}  placeholder="email" required/>
    
  </div>
  <div className="form-group row btn-space">
  <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
  <Link to="/appointmentList" type="button" className="btn btn-success">Check your Appointments</Link>
  </div>
</form>
    )
}

export default Form
