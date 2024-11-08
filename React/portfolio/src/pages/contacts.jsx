import styled from "styled-components"
import { StyledH1, StyledH2, StyledSpan } from "./home"


export const Contacts = () =>{
    return (
        <StyledContacts>
            <StyledH1><StyledSpan>Contacts</StyledSpan></StyledH1>
            <StyledH2 style={{marginBottom: '20px'}}>Lacation</StyledH2>
            <p>Moscow, Russia</p>
            <StyledH2 style={{'margin': '50px 0 20px 0'}}>Telegram/WhatsApp</StyledH2>
            <p>8 985 012 08 51</p>
            <StyledH2 style={{'margin': '50px 0 20px 0'}}>Email</StyledH2>
            <p>ivanorekhov04022005@gmail.com</p>
        </StyledContacts>
    )
}

const StyledContacts = styled.div`
text-align:center;
padding-bottom: 54px;
`