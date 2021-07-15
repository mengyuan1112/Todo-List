import React from 'react'
import {Col,Container} from 'react-bootstrap'
import Background from '../Picture1.png';
const DayDisplay = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];
    var myCurrentDate = new Date();
    var date = myCurrentDate.getDate();
    var month = myCurrentDate.getMonth();
    var day = myCurrentDate.getDay();

    if (date === 1){
        date+= 'st'
    }
    else if (date === 2){
        date += 'nd'
    }
    else{
        date += 'th'
    }

    return (
        <Col style={{
            backgroundImage:`url(${Background})`,  
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'}}>
                <Container>
                    <br/>
                    <Col><p style={{
                        fontSize:40, 
                        color:"#696969",
                        paddingRight:'55px',
                        marginBottom:'5px'}} className="d-flex justify-content-end">{monthNames[month]}  {date}</p></Col>
                    <Col><p style={{
                        fontSize:30, 
                        color:"#696969",
                        paddingRight:'55px'}} className="d-flex justify-content-end">{dayName[day]}</p></Col>
                </Container>
        </Col>
    )
}

export default DayDisplay
