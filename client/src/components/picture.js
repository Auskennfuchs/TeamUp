import styled from 'styled-components'

export default styled.div.attrs({
    url: props => props.url ? props.url : '/resources/picturedummy.png',
    rounded: props => props.rounded==="true" ? '100%' : '0'
})`
    display: inline-block;
    background-image: url(${props => props.url});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    border-radius: ${props => props.rounded}
`
