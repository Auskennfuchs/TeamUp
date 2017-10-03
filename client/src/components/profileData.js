import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
    gql,
    graphql,
} from 'react-apollo';

import TextFieldGroup from './textfieldGroup'

const userQuery = gql`
query UserProfile($userId:String!) {
  user(id:$userId) {
      _id, name, realName, age, slogan, city, picture, fraction
  }
}
`

const updateUserDataMutation = gql`
mutation updateUserData(
    $id: String!,
    $realName: String
    $city: String
    $age: Int
    $slogan: String        
){
    updateUser(id:$id,user: {
      realName: $realName,
      city: $city,
      age: $age,
      slogan: $slogan
    }) {
      name
      realName
      city
      age
      slogan
      fraction
    }
  }
`

class UserProfile extends Component {
    constructor(props, context) {
        super(props, context)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.state = {
            isLoading: false,
            id: props.user._id,
            name: props.user.name,
            realName: props.user.realName,
            city: props.user.city,
            age: props.user.age,
            slogan: props.user.slogan,
            fraction: props.user.fraction
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.mutate({
            variables: this.state
        }).then((user) => { this.setState({ user: user }) })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { isLoading } = this.state
        let user = this.state
        return (
            <div className="container-fluid">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <TextFieldGroup field="realName" value={user.realName} label="Real Name" onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <TextFieldGroup field="age" value={user.age} label="Age" onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <TextFieldGroup field="slogan" value={user.slogan} label="Slogan" onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <TextFieldGroup field="city" value={user.city} label="City" onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <button className="btn btn-primary" disabled={isLoading} >Update Profile</button>
                    </div>
                </form >
            </div>
        )
    }
}

const UserProfileWithData = graphql(updateUserDataMutation)(UserProfile)

const ProfileData = ({ data: { loading, error, user } }) => {
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
            <UserProfileWithData user={user} />
        </div>
    )
}

ProfileData.propTypes = {
    userId: PropTypes.string.isRequired
}

export default graphql(userQuery, {
    options: ({ userId }) => ({
        variables: { userId }
    })
})(ProfileData)