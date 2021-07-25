import React from 'react'
import { Dropdown } from 'react-bootstrap'

const SortList = ({setSortBy}) => {

    const sortDeadline=()=>{
        // console.log("Sorted by deadline")
        setSortBy('date')
    }

    const sortPrority=()=>{
        // console.log("Sorted by prority");
        setSortBy('range')
    }

    const sortDate=()=>{
        // console.log("Sorted by Date");
        setSortBy('default')
    }



    return (
        <Dropdown.Menu>
                <Dropdown.Item onClick={sortDeadline} >Sort by deadline</Dropdown.Item>
                <Dropdown.Item onClick={sortPrority}>Sort by prority</Dropdown.Item>
                <Dropdown.Item onClick={sortDate}>Sort by create date</Dropdown.Item>
        </Dropdown.Menu>
    )
}

export default SortList
