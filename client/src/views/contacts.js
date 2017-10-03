import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    gql,
    graphql,
} from 'react-apollo';
import PropTypes from 'prop-types'

import UserList from '../components/userlist'

const userQuery = gql`
query FriendEnemies($userId:String!) {
  user(id:$userId) {
      friends {
          _id,name, picture
      }
      enemies {
          _id,name, picture
      }
  }
}
`

const ContactList = ({ data: { loading, error, user } }) => {
    if (loading) {
        return <span>Loading...</span>
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <div>
            <h3>Friends</h3>
            <UserList users={user.friends} emptyMessage="You have no friends. Hello darkness my old friend ;(" />
            <h3>Enemies</h3>
            <UserList users={user.enemies} emptyMessage="No enemies" />
        </div>
    )
}

const ContactListWithData = graphql(userQuery, {
    options: ({ userId }) => ({
        variables: { userId }
    })
})(ContactList)

class ContactsView extends Component {
    render() {
        return (
            <ContactListWithData userId={this.props.user.id} />
        )
    }
}

ContactsView.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
    {
        authenticated: state.auth.isAuthenticated,
        user: state.session.user
    }
)


export default connect(mapStateToProps, {})(ContactsView)
