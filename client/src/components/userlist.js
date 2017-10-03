import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Picture from './picture'

class UserListComponent extends Component {
    render() {
        if(!this.props.users || this.props.users.length===0) {
            return (<h4>{this.props.emptyMessage}</h4>)
        }
        return (
            <ul className={this.props.className}>
                {this.props.users.map((user) => (
                    <li key={user._id} className="col-sm-2">
                        <Link to={`/user/${user._id}`}>
                            <div>
                                <Picture url={user.picture}/>
                            </div>
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
    width: 100%;
    display: inline-block;
    margin: 0;
    > li {
        display: inline-block;
        padding: 0.4rem;
        font-weight: bold;
        width: 10%;
        height: 12em;
        
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
