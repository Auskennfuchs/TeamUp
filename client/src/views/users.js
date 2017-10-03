import React from 'react'

import FractionList from '../components/fractionList'

import styled from 'styled-components'

const EvilFractionList = styled(FractionList)`
    background-color:#444;
    a {
        &:hover {
            color:#fff;
        }
    }
`

const UserListView = () => (
    <div className="container">
        <div className="row">
            <FractionList fraction="Good"/>
        </div>
        <div className="row">
            <EvilFractionList fraction="Evil"/>
        </div>
    </div>
)

export default UserListView
