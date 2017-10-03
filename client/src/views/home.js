import React, { Component } from 'react'
//import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Home extends Component {

    render() {
        return (
            <div>
                Hello
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