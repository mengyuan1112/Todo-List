import React, { useState ,useEffect} from 'react'
import {Nav,Navbar,Button} from 'react-bootstrap';
import "./DayNavbar.css"

const DayNavbar = () => {
  const [i,setI] = useState(0);
  const [navBarDate,setNavBarDate] = useState('navBarDate')
  var myCurrentDate = new Date();
  var month = myCurrentDate.getMonth();
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];
  var day = myCurrentDate.getDay();
  var date = myCurrentDate.getDate();

  useEffect(() => {
    if (dayName[day]==='Monday'){
      setI(0)
    }
    else if(dayName[day]==='Tuesday'){
      setI(-1)
    }
    else if(dayName[day]==='Wednesday'){
      setI(-2)
    }
    else if(dayName[day]==='Thursday'){
      setI(-3)
    }
    else if(dayName[day]==='Friday'){
      setI(-4)
    }
    else if(dayName[day]==='Saturday'){
      setI(-5)
    }
    else if(dayName[day]==='Sunday'){
      setI(-6)
    }

  }, []) 
  

  return (
        <Navbar>
          <Button onClick={()=>{setI(i-7);}} variant='light'>&lt;</Button>
          <Nav className="nav-fill w-100" >
            <Nav.Link href="#">
            <span className={i===0? 'navBarToday': 'navBarDay'}>Mon <span name="1"  className={i===0? 'navBarDate-today': 'navBarDate'}>{(new Date(new Date().setDate(new Date().getDate()+(i+0))).getDate())}</span></span> 
            <span className={i===-1? 'navBarToday': 'navBarDay'}>Tues <span name="2"  className={i===-1? 'navBarDate-today': 'navBarDate'}>{(new Date(new Date().setDate(new Date().getDate()+i+1)).getDate())}</span></span> 
            <span className={i===-2? 'navBarToday': 'navBarDay'}>Wed <span name="3"  className={i===-2? 'navBarDate-today': 'navBarDate'}>{(new Date(new Date().setDate(new Date().getDate()+i+2)).getDate())}</span></span> 
            <span className={i===-3? 'navBarToday': 'navBarDay'}>Thur <span name="4"  className={i===-3? 'navBarDate-today': 'navBarDate'}>{(new Date(new Date().setDate(new Date().getDate()+i+3)).getDate())}</span></span> 
            <span className={i===-4? 'navBarToday': 'navBarDay'}>Fri <span name="5"  className={i===-4? 'navBarDate-today': 'navBarDate'}>{(new Date(new Date().setDate(new Date().getDate()+i+4)).getDate())}</span></span> 
            <span className={i===-5? 'navBarToday': 'navBarDay'}>Sat <span name="6"  className={i===-5? 'navBarDate-today': 'navBarDate'}>{(new Date(new Date().setDate(new Date().getDate()+i+5)).getDate())}</span></span> 
            <span className={i===-6? 'navBarToday': 'navBarDay'}>Sun <span name="7"  className={i===-6? 'navBarDate-today': 'navBarDate'}>{(new Date(new Date().setDate(new Date().getDate()+ i+6)).getDate())}</span></span> 
            </Nav.Link>
          </Nav>
          <Button onClick={()=>{setI(i+7);}} variant='light'>&gt;</Button>
          </Navbar>
  )
}

export default DayNavbar
