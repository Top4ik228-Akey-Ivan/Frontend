import styled from "styled-components";
import { Vneshniy } from "../App";


import vk from '../images/icons/vk.svg'
import github from '../images/icons/gitHub.svg'
import twitter from '../images/icons/twitter.svg'
import inst from '../images/icons/instagram.svg'



const Footer = (props) => {
    return (
        <StyledFooter>
            <Vneshniy {...props}>
                <StyledFooterBox>
                    <StyledSocials>
                        <a href="https://vk.com/iv_anus777" target="_blank" rel="noreferrer">
                            <img src={vk} alt="" />
                        </a>
                        <a href="https://www.instagram.com/iv_anus777" target="_blank" rel="noreferrer">
                            <img src={inst} alt="" />
                        </a>
                        <a href="https://vk.com/iv_anus777" target="_blank" rel="noreferrer">
                            <img src={twitter} alt="" />
                        </a>
                        <a href="https://github.com/Top4ik228-Akey-Ivan" target="_blank" rel="noreferrer">
                            <img src={github} alt="" />
                        </a>
                    </StyledSocials>
                    <StyledEmail>
                        ivanorekhov04022005@gmail.com
                    </StyledEmail>
                </StyledFooterBox>
            </Vneshniy>
        </StyledFooter>
    );
}

const StyledFooter = styled.div`
position: fixed;
right: 0;
bottom: 0;
width: 100%;

`


const StyledFooterBox = styled.div`
padding: 20px 0;
`

const StyledSocials = styled.div`
display: flex;
gap: 30px;
align-items: center;
color: white;
justify-content: center;
& img {
cursor: pointer;}
`

const StyledEmail = styled.div`
font-size: 20px;
color: white;
text-align: center;
margin-top: 18px;`
 
export default Footer;