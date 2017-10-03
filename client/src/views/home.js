import React, { Component } from 'react'
//import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Home extends Component {

    render() {
        return (
            <div className="container">
                <h1 className="center-align">Hello {this.props.user.username}</h1>
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
        user: state.session.user
    }
)

export default connect(mapStateToProps, {})(Home)