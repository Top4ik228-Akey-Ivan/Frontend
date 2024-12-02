import Header from "./components/header/header";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}/>  
          <Route path="login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
