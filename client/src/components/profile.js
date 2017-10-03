import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
    gql,
    graphql,
} from 'react-apollo';

import TextLabelGroup from './textLabelGroup'
import UserList from './userlist'

const profileQuery = gql`
query Profile($userId:String!) {
  user(id:$userId) {
      _id, name, realName, age, slogan, city, picture, fraction
      friends{
          _id,name,picture
      }
      enemies{
          _id,name,picture
      }
  }
}
`

const Profile = ({ data: { loading, error, user } }) => {
    if (loading) {
        return <h3>Loading...</h3>
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <div className="container-fluid">
            <h3>{user.name}</h3>
            <span>serves the {user.fraction}</span>
            <div className="container-fluid">
                <TextLabelGroup label="Real Name" value={user.realName} />
                <TextLabelGroup label="City" value={user.city} />
                <TextLabelGroup label="Age" value={user.age} />
                <TextLabelGroup label="Slogan" value={user.slogan} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <UserList users={user.friends} />
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    userId: PropTypes.string.isRequired
}

export default graphql(profileQuery, {
    options: ({ userId }) => ({
        variables: { userId }
    })
})(Profile)