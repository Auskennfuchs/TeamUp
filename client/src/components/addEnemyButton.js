import React, { Component } from 'react'
import {
    gql,
    graphql,
} from 'react-apollo';
import { connect } from 'react-redux'
import styled from 'styled-components'

const addEnemyMutation = gql`
mutation addEnemy(
    $userId: String!,
    $enemyId: String!
){
    addEnemy(userId:$userId
        enemyId: $enemyId)
}
`

class AddEnemyButton extends Component {

    onClick(e) {
        e.preventDefault()
        this.props.mutate({
            variables: {
                userId: this.props.user.id,
                enemyId: this.props.enemyId
            }
        }).then(() => (
            window.location.reload()
        ))
    }

    render() {
        return (
            <div className={this.props.className}>
                <button type="button" className="btn btn-danger" onClick={this.onClick.bind(this)}>Add as Enemy</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        user: state.session.user
    }
)

export default styled(connect(mapStateToProps, {})(graphql(addEnemyMutation)(AddEnemyButton))) `
    display: inline-block;
    margin: 0 0.3em 0 0;
`