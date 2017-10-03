import React, { Component } from 'react'
//import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from '../actions/authActions'

import {
    gql,
    graphql,
} from 'react-apollo';


import TextFieldGroup from '../components/textfieldGroup'
import RadioGroup from '../components/radioGroup'

const createUserMutation = gql`
mutation createUser($name: String!,$city: String!,$fraction: String!){
    createUser(user: {name:$name,city:$city,fraction:$fraction}){
      _id
    }
  }
`
class Register extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            name: '',
            city: '',
            fraction: '',
            isLoading: false,
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ errors: {}, isLoading: true })
        this.props.mutate({
            variables: {
                name: this.state.name,
                city: this.state.city,
                fraction: this.state.fraction
            }
        }).then(
            (res) => (
                this.props.login({ identifier: this.state.name }).then(
                    (res) => this.context.router.history.replace('/'),
                    (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
                )
            )
        )
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { isLoading } = this.state
        const fractions = ["Good", "Evil"]
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <TextFieldGroup field="name" value="" label="Name" onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <TextFieldGroup field="city" value="" label="City" onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <RadioGroup field="fraction" label="Choose Fraction" values={fractions} onChange={this.onChange} />
                    </div>
                    <div className="row">
                        &nbsp;
                    </div>
                    <div className="row">
                        <button className="btn btn-primary" disabled={isLoading} >Register</button>
                    </div>
                </div >
            </form>
        )
    }
}

Register.contextTypes = {
    router: PropTypes.object.isRequired
}

const RegisterWithData = graphql(createUserMutation)(Register)

export default connect(null, { login })(RegisterWithData)