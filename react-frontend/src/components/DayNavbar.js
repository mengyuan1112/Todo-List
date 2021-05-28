import React, { useState ,useEffect} from 'react'
import {Nav,Navbar,Button} from 'react-bootstrap';
import "./DayNavbar.css"

const DayNavbar = (props) => {
  const [i,setI] = useState(0);
  const [today,setToday] =useState(i);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
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
    date.setHours(0,0,0,0);
    console.log(date)
    props.socket.on(`date:${date}`,data=>{
      //update todo, finished and shared list to monday.
      console.log(data)
    })
  }

  const handleClickMonday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+0))));
    date.setHours(0,0,0,0);
    console.log(date)
    props.socket.on(`date:${date}`,data=>{
      //update todo, finished and shared list to monday.
      console.log(data)
    })
  }

  const handleClickTuesday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+1))));
    date.setHours(0,0,0,0);
    console.log(date)
    props.socket.on(`date:${date}`,data=>{
      //update todo, finished and shared list to monday.
      console.log(data)
    })
  }
  const handleClickWednesday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+2))));
    date.setHours(0,0,0,0);
    console.log(date)
    props.socket.on(`date:${date}`,data=>{
      //update todo, finished and shared list to monday.
      console.log(data)
    })
  }
  const handleClickThursday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+3))));
    date.setHours(0,0,0,0);
    console.log(date)
    props.socket.on(`date:${date}`,data=>{
      //update todo, finished and shared list to monday.
      console.log(data)
    })
  }
  const handleClickFriday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+4))));
    date.setHours(0,0,0,0);
    console.log(date)
    props.socket.on(`date:${date}`,data=>{
      //update todo, finished and shared list to monday.
      console.log(data)
    })
  }
  const handleClickSaturday=()=>{
    var date = (new Date(new Date().setDate(new Date().getDate()+(i+5))));
    date.setHours(0,0,0,0);
    console.log(date)
    props.socket.on(`date:${date}`,data=>{
      //update todo, finished and shared list to monday.
      console.log(data)
    })
  }




  return (
    <>  
        <div className="MonthAndYear">
          <h2 className="title">{monthNames[(new Date(new Date().setDate(new Date().getDate()+ i-1)).getMonth())]} {(new Date(new Date().setDate(new Date().getDate()+i+1)).getFullYear())}</h2>
          <Button variant="danger" size="sm" className="TodayButton" onClick={()=>{setI(today);}} >today</Button>
        </div>
        
        <Navbar>
          <Button onClick={()=>{setI(i-7);}} variant='light'>&lt;</Button>
          <Nav className="nav-fill w-100 justify-content-center" >

            {/* Sunday */}
            <span onClick={handleClickSunday} name="Sunday" className={i===-6? 'navBarToday': 'navBarDay'}>Sun  
            <span name="7"  className={i===-6? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+ i-1)).getDate())}</span></span> 

            {/* Monday  */}
            <span onClick={handleClickMonday} name="monday" className={i===0? 'navBarToday': 'navBarDay'}>Mon  
            <span name="1"  className={i===0? 'navBarDate-today': 'navBarDate'}>
            {(new Date(new Date().setDate(new Date().getDate()+(i+0))).getDate())}</span> 
            </span>

            {/* Tuesday */}
            <span onClick={handleClickTuesday} name="Tuesday" className={i===-1? 'navBarToday': 'navBarDay'}>Tues  
            <span name="2"  className={i===-1? 'navBarDate-today': 'navBarDate'}>
            {(new Date(new Date().setDate(new Date().getDate()+i+1)).getDate())}</span></span> 

            {/* Wednesday */}
            <span onClick={handleClickWednesday} name="Wednesday" className={i===-2? 'navBarToday': 'navBarDay'}>Wed  
            <span name="3"  className={i===-2? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+2)).getDate())}</span></span> 

            {/* Thursday */}
            <span onClick={handleClickThursday} name="Thursday" className={i===-3? 'navBarToday': 'navBarDay'}>Thur  
            <span name="4"  className={i===-3? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+3)).getDate())}</span></span> 

            {/* Firday */}
            <span onClick={handleClickFriday} name="Firday" className={i===-4? 'navBarToday': 'navBarDay'}>Fri  
            <span name="5"  className={i===-4? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+4)).getDate())}</span></span>

             {/*Saturday  */}
            <span  onClick={handleClickSaturday} name="Saturday" className={i===-5? 'navBarToday': 'navBarDay'}>Sat  
            <span name="6"  className={i===-5? 'navBarDate-today': 'navBarDate'}>
              {(new Date(new Date().setDate(new Date().getDate()+i+5)).getDate())}</span></span> 
          </Nav>
          <Button onClick={()=>{setI(i+7);}} variant='light'>&gt;</Button>
          </Navbar>
    </>
  )
}

export default DayNavbar
