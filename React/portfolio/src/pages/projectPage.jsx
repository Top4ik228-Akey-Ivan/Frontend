import styled from "styled-components";
import { StyledButton, StyledH1, StyledH2, StyledSpan } from "./home";
import { Container } from "../App";



const ProjectPage = ({props}) => {
    return (
        <StyledProjectPage {...props}>
            <Container>
                <StyledH1><StyledSpan>{props.title}</StyledSpan></StyledH1>
                <StyledImg src={props.img} alt="" />
                <StyledH2><StyledSpan style={{'fontSize': '48px'}}>Skills</StyledSpan>: {props.skills}</StyledH2>
                <a href={props.githublink} target="_blank" rel="noreferrer">
                    <StyledButton>View Githab Repo</StyledButton>
                </a>
            </Container>
        </StyledProjectPage>
    );
}

const StyledProjectPage = styled.div`
text-align: center;
padding-bottom: 50px;
`

const StyledImg = styled.img`
width: 100%;
box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
border-radius: 20px;`
 
export default ProjectPage;