import React from 'react'
import { Dropdown } from 'react-bootstrap'

const SortList = () => {
    return (
        <Dropdown.Menu>
                <Dropdown.Item >Sort by deadline</Dropdown.Item>
                <Dropdown.Item >Sort by prority</Dropdown.Item>
                <Dropdown.Item >Sort by create date</Dropdown.Item>
        </Dropdown.Menu>
    )
}

export default SortList
