import styled from "styled-components"
import { Container, Vneshniy } from "../App"
import { NavLink } from 'react-router-dom';
import sun from './../images/icons/sunlight.png'
import moon from './../images/icons/moonlight.png'



export const Header = (props) => {

    return (
        <Vneshniy {...props}>
            <Container>
                <StyledHeaderBox>
                    <p><b>Frontend</b> portfolio</p>
                    <StyledNav>
                        <StyledLink to='/'>Home</StyledLink>
                        <StyledLink to='projects'>Projects</StyledLink>
                        <StyledLink to='contacts'>Contacts</StyledLink>
                        <StyledThemeBox>
                            <div onClick={props.toggleTheme}>
                                <img src={moon} alt="" />
                                <img src={sun} alt="" />
                            </div>
                        </StyledThemeBox>
                    </StyledNav>
                </StyledHeaderBox>
            </Container>
        </Vneshniy>
    )   
}

const StyledHeaderBox = styled.div`
    width: 100%;
    padding: 30px 0;
    height: 30px;
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;

    @media (max-width: 1000px) {
    height: 100%;
    flex-direction: column;
    padding: 15px 0;
    }

`

const StyledNav = styled.div`
    display:flex;
    gap:70px;
    
    @media (max-width: 1000px) {
        flex-wrap: wrap;
        padding: 15px 0;
        gap:40px;
        justify-content: space-between;    
    }
`

export const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: white;
    }
    &.active{
        border-bottom: 2px solid #5d3bfd;
    }
`
const StyledThemeBox = styled.div`
& img{
height: 20px;
}
`