import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Icon from 'react-fa'

import { logout } from '../actions/authActions'

class LogoutButton extends Component {

    constructor(props, context) {
        super(props, context)
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout(e) {
        e.preventDefault()
        this.props.logout().then(
            (res) => this.context.router.history.push('/login'),
            (err) => (null)
        )
    }

    render() {
        return (
            <div onClick={this.onLogout} className={this.props.className}>
                <Icon name="power-off"/>
            </div>
        )
    }
}

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired
}

LogoutButton.contextTypes = {
    router: PropTypes.object.isRequired
}

export default styled(connect(null, { logout })(LogoutButton))`
    display: inline-block;
    &:hover {
        cursor: pointer;
        font-size: 1.2em;
    }
`