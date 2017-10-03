import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    gql,
    graphql,
} from 'react-apollo'

import Icon from 'react-fa'
import styled from 'styled-components'

import TextLabelGroup from './textLabelGroup'
import UserList from './userlist'
import AddFriendButton from './addFriendButton'
import AddEnemyButton from './addEnemyButton'

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

const CityMarker = styled(({ className, city }) => (
    <div className={className}>
        <Icon name="map-marker" />
        {city}
    </div>
))`
    color: #888;
    span {
        font-size: 1.3em;
        margin-right: 0.2em;
    }
`

const Profile = ({ sessionUser, data: { loading, error, user } }) => {
    if (loading) {
        return <h3>Loading...</h3>
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-8">
                    <h2>{user.name}</h2>
                    <CityMarker city={user.city}/>
                </div>
                <div className="col-sm-4">
                    <h2>
                        {!user.friends.find((u) => (u._id === sessionUser.id)) && user._id != sessionUser.id &&
                            <AddFriendButton friendId={user._id} />
                        }
                        {!user.enemies.find((u) => (u._id === sessionUser.id)) && user._id != sessionUser.id &&
                            <AddEnemyButton enemyId={user._id} />
                        }
                    </h2>
                </div>
            </div>
            <span>serves the {user.fraction}</span>
            <div className="container-fluid">
                <TextLabelGroup label="Real Name" value={user.realName} />
                <TextLabelGroup label="Age" value={user.age} />
                <TextLabelGroup label="Slogan" value={user.slogan} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <h3>{user.friends.length} Friends</h3>
                    <UserList users={user.friends} emptyMessage={user.name + " has no friends"} />
                </div>
                <div className="row">
                    <h3>{user.enemies.length} Enemies</h3>
                    <UserList users={user.enemies} emptyMessage={user.name + " has no enemies"} />
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    userId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => (
    {
        sessionUser: state.session.user
    }
)


export default connect(mapStateToProps, {})(graphql(profileQuery, {
    options: ({ userId }) => ({
        variables: { userId }
    })
})(Profile))