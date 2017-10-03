import React from 'react'

import UserList from '../components/userlist'

import {
    gql,
    graphql
} from 'react-apollo';

const userListQuery = gql`
query UserList {
  users {
    _id
    name
    picture
  }
}
`

const UserListView = ({ data: { loading, error, users } }) => {
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <UserList users={users} rounded="true"/>
    )
}

export default graphql(userListQuery)(UserListView)
