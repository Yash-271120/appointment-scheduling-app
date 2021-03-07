import {useState} from 'react';
import './App.css';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

import React from "react";
import {
  BrowserRouter as Router,Link,
  Route
} from "react-router-dom";
import Form from './componenets/form/Form';
import Appointments from './componenets/appointments/Appointments'

const App = ()=>{
  const [appointments,setAppointments] = useState([])







//=======================google api part======================================
  var gapi = window.gapi;
  var CLIENT_ID = "1019778175661-72jcko706akudn185b57nns30osqo3tv.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAEaJZKVTewz0UpUYvb9TYcd1-gGPO5Z_I"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";


const handleClick = (date, d,time,name,email)=>{

// react notification
  store.addNotification({
    title: "Appointment Made successfully",
    message: "redirecting to your calender.....",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true
    }
  });
  gapi.load('client:auth2',async ()=>{

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
  })

  gapi.client.load('calender','v3',()=>{
    console.log('Calender Loaded');
  })

  await gapi.auth2.getAuthInstance().signIn();
  

  const eventStartTime = date;
  const eventEndTime = new Date();
eventEndTime.setDate(date.getDay());
eventEndTime.setTime(date.getTime());
eventEndTime.setMinutes(eventEndTime.getMinutes()+45);



// Create a dummy event for temp uses in our calendar
const event = {
  summary: `Meeting With Doctor`,
  location: `Doctor's clinic, 35th street`,
  description: `Talk to Doctor about back pain`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: 'Asia/Kolkata',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'Asia/Kolkata',
  },
}

  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute((event)=>{
    
    const newObj = {
      id: event.id,
      date:d,
      time,
      name,
      email
    }

    // state update
    setAppointments([...appointments,newObj])
     window.open(event.htmlLink)
  })
})
}
//=======================END of google api part======================================











//=======================Deleleting a appointment================================
const deleteHandler = (id)=>{
 
  // react notification
  store.addNotification({
    title: "Appointment Deleted successfully!",
    message: "  ",
    type: "warning",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 1500,
      onScreen: true
    }
  });
  var request = gapi.client.calendar.events.delete({
    'calendarId': 'primary',
    'eventId': id
  });
  
  request.execute((event)=>{
    console.log(`event deleted`);
  });
  setAppointments(appointments.filter((appointment)=>{
    return appointment.id !== id;
  }))
}
//=======================End of Deleleting a appointment================================










  return (
    <Router>
    <div className="App"> 
    <ReactNotification />
    <div className="container fp">
      <h2>Appointments Booking</h2>
      


      <Route exact path="/">
      <Form handleClick={handleClick}/>
      </Route> 
    
    </div>


    <Route exact path="/appointmentList">
      {appointments.length>0 ?<Appointments appointments={appointments} deleteHandler={deleteHandler} />:(<div style={{textAlign:'center'}}>
  No Appointments to show
  <div>
  <Link to="/" type="button" className="btn btn-success">Home</Link>
  </div>
</div>
)}
      </Route>
    </div>
    </Router>
  );
}

export default App;
