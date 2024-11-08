import styled from "styled-components"
import  jsimg from './../images/technologies/js.png'
import  tsimg from './../images/technologies/ts.png'
import  reactimg from './../images/technologies/react.png'
import  sassimg from './../images/technologies/sass.png'
import  reduximg from './../images/technologies/redux.png'
import { StyledLink } from "../components/header"



export const Home = () =>{
    return (
        <StyledHome>
            <StyledH1>Hi, my name is <StyledSpan>Ivan</StyledSpan></StyledH1>
            <StyledH2>I`m frontend developer</StyledH2>
            <p>I`m happy to imrove my knowledge</p>
            <StyledLink to='projects'><StyledButton>View Projects</StyledButton></StyledLink>
            <StyledH2 style={{marginTop: '220px', color: '#5d3bfd'}}>Frontend</StyledH2>
            <p>HTML, CSS, SCSS, NPM, JavaScript, TypeScript, ReactJs, <br/>Redux, Redux Toolkit, StyledComponents, TailWind</p>
            <StyledFlex>
                <img src={jsimg} alt="" />
                <img src={tsimg} alt="" />
                <img src={reactimg} alt="" />
                <img src={sassimg} alt="" />
                <img src={reduximg} alt="" />
            </StyledFlex>
        </StyledHome>
    )
}

const StyledHome = styled.div`
text-align: center;
padding: 100px 0 50px 0;
`

export const StyledH1 = styled.h1`
text-align: center;
padding: 30px 0;`


export const StyledH2 = styled.h2`
font-size: 48px;
margin: 30px 0;
font-weight: bold;
  @media (max-width: 550px) {
    font-size: 36px;
    }`

const StyledFlex = styled.div`
margin: 200px 0 50px 0;
display: flex;
justify-content: center;
gap: 70px;
& img{
border-radius: 50%;
width: 120px;
aspect-ratio: 1/1;
}
    @media (max-width: 750px) {
        flex-wrap:wrap;
    }`

export const StyledSpan = styled.span`
font-size: 72px;
color: #5d3bfd;
  @media (max-width: 550px) {
    font-size: 48px;
    }`

export const StyledButton = styled.button`
height: 50px;
border-radius: 8px;
background-color:#5d3bfd;
text-align: center;
margin-top: 40px;
border: none;
padding: 10px 20px;
color: white;
cursor: pointer;
&: hover{
opacity: 0.8;
transition: 0.2s linear;
}
`