/*import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logout } from '../actions/authActions'

class LogoutButton extends Component {

    constructor(props, context) {
        super(props, context)
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout(e) {
        e.preventDefault()
        console.log(this.props)
        this.props.logout(null).then(
            res => this.context.router.history.push("/login")   
        )
    }

    render() {
        return (
            <button onClick={this.onLogout}>Logout</button>
        )
    }
}

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired
}

LogoutButton.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { logout })(LogoutButton)*/