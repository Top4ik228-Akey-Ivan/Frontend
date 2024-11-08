import styled, { ThemeProvider } from "styled-components";
import { Header } from "./components/header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/home";
import { Projects } from "./pages/projects";
import { Contacts } from "./pages/contacts";
import Footer from "./components/footer";
import ProjectPage from "./pages/projectPage";
import { projectsData } from "./data/projectsInfo";
import { useState } from "react";
import { lightTheme, darkTheme } from "./data/theme";
import { Global } from ".";

const Main = () => {
    return ( 
            <StyledMain>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='projects' element={<Projects/>}/>
                    <Route path='contacts' element={<Contacts/>}/>
                    {projectsData.map((project) => <Route path={project.path} key={project.title} element={<ProjectPage props={project}/>}/>)}
                </Routes>
            </StyledMain>
    );
}
 
const App = () => {

    const [theme, setTheme] = useState(lightTheme)

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme))
    }

    return  (
        <>
            <ThemeProvider theme={theme}>
            <Global/>
                <BrowserRouter>
                    <Header bg={'black'} toggleTheme={toggleTheme}/>
                    <Main/>
                    <Footer bg={'black'}/>  
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}
export const Vneshniy = styled.div`
background-color: ${props => props.bg};
width: 100%;
`


export const Container = styled.div`
padding: 0 15%;
`

const StyledMain = styled.div`
padding-bottom: 125px;
`


export const StyledProjects = styled(Container)`
margin-top: 50px;
display: flex;
flex-wrap:wrap;
justify-content: space-between;
  @media (max-width: 950px) {
  justify-content: center;
  flex-wrap: nowrpap;
  }

`

export default App; 