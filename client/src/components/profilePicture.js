import React from 'react'
import {
    gql,
    graphql,
} from 'react-apollo';
import styled from 'styled-components'


const userPictureQuery = gql`
query UserProfilePicture($userId:String!) {
  user(id:$userId) {
      picture
  }
}
`

const ProfilePictureStyled = styled.div.attrs({
    picture: props => props.picture ? props.picture : '/resources/picturedummy.jpg'
})`
    display: inline-block;
    background-image: url(${props => props.picture});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
`

const ProfilePicture = ({ data: { loading, error, user } }) => {
    if(loading) {
        return null
    }
    if(error) { 
        return (<p>{error.message}</p>)
    }
    return (
        <ProfilePictureStyled picture= { user.picture }/>
    )
}


export const UserPic = styled.div.attrs({
    borderRadius: props => props.rounded==="true" ? '50%' : '0',
    size: props => props.size? props.size: '5rem'
})`
    display:block;
    border-radius: ${props => props.borderRadius};
    width: ${props => props.size};
    height: ${props => props.size};                        
    margin: auto;
    background-image: url(${props => props.url});
    background-position: center;
    background-size: cover;
    max-width: 100%;
    background-repeat: no-repeat;
`

 
export default graphql(userPictureQuery, {
    options: ({ userId }) => ({
        variables: { userId }
    })
})(ProfilePicture)
