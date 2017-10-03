import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { login } from '../actions/authActions'

import validateInput from '../validation/login'

const Background = styled.div`
    background-color: #fff;
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 100%;
    flex: auto;
    background-image: url('/resources/teamupstart.png');
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
`

const LoginForm = styled(({ className, identifier, onChange, onSubmit, isLoading, errors }) => (
    <div className={className}>
        <form onSubmit={onSubmit}>
            <input type="text" id="identifier" name="identifier" value={identifier} onChange={onChange} />
            <button disabled={isLoading} >Login</button>
            <div>{errors.identifier}</div>
            <Link to="/register">Register</Link>
        </form>
    </div>
)) `
    background-color: #fff;
    border: 3px solid #000;
    height: 8em;
    width: 20%;
    min-width: 20em;
    position: fixed;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 3em;
    font-size: 1.5em;

    input {
        margin: 2em 1em 1em 2em;
        border: 2px solid #000;
        width: 60%;
        padding: 0.2em;
    }

    a {
        margin-left: 2em;
        text-decoration: underline;
    }

    button {
        border: 0 none;
        background-color :#fff;
        color: #d02b2b;
        font-weight: bold;
        padding: 0.3em 0.7em;

        &:hover {
            color :#fff;
            background-color: #d02b2b;
        }
    }
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
                (res) => this.context.router.history.replace('/'),
                (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            )
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { identifier, isLoading, errors } = this.state
        return (
            <Background>
                <LoginForm onSubmit={this.onSubmit} onChange={this.onChange} identifier={identifier} isLoading={isLoading} errors={errors} />
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