import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProfileData from '../components/profileData'
import ProfilePicture from '../components/profilePicture'
import ProfilePictureEdit from '../components/profilePictureEdit'

class Profile extends Component {

    render() {
        return (
            <div className={this.props.className+" container"}>
                <div className="row">
                    <div className="col-sm-2 no-overflow">
                        <div className="profilePicture">
                            <ProfilePicture userId={this.props.user.id} />
                        </div>
                        <ProfilePictureEdit userId={this.props.user.id} />
                    </div>
                    <div className="col-sm-10">
                        <ProfileData userId={this.props.user.id} />
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

Profile.contextTypes = {
    router: PropTypes.object.isRequired
}


const mapStateToProps = (state) => (
    {
        authenticated: state.auth.isAuthenticated,
        user: state.session.user
    }
)

export default connect(mapStateToProps, {})(styled(Profile)`
    .profilePicture {
        width: 100%;
        height: 20em;
    }
`)