import React from 'react'

import FractionList from '../components/fractionList'

import styled from 'styled-components'

const EvilFractionList = styled(FractionList)`
    background-color:#d02b2b;
    padding: 2em 1em;
    a {
        &:hover {
            color:#fff;
        }
    }
`

const GoodFractionList = styled(FractionList)`
    padding: 2em 1em;
`

const UserListView = () => (
    <div className="container">
        <div className="row">
            <GoodFractionList fraction="Good"/>
        </div>
        <div className="row">
            <EvilFractionList fraction="Evil"/>
        </div>
    </div>
)

export default UserListView
