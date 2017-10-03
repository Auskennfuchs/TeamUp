import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ProfilePicture from './profilePicture'



class UserListComponent extends Component {
    render() {
        return (
            <ul className={this.props.className+ " container-fluid"}>
                {this.props.users.map((user) => (
                    <li key={user._id} className="col-sm-2">
                        <Link to={`/user/${user._id}`}>
                            <ProfilePicture userId={user._id} rounded={this.props.rounded}/>
                            <span>{user.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }
}

export default styled(UserListComponent)`
    list-style-type:none;
    > li {
        display: inline-block;
        padding: 0.4rem;
        font-weight: bold;
        width: 10%;
        
        div {
            display: block;
            width: 100%;
            height: 10em;
        }

        span {
            display: block;
            width: 100%;
            text-align: center;
        }
    }
  `
