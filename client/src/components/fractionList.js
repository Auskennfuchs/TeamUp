import React from 'react'
import PropTypes from 'prop-types'
import {
    gql,
    graphql
} from 'react-apollo';
import styled from 'styled-components'

import UserList from './userlist'


const fractionListQuery = gql`
query FractionList($fraction:String!) {
    usersFraction(fraction: $fraction) {
    _id
    name
    picture
  }
}
`
const FractionList = styled(({className, data: { loading, error, usersFraction } }) => {
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <UserList className={className} users={usersFraction} rounded="true"/>
    )
})`
`

FractionList.propTypes = {
    fraction: PropTypes.string.isRequired
}

export default graphql(fractionListQuery,{
    options: ({fraction})=>(
        {
            variables: {fraction}
        }
    )
})(FractionList)
