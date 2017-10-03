import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import LogoutButton from './logoutButton'
import ProfilePicture from './profilePicture'

class _Header extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="content">
                    <NavLink to="/">
                        <img src="/resources/logo.png" alt="Logo" />
                    </NavLink>
                    {this.props.authenticated && (
                        <nav>
                            <NavLink to="/users">Find People</NavLink>
                            <NavLink to="/contacts">Contacts</NavLink>
                            <NavLink to="/profile" className="picture"><ProfilePicture userId={this.props.user.id} /></NavLink>
                            <LogoutButton />
                        </nav>
                    )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        authenticated: state.auth.isAuthenticated,
        user: state.session.user
    }
)

export const Header = styled(connect(mapStateToProps, {})(_Header)) `
    display: block;
    width: 100%;
    background-color: #fff;
    margin-bottom: 1em;
    .content{
        padding: 1em;
        border-bottom: 2px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
    
        nav {
            float:right;
        }
        a {
            display: inline-block;
            font-weight: bold;
            margin: 0 1.5em;

            &.picture {
                width: 3em;
                height: 3em;
                vertical-align: middle;
            }
        }
    }
`