import React, { Component } from 'react'
import {
    gql,
    graphql,
} from 'react-apollo';

import Picture from './picture'


const userPictureQuery = gql`
query UserProfilePicture($userId:String!) {
  user(id:$userId) {
      _id
      picture
  }
}
`
class ProfilePicture extends Component {
    render() {
        const { data: { loading, error, user },rounded } = this.props
        if (loading) {
            return null
        }
        if (error) {
            return (<p>{error.message}</p>)
        }
        return (
            <Picture url={user.picture} rounded={rounded} />
        )
    }
}

export default graphql(userPictureQuery, {
    options: ({ userId }) => ({
        variables: {
            userId
        }
    })
})(ProfilePicture)
