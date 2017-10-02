import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LogoutButton from '../components/logoutButton'

class Home extends Component {

    componentWillMount() {
        this.context.router.history.push('/login')
    }

    render() {
        return (
            <div>Hello {this.props.user.username} {this.props.authenticated}
                <LogoutButton />

            </div>
        )
    }
}

Home.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

Home.contextTypes = {
    router: PropTypes.object.isRequired
}


const mapStateToProps = (state) => (
    {
        authenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
)

export default connect(mapStateToProps, {})(Home)