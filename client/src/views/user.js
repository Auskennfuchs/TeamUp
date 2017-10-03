import React, { Component } from 'react'
import styled from 'styled-components'

import Profile from '../components/profile'
import ProfilePicture from '../components/profilePicture'

class UserView extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="profilePicture">
                                <ProfilePicture userId={this.props.match.params.id} />
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <Profile userId={this.props.match.params.id} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default styled(UserView)`
    .profilePicture {
        height: 20em;
    }
`
