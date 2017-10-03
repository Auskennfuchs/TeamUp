import React, { Component } from 'react'
import {
    gql,
    graphql,
} from 'react-apollo';
import { connect } from 'react-redux'
import styled from 'styled-components'

const addFriendMutation = gql`
mutation addFriend(
    $userId: String!,
    $friendId: String!
){
    addFriend(userId:$userId
        friendId: $friendId)
}
`

class AddFriendButton extends Component {

    onClick(e) {
        e.preventDefault()
        this.props.mutate({
            variables: {
                userId: this.props.user.id,
                friendId: this.props.friendId
            }
        }).then(() => (
            window.location.reload()
        ))
    }

    render() {
        return (
            <div className={this.props.className}>
                <button type="button" className="btn btn-primary" onClick={this.onClick.bind(this)}>Add as Friend</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        user: state.session.user
    }
)

export default styled(connect(mapStateToProps, {})(graphql(addFriendMutation)(AddFriendButton))) `
    display: inline-block;
    margin: 0 0.3em 0 0;
`