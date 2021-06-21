import React, { useState ,useEffect} from 'react'
import {Nav,Navbar,Button} from 'react-bootstrap';
import "./DayNavbar.css"

const DayNavbar = (props) => {
  const [i,setI] = useState(0);
  const [today,setToday] =useState(i);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const [clickedMon,setClickMon] = useState(false)
  const [clickedTues,setClickTues] = useState(false)
  const [clickedWed,setClickWed] = useState(false)
  const [clickedThur,setClickThur] = useState(false)
  const [clickedFri,setClickFri] = useState(false)
  const [clickedSat,setClickSat] = useState(false)
  const [clickedSun,setClickSun] = useState(false)
  const [clickedDay,setClickDay] = useState(false)
  var myCurrentDate = new Date();
  var month = myCurrentDate.getMonth();
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];
  var day = myCurrentDate.getDay();
  var date = myCurrentDate.getDate();

  useEffect(() => {
    if (dayName[day]==='Monday'){
      setI(0)
      setToday(0)
    }
    else if(dayName[day]==='Tuesday'){
      setI(-1)
      setToday(-1)
    }
    else if(dayName[day]==='Wednesday'){
      setI(-2)
      setToday(-2)
    }
    else if(dayName[day]==='Thursday'){
      setI(-3)
      setToday(-3)
    }
    else if(dayName[day]==='Friday'){
      setI(-4)
      setToday(-4)
    }
    else if(dayName[day]==='Saturday'){
      setI(-5)
      setToday(-5)
    }
    else if(dayName[day]==='Sunday'){
      setI(-6)
      setToday(-6)
    }

  }, []) 
  const handleClickSunday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i-1))));
    date.setHours(0,0,0,0,0);
    console.log(date)
    props.setNewDay(date);
    setClickSun(true)
    setClickMon(false)
    setClickTues(false)
    setClickWed(false)
    setClickThur(false)
    setClickFri(false)
    setClickSat(false)
  }

  const handleClickMonday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+0))));
    date.setHours(0,0,0,0,0);
    console.log(date)
    props.setNewDay(date);
    setClickSun(false)
    setClickMon(true)
    setClickTues(false)
    setClickWed(false)
    setClickThur(false)
    setClickFri(false)
    setClickSat(false)
  }

  const handleClickTuesday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+1))));
    date.setHours(0,0,0,0,0);
    console.log(date)
    props.setNewDay(date);
    setClickSun(false)
    setClickMon(false)
    setClickTues(true)
    setClickWed(false)
    setClickThur(false)
    setClickFri(false)
    setClickSat(false)
  }
  const handleClickWednesday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+2))));
    date.setHours(0,0,0,0,0);
    console.log(date)
    props.setNewDay(date);
    setClickSun(false)
    setClickMon(false)
    setClickTues(false)
    setClickWed(true)
    setClickThur(false)
    setClickFri(false)
    setClickSat(false)
  }
  const handleClickThursday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+3))));
    date.setHours(0,0,0,0,0);
    console.log(date)
    props.setNewDay(date);
    setClickSun(false)
    setClickMon(false)
    setClickTues(false)
    setClickWed(false)
    setClickThur(true)
    setClickFri(false)
    setClickSat(false)
  }
  const handleClickFriday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+4))));
    date.setHours(0,0,0,0,0);
    console.log(date)
    props.setNewDay(date);
    setClickSun(false)
    setClickMon(false)
    setClickTues(false)
    setClickWed(false)
    setClickThur(false)
    setClickFri(true)
    setClickSat(false)
  }
  const handleClickSaturday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+5))));
    date.setHours(0,0,0,0,0);
    console.log(date)
    props.setNewDay(date);
    setClickSun(false)
    setClickMon(false)
    setClickTues(false)
    setClickWed(false)
    setClickThur(false)
    setClickFri(false)
    setClickSat(true)
  }




  return (
    <>  
        <div className="MonthAndYear">
          <h2 className="title">{monthNames[(new Date(new Date().setDate(new Date().getDate()+ i-1)).getMonth())]} {(new Date(new Date().setDate(new Date().getDate()+i+1)).getFullYear())}</h2>
          <Button variant="danger" size="sm" className="TodayButton" onClick={()=>{setI(today); 
           setClickSun(false)
           setClickMon(false)
           setClickTues(false)
           setClickWed(false)
           setClickThur(false)
           setClickFri(false)
           setClickSat(false)
           }} >today</Button>
        </div>
        
        <Navbar>
          <Button onClick={()=>{setI(i-7);}} variant='light'>&lt;</Button>
          <Nav className="nav-fill w-100 justify-content-center" >

            {/* Sunday */}
            <span onClick={handleClickSunday} 
            style={{
            backgroundColor: clickedSun ? "#0c7691" : "rgb(103, 184, 204)"
            }} name="Sunday" className={i===-6? 'navBarToday': 'navBarDay'}>Sun  
            <span name="7"  className={i===-6? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+ i-1)).getDate())}</span></span> 

            {/* Monday  */}
            <span onClick={handleClickMonday} 
            style={{ backgroundColor: clickedMon  ? "#0c7691" : "rgb(103, 184, 204)" }}
            name="monday" className={i===0? 'navBarToday': 'navBarDay'}>Mon  
            <span name="1"  className={i===0? 'navBarDate-today': 'navBarDate'}>
            {(new Date(new Date().setDate(new Date().getDate()+(i+0))).getDate())}</span> 
            </span>

            {/* Tuesday */}
            <span onClick={handleClickTuesday} 
            style={{ backgroundColor: clickedTues  ? "#0c7691" : "rgb(103, 184, 204)" }}
            name="Tuesday" className={i===-1? 'navBarToday': 'navBarDay'}>Tues  
            <span name="2"  className={i===-1? 'navBarDate-today': 'navBarDate'}>
            {(new Date(new Date().setDate(new Date().getDate()+i+1)).getDate())}</span></span> 

            {/* Wednesday */}
            <span onClick={handleClickWednesday} name="Wednesday"
            style={{ backgroundColor: clickedWed ? "#0c7691" : "rgb(103, 184, 204)" }}
            className={i===-2? 'navBarToday': 'navBarDay'}>Wed  
            <span name="3"  className={i===-2? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+2)).getDate())}</span></span> 

            {/* Thursday */}
            <span onClick={handleClickThursday} name="Thursday" 
            style={{ backgroundColor: clickedThur ? "#0c7691" : "rgb(103, 184, 204)" }}
            className={i===-3? 'navBarToday': 'navBarDay'}>Thur  
            <span name="4"  className={i===-3? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+3)).getDate())}</span></span> 

            {/* Firday */}
            <span onClick={handleClickFriday} name="Firday" 
            style={{ backgroundColor: clickedFri ? "#0c7691" : "rgb(103, 184, 204)" }}
            className={i===-4? 'navBarToday': 'navBarDay'}>Fri  
            <span name="5"  className={i===-4? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+4)).getDate())}</span></span>

             {/*Saturday  */}
            <span  onClick={handleClickSaturday} name="Saturday" 
            style={{ backgroundColor: clickedSat ? "#0c7691" : "rgb(103, 184, 204)" }}
            className={i===-5? 'navBarToday': 'navBarDay'}>Sat  
            <span name="6"  className={i===-5? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+5)).getDate())}</span></span> 
          </Nav>
          <Button onClick={()=>{setI(i+7);}} variant='light'>&gt;</Button>
          </Navbar>
    </>
  )
}

export default DayNavbar
