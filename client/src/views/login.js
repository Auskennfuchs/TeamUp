import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from '../actions/authActions'

import validateInput from '../validation/login'

const Background = styled.div`
    background-color: #fff;
    display: flex;
    align-items: stretch;
    width: 100%;
    flex: auto;
    background-image: url('/resources/teamupstart.png');
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
`

class Login extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            identifier: '',
            isLoading: false,
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    isValid() {
        let { errors, isValid } = validateInput(this.state)
        if (!isValid) {
            this.setState({ errors })
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true })
            this.props.login(this.state).then(
                (res) => this.context.router.history.push('/home'),
                (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            )
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { identifier, isLoading, errors } = this.state
        console.log(errors)
        return (
            <Background>
                <form onSubmit={this.onSubmit}>
                    <h1>Login</h1>
                    {errors.length>0 && <div>{errors.length}</div>}
                    <input type="text" id="identifier" name="identifier" value={identifier} onChange={this.onChange} />
                    <button disabled={isLoading} >Login</button>
                    <div>{errors.identifier}</div>
                </form>
            </Background>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { login })(Login)