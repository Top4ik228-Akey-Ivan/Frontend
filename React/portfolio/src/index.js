import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import './App.css'



export const Global = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');
* {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-family: "Jost", sans-serif;
}

body {
width: 100wv;
background-color: ${props => props.theme.background};
color: ${props => props.theme.color};
}



h1{
font-size: 72px;
font-weight: bold;
  @media (max-width: 550px) {
    font-size: 48px;
    }
}

h2{
font-size: 48px;
font-weight: bold;
}

h3{
font-size: 32px;
font-weight: bold;
}

a{
text-decoration: none;
color: black;
}
`


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>

);

