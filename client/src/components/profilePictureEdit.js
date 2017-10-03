import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {
    gql,
    graphql,
} from 'react-apollo';


const updateUserPictureMutation = gql`
mutation updateUserPicture(
    $id: String!,
    $picture: String        
){
    updateUser(id:$id,user: {
      picture: $picture
    }) {
        picture
    }
  }
`

class ProfilePictureEdit extends Component {

    handleUploadFile(e) {
        var file = e.target.files[0]
        console.log(file)
        var reader = new FileReader()
        reader.onloadend = (e) => {
            var newFile = {file: file, imageUrl: e.target.result}
            this.props.mutate({
                variables: {
                    id: this.props.userId,
                    picture: newFile.imageUrl
                }
            }).then(
                () => {window.location.reload()}
            )
        }
        reader.readAsDataURL(file)
    }
    render() {
        return (
            <input type="file" onChange={this.handleUploadFile.bind(this)}/>
        )
    }
}

ProfilePictureEdit.propTypes = {
    userId: PropTypes.string.isRequired
}

ProfilePictureEdit.contextTypes = {
    router: PropTypes.object.isRequired
}


export default graphql(updateUserPictureMutation)(ProfilePictureEdit)
