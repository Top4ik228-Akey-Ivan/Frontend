/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components';
// import pic from './../images/technologies/react.png'
const ProjectCard = ({props}) => {
    return (
        <StyledProjectCard {...props}>
            <a href="#" rel="noreferrer">
                <img src={props.img} alt="" />
                <p style={{'margin': '10px 0'}}>{props.title}</p>
            </a>
        </StyledProjectCard>
    );
}


const StyledProjectCard = styled.div`
box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); 
margin-bottom: 50px;
padding:16px 16px 0 16px;
display: inline-block;
border-radius: 10px;
& img{
border-radius: 10px;
width: 300px;
}
`

export default ProjectCard;

